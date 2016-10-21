/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	//var data = require(./data/data.js);


	var BugList = React.createClass({
	    displayName: 'BugList',

	    getInitialState: function () {
	        return { bugs: [] };
	    },
	    loadBugs: function () {
	        $.ajax({
	            url: this.props.url,
	            dataType: 'json',
	            cache: false,
	            success: function (data) {
	                this.setState({ bugs: data });
	            }.bind(this),
	            error: function (xhr, status, err) {
	                console.error(this.props.url, status, err.toString());
	            }.bind(this)
	        });

	        // $.ajax('/api/bugs').done(function(bugs) {
	        //     this.setState({bugs:bugs});
	        // }.bind(this));
	    },

	    componentDidMount: function () {
	        this.loadBugs();
	    },
	    render: function () {
	        console.log("Rendering bug list, num items:", this.state.bugs.length);
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'h1',
	                null,
	                'Bug Tracker'
	            ),
	            React.createElement(BugFilter, null),
	            React.createElement('hr', null),
	            React.createElement(BugTable, { bugs: this.state.bugs }),
	            React.createElement('hr', null),
	            React.createElement(BugSubmitForm, { addBug: this.addBug })
	        );
	    },

	    addBug: function (newBugJSON) {
	        console.log('adding a new bug: ', newBugJSON);

	        //TODO: optimistic updates

	        $.ajax({
	            type: 'post',
	            url: this.props.url,
	            contentType: 'application/JSON',
	            data: JSON.stringify(newBugJSON),
	            success: function (data) {
	                var newBug = data;
	                var bugsModified = this.state.bugs.concat(newBug);
	                //concat is the preferred way to mutate a react state, but react also has an "immutability helper'
	                this.setState({ bugs: bugsModified });
	            }.bind(this),
	            error: function (xhr, status, err) {
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

	var BugFilter = React.createClass({
	    displayName: 'BugFilter',

	    render: function () {
	        return React.createElement(
	            'div',
	            null,
	            'A way to filter the list of bugs would come here.'
	        );
	    }
	});

	var BugRow = React.createClass({
	    displayName: 'BugRow',

	    render: function () {
	        console.log("Rendering BugRow:", this.props.bug);
	        return React.createElement(
	            'tr',
	            null,
	            React.createElement(
	                'td',
	                null,
	                this.props.bug._id
	            ),
	            React.createElement(
	                'td',
	                null,
	                this.props.bug.status
	            ),
	            React.createElement(
	                'td',
	                null,
	                this.props.bug.priority
	            ),
	            React.createElement(
	                'td',
	                null,
	                this.props.bug.owner
	            ),
	            React.createElement(
	                'td',
	                null,
	                this.props.bug.title
	            )
	        );
	    }
	});

	var BugTable = React.createClass({
	    displayName: 'BugTable',

	    render: function () {
	        console.log("Rendering bug table, num items:", this.props.bugs.length);
	        var bugRows = this.props.bugs.map(function (bug) {

	            return React.createElement(BugRow, { key: bug._id, bug: bug });
	        });

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'table',
	                null,
	                React.createElement(
	                    'thead',
	                    null,
	                    React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                            'th',
	                            null,
	                            'Id'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            'Status'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            'Priority'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            'Owner'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            'Title'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'tbody',
	                    null,
	                    bugRows
	                )
	            )
	        );
	    }
	});

	var BugSubmitForm = React.createClass({
	    displayName: 'BugSubmitForm',


	    submitToAddBug: function (e) {
	        e.preventDefault();
	        console.log('handling submit');

	        //document.forms.formname has to be the form name of the form I'm trying to submit under name attribute
	        var form = document.forms.bugForm;

	        // TODO: send req to server
	        this.props.addBug({ owner: form.owner.value, title: form.title.value, status: form.status.value, priority: form.priority.value });
	        form.owner.value = "";form.title.value = "";form.status.value = "";form.priority.value = "";
	    },

	    render: function () {
	        console.log('Rendering Bug Submit Form');
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'form',
	                { name: 'bugForm' },
	                React.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
	                React.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
	                React.createElement('input', { type: 'text', name: 'status', placeholder: 'Status' }),
	                React.createElement('input', { type: 'text', name: 'priority', placeholder: 'priority' }),
	                React.createElement(
	                    'button',
	                    { onClick: this.submitToAddBug },
	                    'Add Bug'
	                )
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(BugList, { url: '/api/bugs' }), document.getElementById('main'));

/***/ }
/******/ ]);