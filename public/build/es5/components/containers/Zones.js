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

var Zone = _presentation.Zone;
var CreateZone = _presentation.CreateZone;
var APIManager = require("../../utils").APIManager;
var connect = require("react-redux").connect;
var actions = require("../../actions").actions;
var Zones = (function (Component) {
    function Zones() {
        _classCallCheck(this, Zones);

        _get(Object.getPrototypeOf(Zones.prototype), "constructor", this).call(this);
        this.state = {};
    }

    _inherits(Zones, Component);

    _prototypeProperties(Zones, null, {
        componentDidMount: {
            value: function componentDidMount() {
                //console.log('Zones componentDidMount: ')
                this.props.fetchZones(null);
            },
            writable: true,
            configurable: true
        },
        submitZone: {
            value: function submitZone(zone) {
                var _this = this;
                console.log("SUBMITTED ZONE: " + JSON.stringify(zone));
                APIManager.post("/api/zone", zone, function (err, response) {
                    if (err) {
                        alert("ERROR: " + err.message);
                        return;
                    }
                    console.log("ZONE CREATED: " + JSON.stringify(response));
                    //Dispatch An Action
                    var zone = response.results;
                    _this.props.zoneCreated(zone);
                });
            },
            writable: true,
            configurable: true
        },
        selectZone: {
            value: function selectZone(index) {
                this.props.selectedZone(index);
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var _this = this;


                var listItems = this.props.list.map(function (zone, i) {
                    var selected = i == _this.props.selected;
                    return React.createElement(
                        "li",
                        { key: i },
                        React.createElement(Zone, { index: i, select: _this.selectZone.bind(_this), isSelected: selected, currentZone: zone })
                    );
                });

                var content = null;
                if (this.props.appStatus == "loading") {
                    content = "LOADING...";
                } else {
                    content = React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "ol",
                            null,
                            listItems
                        ),
                        React.createElement(CreateZone, { onCreate: this.submitZone.bind(this) })
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

    return Zones;
})(Component);

/*The following are properties (props)*/

//This allows us use this.props.list...assigns state to property
var stateToProps = function (state) {
    //state here also knows as store
    return {
        appStatus: state.zone.appStatus,
        list: state.zone.list,
        selected: state.zone.selectedZone
    };
};

//Bad form to reference store directly so we use this function
var dispatchToProps = function (dispatch) {
    return {
        zonesReceived: function (zones) {
            return dispatch(actions.zonesReceived(zones));
        },
        zoneCreated: function (zone) {
            return dispatch(actions.zoneCreated(zone));
        },
        selectedZone: function (index) {
            return dispatch(actions.selectedZone(index));
        },
        fetchZones: function (params) {
            return dispatch(actions.fetchZones(params));
        }
    };
};

module.exports = connect(stateToProps, dispatchToProps)(Zones);
//Removed API call from here and put it into actions: fetchZones