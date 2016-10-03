var React = require('react');
var ReactDOM = require('react-dom');

var BugList = React.createClass({
    displayName: 'BugList',

    render: function () {
        return React.createElement(
            'div',
            null,
            'bugs will be shown here'
        );
    }
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));