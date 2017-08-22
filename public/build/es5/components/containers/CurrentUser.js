"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var actions = require("../../actions").actions;
var Dropzone = _interopRequire(require("react-dropzone"));

var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var sha1 = _interopRequire(require("sha1"));

var CurrentUser = (function (Component) {
    function CurrentUser() {
        _classCallCheck(this, CurrentUser);

        _get(Object.getPrototypeOf(CurrentUser.prototype), "constructor", this).call(this);
        this.state = {
            updatedProfile: {}
        };
    }

    _inherits(CurrentUser, Component);

    _prototypeProperties(CurrentUser, null, {
        componentDidMount: {
            value: function componentDidMount() {
                console.log("CurrentUser (componentDidMount): " + JSON.stringify(this.props.user));
            },
            writable: true,
            configurable: true
        },
        updateCurrentUser: {
            value: function updateCurrentUser(event) {
                event.preventDefault();
                console.log("updateCurrentUser: " + event.target.id + "==" + event.target.value);

                var updated = Object.assign({}, this.state.updatedProfile);
                updated[event.target.id] = event.target.value;
                this.setState({
                    updatedProfile: updated
                });
            },
            writable: true,
            configurable: true
        },
        updateProfile: {
            value: function updateProfile(event) {
                event.preventDefault();
                console.log("UpdatedProfile: " + JSON.stringify(this.state.updatedProfile));
                if (Object.keys(this.state.updatedProfile).length == 0) {
                    alert("No Changes Made");
                    return;
                }
                this.props.updateProfile(this.props.user, this.state.updatedProfile);
            },
            writable: true,
            configurable: true
        },
        uploadImage: {
            value: function uploadImage(files) {
                var _this = this;
                //Uploads Array of Files
                var image = files[0];
                var cloudName = "hiody6ehr"; //From Cloudinary Dashboard
                var url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload"; //URL from http://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_api
                var timestamp = Date.now() / 1000;
                var uploadPreset = "cpi4wdvs";
                var paramsString = "timestamp=" + timestamp + "&upload_preset=" + uploadPreset + "agpNQwxjQIVcT_AoK6s-C52wA6c";
                var signature = sha1(paramsString);
                var params = {
                    api_key: "937247372727724",
                    timestamp: timestamp,
                    upload_preset: uploadPreset,
                    signature: signature
                };
                APIManager.upload(url, image, params, function (err, response) {
                    if (err) {
                        //console.log('UPLOAD ERROR: ' + JSON.stringify(err))
                        alert(err);
                        return;
                    }
                    console.log("UPLOAD COMPLETE: " + JSON.stringify(response.body));
                    var imageUrl = response.body.secure_url;
                    var updatedProfile = Object.assign({}, _this.state.updatedProfile);
                    updatedProfile.image = imageUrl;
                    _this.setState({
                        updatedProfile: updatedProfile
                    });
                });
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var currentUser = this.props.user;
                var image = this.state.updatedProfile.image == null ? "" : ImageHelper.thumbnail(this.state.updatedProfile.image, 150); //thumbnail image
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h2",
                        null,
                        " Welcome ",
                        currentUser.username,
                        " "
                    ),
                    React.createElement("input", { type: "text", id: "username", onChange: this.updateCurrentUser.bind(this), defaultValue: currentUser.username, placeholder: "Username" }),
                    React.createElement("br", null),
                    React.createElement("input", { type: "text", id: "gender", onChange: this.updateCurrentUser.bind(this), defaultValue: currentUser.gender, placeholder: "Gender" }),
                    React.createElement("br", null),
                    React.createElement("input", { type: "text", id: "city", onChange: this.updateCurrentUser.bind(this), defaultValue: currentUser.city, placeholder: "City" }),
                    React.createElement("br", null),
                    React.createElement("img", { src: image }),
                    React.createElement("br", null),
                    React.createElement(Dropzone, { onDrop: this.uploadImage.bind(this) }),
                    React.createElement(
                        "button",
                        { onClick: this.updateProfile.bind(this) },
                        "Update Profile"
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return CurrentUser;
})(Component);

var stateToProps = function (state) {
    return {
        user: state.account.user
    };
};

var dispatchToProps = function (dispatch) {
    return {
        updateProfile: function (profile, updated) {
            return dispatch(actions.updateProfile(profile, updated));
        }
    };
};

module.exports = connect(stateToProps, dispatchToProps)(CurrentUser);
//console.log('UploadedImage: ')