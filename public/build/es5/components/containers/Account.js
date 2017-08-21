"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var actions = require("../../actions").actions;
var connect = require("react-redux").connect;
var Link = require("react-router").Link;
var Account = (function (Component) {
    function Account() {
        _classCallCheck(this, Account);

        _get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this);
        this.state = {
            profile: {
                username: "",
                password: "",
                city: "",
                gender: ""
            }
        };
    }

    _inherits(Account, Component);

    _prototypeProperties(Account, null, {
        componentDidMount: {

            //Check for if user logged in moved to Server Side
            value: function componentDidMount() {},
            writable: true,
            configurable: true
        },
        login: {
            value: function login(event) {
                var _this = this;
                event.preventDefault();
                console.log("login: " + JSON.stringify(this.state.profile));
                var username = this.state.profile.username;
                var password = this.state.profile.password;
                if (username.length == 0) {
                    alert("Please Enter Your Username");
                    return;
                }
                if (password.length == 0) {
                    alert("Please Enter a Password");
                    return;
                }

                APIManager.post("/account/login", this.state.profile, function (err, response) {
                    if (err) {
                        alert(err.message);
                        return;
                    }
                    console.log(JSON.stringify(response));
                    _this.props.currentUserReceived(response.user);
                });
            },
            writable: true,
            configurable: true
        },
        logout: {
            value: function logout(event) {
                var _this = this;
                event.preventDefault();
                console.log("logout: ");
                APIManager.get("/account/logout", null, function (err, response) {
                    if (err) {
                        alert(err.message);
                        return;
                    }
                    console.log(JSON.stringify(response));
                    _this.props.currentUserReceived(null);
                });
            },
            writable: true,
            configurable: true
        },
        updateProfile: {
            value: function updateProfile(event) {
                event.preventDefault();
                console.log(event.target.id + " == " + event.target.value);
                var updatedProfile = Object.assign({}, this.state.profile);
                updatedProfile[event.target.id] = event.target.value;
                this.setState({
                    profile: updatedProfile
                });
            },
            writable: true,
            configurable: true
        },
        register: {
            value: function register(event) {
                var _this = this;
                event.preventDefault();
                console.log("register: " + JSON.stringify(this.state.profile));
                var username = this.state.profile.username;
                var password = this.state.profile.password;
                var city = this.state.profile.city;
                var gender = this.state.profile.gender;
                if (username.length == 0) {
                    alert("Please Enter Your Username");
                    return;
                }
                if (password.length == 0) {
                    alert("Please Enter a Password");
                    return;
                }
                if (city.length == 0) {
                    alert("Please Enter a City");
                    return;
                }
                if (gender.length == 0) {
                    alert("Please Enter a Gender");
                    return;
                }

                APIManager.post("/account/register", this.state.profile, function (err, response) {
                    if (err) {
                        alert(err.message);
                        return;
                    }
                    console.log(JSON.stringify(response));
                    _this.props.currentUserReceived(response.user);
                });
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var content = null;
                if (this.props.user == null) {
                    content = React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "h2",
                            null,
                            "Login"
                        ),
                        React.createElement("input", { id: "username", onChange: this.updateProfile.bind(this), type: "text", placeholder: "username" }),
                        React.createElement("br", null),
                        React.createElement("input", { id: "password", onChange: this.updateProfile.bind(this), type: "password", placeholder: "password" }),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: this.login.bind(this) },
                            "Log In"
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "h2",
                            null,
                            "Register"
                        ),
                        React.createElement("input", { id: "username", onChange: this.updateProfile.bind(this), type: "text", placeholder: "username" }),
                        React.createElement("br", null),
                        React.createElement("input", { id: "password", onChange: this.updateProfile.bind(this), type: "password", placeholder: "password" }),
                        React.createElement("br", null),
                        React.createElement("input", { id: "city", onChange: this.updateProfile.bind(this), type: "text", placeholder: "city" }),
                        React.createElement("br", null),
                        React.createElement("input", { id: "gender", onChange: this.updateProfile.bind(this), type: "text", placeholder: "gender" }),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: this.register.bind(this) },
                            "Join"
                        ),
                        React.createElement("br", null)
                    );
                } else {
                    content = React.createElement(
                        "div",
                        null,
                        React.createElement("img", { style: { borderRadius: 40, float: "left", marginRight: 12 }, src: ImageHelper.thumbnail(this.props.user.image, 80) }),
                        React.createElement(
                            "h2",
                            null,
                            "Welcome ",
                            this.props.user.username,
                            "!"
                        ),
                        React.createElement(
                            "span",
                            null,
                            this.props.user.city
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { onClick: this.logout.bind(this) },
                            "Log Out"
                        ),
                        React.createElement(
                            Link,
                            { to: "/currentuser" },
                            React.createElement(
                                "button",
                                null,
                                "Account"
                            )
                        )
                    );
                }
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

    return Account;
})(Component);

/*State Variables To Properties*/
var stateToProps = function (state) {
    //state may also be known as store...convention to call state
    return {
        user: state.account.user
    };
};

/*Store Variables To Properties*/
var dispatchToProps = function (dispatch) {
    return {
        currentUserReceived: function (user) {
            return dispatch(actions.currentUserReceived(user));
        }
    };
};

module.exports = connect(stateToProps, dispatchToProps)(Account);
//Updates state which updates container
//Able to reuse this here
//Able to reuse this here