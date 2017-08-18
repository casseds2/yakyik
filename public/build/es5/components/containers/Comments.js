"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _presentation = require("../presentation");

var CreateComment = _presentation.CreateComment;
var Comment = _presentation.Comment;
var styles = _interopRequire(require("./styles"));

var APIManager = require("../../utils").APIManager;
var actions = require("../../actions").actions;
var connect = require("react-redux").connect;
var Comments = (function (Component) {
    function Comments() {
        _classCallCheck(this, Comments);

        _get(Object.getPrototypeOf(Comments.prototype), "constructor", this).call(this);
        this.state = {};
    }

    _inherits(Comments, Component);

    _prototypeProperties(Comments, null, {
        componentDidUpdate: {

            /*Override Function -- Triggered By Change In the Store(Redux Changes State Form Store)*/
            value: function componentDidUpdate() {
                var _this = this;
                //console.log('Comments Container: componentDidUpdate')
                var zone = this.props.zones[this.props.index];
                if (zone == null) {
                    console.log("NO SELECTED ZONE");
                    return;
                }
                //Stop Duplicate Downloads of Comments from API
                //If the Key List At the Current Key is Not Null, it Has Already Been Downloaded
                var commentsArray = this.props.commentsMap[zone._id];
                if (commentsArray != null) {
                    return;
                }
                APIManager.get("/api/comment", { zone: zone._id }, function (err, response) {
                    if (err) {
                        alert("ERROR: " + err.message);
                        return;
                    }
                    var comments = response.results;
                    _this.props.commentsReceived(comments, zone);
                });
            },
            writable: true,
            configurable: true
        },
        submitComment: {
            value: function submitComment(comment) {
                var _this = this;
                if (this.props.user == null) {
                    alert("Please Sign Up or Log In To Comment");
                    return;
                }
                var updatedComment = Object.assign({}, comment);
                //Assign Zone Property of Currently Selected Zone
                var zone = this.props.zones[this.props.index];
                updatedComment.zone = zone._id;
                updatedComment.username = this.props.user.username;
                console.log("submitComment: " + JSON.stringify(updatedComment));
                updatedComment.author = {
                    id: this.props.user._id,
                    username: this.props.user.username,
                    image: this.props.user.image
                };
                APIManager.post("/api/comment", updatedComment, function (err, response) {
                    if (err) {
                        alert("ERROR: " + err.message);
                        return;
                    }
                    var updatedComment = response.results;
                    _this.props.commentCreated(updatedComment);
                });
            },
            writable: true,
            configurable: true
        },
        updateUserName: {
            value: function updateUserName(event) {
                //console.log('updateUserName: ' + event.target.value)
                var updatedComment = Object.assign({}, this.state.comment);
                updatedComment.username = event.target.value;
                this.setState({
                    comment: updatedComment
                });
            },
            writable: true,
            configurable: true
        },
        updateComment: {
            value: function updateComment(comment, updatedBody) {
                console.log("updateComment: " + comment._id + ", " + updatedBody);
                //Want to Update the Comment in Database Here
                this.props.updateComment(comment, { body: updatedBody });
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var _this = this;
                var selectedZone = this.props.zones[this.props.index];
                var currentUser = this.props.user; //null if not logged in
                var zoneName = null;
                var commentList = null;


                if (selectedZone != null) {
                    zoneName = selectedZone.name;
                    var zoneComments = this.props.commentsMap[selectedZone._id];
                    if (zoneComments != null) {
                        commentList = zoneComments.map(function (comment, i) {
                            var editable = false;
                            if (currentUser != null) {
                                if (currentUser._id == comment.author.id) editable = true;
                            }
                            return React.createElement(
                                "li",
                                { key: i },
                                React.createElement(Comment, { onUpdate: _this.updateComment.bind(_this), isEditable: editable, currentComment: comment })
                            );
                        });
                    }
                }

                var commentsStyle = styles.comment;
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h2",
                        null,
                        " ",
                        zoneName,
                        " "
                    ),
                    React.createElement(
                        "div",
                        { style: commentsStyle.commentsBox },
                        React.createElement(
                            "ul",
                            { style: commentsStyle.commentsList },
                            commentList
                        ),
                        React.createElement(CreateComment, { onCreate: this.submitComment.bind(this) })
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Comments;
})(Component);

/*State Variables To Properties*/
var stateToProps = function (state) {
    //state may also be known as store...convention to call state
    return {
        commentsMap: state.comment.map,
        commentsLoaded: state.comment.commentsLoaded,
        index: state.zone.selectedZone,
        zones: state.zone.list,
        user: state.account.user
    };
};

/*Store Variables To Properties*/
var dispatchToProps = function (dispatch) {
    return {
        commentsReceived: function (comments, zone) {
            return dispatch(actions.commentsReceived(comments, zone));
        },
        commentCreated: function (comment) {
            return dispatch(actions.commentCreated(comment));
        },
        updateComment: function (comment, params) {
            return dispatch(actions.updateComment(comment, params));
        }

    };
};

module.exports = connect(stateToProps, dispatchToProps)(Comments);
//Could also use this approach, re-uses code and is elegant
//this.props.commentsReceived([updatedComment], zone)