var React = require('react');
var $ = require('jquery');
var BugTable = require('./bugtable.js');
var BugFilter = require('./bugfilter.js');
var BugSubmitForm = require('./bugsubmitform.js');


var BugList = React.createClass({

    getInitialState: function() {
        return {bugs:[], api: '/api/bugs'}
    },
    loadBugs: function(filter) {
        $.ajax({
            url: this.props.api,
            data: filter,
            cache: false,
            success: function(cb) {
                this.setState({bugs: cb});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        // $.ajax('/api/bugs').done(function(bugs) {
        //     this.setState({bugs:bugs});
        // }.bind(this));
    },

    componentDidMount: function() {
        this.loadBugs({});
    },
    render: function() {
        console.log("Rendering bug list, num items:", this.state.bugs.length);
        return (
            <div>
                <h1>Bug Tracker</h1>
                <BugFilter filterHandler = {this.loadBugs} initFilter={this.props.location.query}/>
                <hr />
                <BugTable bugs = {this.state.bugs}/>
                <hr />
                <BugSubmitForm addBug = {this.addBug}/>
            </div>
        )
    },

    addBug: function(newBugJSON) {
        console.log('adding a new bug: ', newBugJSON);

        //TODO: optimistic updates

        $.ajax({
            type: 'post',
            url: this.props.api,
            contentType: 'application/JSON',
            data: JSON.stringify(newBugJSON),
            success: function(data) {
                var newBug = data;
                var bugsModified = this.state.bugs.concat(newBug);
                //concat is the preferred way to mutate a react state, but react also has an "immutability helper'
                this.setState({bugs:bugsModified});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        // We're advised not to modify the state directly, it's immutable. So, make a copy and setState with the copy
        // var bugsModified = this.state.bugs.slice();
        // newBugJSON.id = this.state.bugs.length + 1;
        // bugsModified.push(newBugJSON);
        // this.setState({bugs: bugsModified});

    }
});

module.exports = BugList;