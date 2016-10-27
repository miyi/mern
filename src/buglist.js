var React = require('react');
var $ = require('jquery');
var BugTable = require('./bugtable.js');
var BugFilter = require('./bugfilter.js');
var BugSubmitForm = require('./bugsubmitform.js');


var BugList = React.createClass({

    getInitialState: function() {
        return {bugs:[], api: '/api/bugs'}
    },

    changeFilter: function(newFilter) {
        this.props.history.push({search: '?' + $.param(newFilter)});
    },
    loadBugs: function() {
        console.log('this.location.query: ', this.props.location.query);
        // data: this.props.location.query works but using filter is probably better for error purposes
        var query = this.props.location.query || {};
        var filter = {status: query.status, priority: query.priority};
        $.ajax({
            url: this.state.api,
            data: filter,
            cache: false,
            success: function(cb) {
                this.setState({bugs: cb});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadBugs();
    },
    componentDidUpdate: function(prevProps) {
        var oldQ = prevProps.location.query;
        var newQ = this.props.location.query;
        if(oldQ.status === newQ.status && oldQ.priority === newQ.priority) {
            console.log("component did update, no change in filter");
            return;
        } else {
            console.log('component did update, filter changed');
            this.loadBugs();
        }

    },

    render: function() {
        return (
            <div>
                <h1>Bug Tracker</h1>
                <BugFilter filterHandler = {this.changeFilter} initFilter={this.props.location.query}/>
                <hr />
                <BugTable bugs = {this.state.bugs}/>
                <hr />
                <BugSubmitForm addBug = {this.addBug}/>
            </div>
        )
    },

    addBug: function(newBugJSON) {

        //TODO: optimistic updates

        $.ajax({
            type: 'post',
            url: this.state.api,
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