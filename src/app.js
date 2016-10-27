var React = require('react');
var ReactDOM = require('react-dom');
var BugList = require('./buglist.js');
var BugEdit = require('./bugedit');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;


var NoMatch = React.createClass({
    render: function() {
        return (<div>No matching Route</div>);

    }
});



ReactDOM.render( 
    // <BugList url='/api/bugs'/>,
    (
        <Router>
            <Route path="/bugs" component={BugList} />
            <Redirect from="/" to="/bugs" />
            <Route path="/bugs/:id" component={BugEdit} />
            <Route path="/*" component={NoMatch} />
        </Router>
    ),
    document.getElementById('main')
);
