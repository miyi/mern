var React = require('react');
var Link = require('react-router').Link;
var BugRow = React.createClass({
    render: function() {
        return(
            <tr>
                <td><Link to={'/bugs/'+this.props.bug._id}>{this.props.bug._id}</Link></td>
                <td>{this.props.bug.status}</td>
                <td>{this.props.bug.priority}</td>
                <td>{this.props.bug.owner}</td>
                <td>{this.props.bug.title}</td>
            </tr>
        )
    }
});

module.exports = BugRow;