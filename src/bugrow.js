var React = require('react');

var BugRow = React.createClass({
    render: function() {
        console.log("Rendering BugRow:", this.props.bug);
        return(
            <tr>
                <td>{this.props.bug._id}</td>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
            </tr>
        )
    }
});

module.exports = BugRow;