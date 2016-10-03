var React  = require('react');
var ReactDOM = require('react-dom');

var BugList = React.createClass({
    render: function() {
        return (
            <div>bugs will be shown here</div>
        )
    }
});

ReactDOM.render(
    <BugList />,
    document.getElementById('main')
);
