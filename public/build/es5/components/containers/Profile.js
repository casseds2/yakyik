"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var actions = require("../../actions").actions;
var connect = require("react-redux").connect;
var Profile = (function (Component) {
    function Profile() {
        _classCallCheck(this, Profile);

        _get(Object.getPrototypeOf(Profile.prototype), "constructor", this).call(this);
        this.state = {};
    }

    _inherits(Profile, Component);

    _prototypeProperties(Profile, null, {
        componentDidMount: {
            value: function componentDidMount() {
                var profile = this.props.profiles[this.props.username]; //Taken From The Map
                console.log("Profile Container: " + JSON.stringify(profile));
                if (profile == null) {
                    //Fetch the profile if it has not already been downloaded
                    console.log("Profile Container Fetching Profile...");
                    this.props.fetchProfile({ username: this.props.username });
                }
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var profile = this.props.profiles[this.props.username];
                var header = null;
                if (profile != null) {
                    header = React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "h3",
                            null,
                            profile.username
                        ),
                        React.createElement(
                            "p",
                            null,
                            "gender: ",
                            profile.gender,
                            " ",
                            React.createElement("br", null),
                            "city: ",
                            profile.city,
                            " ",
                            React.createElement("br", null)
                        )
                    );
                }
                //const content = ( this.props.appStatus == 'loading' ) ? 'Loading...' : header
                var content = this.props.profiles[this.props.username] == null ? "Loading..." : header;
                return React.createElement(
                    "div",
                    null,
                    content
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Profile;
})(Component);

/*State Variables To Properties*/
var stateToProps = function (state) {
    //state may also be known as store...convention to call state
    return {
        profiles: state.profile.map,
        appStatus: state.profile.appStatus
    };
};

/*Store Variables To Properties*/
var dispatchToProps = function (dispatch) {
    return {
        fetchProfile: function (params) {
            return dispatch(actions.fetchProfile(params));
        },
        profileReceived: function (profile) {
            return dispatch(actions.profileReceived(profile));
        }
    };
};


module.exports = connect(stateToProps, dispatchToProps)(Profile);