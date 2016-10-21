var React = require('react');

var BugFilter = React.createClass({
    getInitialState: function() {
        var initFilter = this.props.initFilter;
        return ({status: initFilter.status, priority: initFilter.priority});
    },

    onChangeStatus: function() {
        this.submit();
    },
    onChangePriority: function() {
        this.submit();
    },

    render: function() {

        return (
            <div>
                <h3>Filter:</h3>
                <select value={this.state.status} onChange={this.onChangeStatus}>
                    <option value="" disabled="disabled" selected="selected">select status</option>
                    <option value="open">open</option>
                    <option value="closed">closed</option>
                </select>
                <select value={this.state.priority} onChange={this.onChangePriority}>
                    <option value="" disabled="disabled" selected="selected">select Priority</option>
                    <option value="super urgent">super urgent</option>
                    <option value="urgent">urgent</option>
                    <option value="high">high</option>
                </select>
            </div>
        )
    },

    submit: function() {
        console.log('testing filter');
        this.props.filterHandler({status: this.state.status, priority: this.state.priority});
    }
});

module.exports = BugFilter;