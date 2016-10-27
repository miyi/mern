var React = require('react');

var BugFilter = React.createClass({

    getInitialState: function() {
        var initFilter = this.props.initFilter;
        return {status: initFilter.status, priority: initFilter.priority};
    },

    componentWillReceiveProps: function(nextProps) {
        //check if this works with just initfilter... it doesn't
        if(nextProps.initFilter.status === this.state.status && nextProps.initFilter.priority === this.state.priority) {
            console.log("BugFilter: componentWillReceiveProps, no filter change");
            return;
        }
        console.log("BugFilter: componentWillReceiveProps, new filter:", nextProps.initFilter);
        this.setState({status: nextProps.initFilter.status, priority: nextProps.initFilter.priority});
        console.log('this.state: ', this,state );

    },

    render: function() {
        console.log("state = ", this.state);
        return (
            <div>
                <h3>Filter</h3>
                Status:
                <select value={this.state.status} onChange={this.onChangeStatus}>
                    <option value="">(Any)</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>
                <br/>
                Priority:
                <select value={this.state.priority} onChange={this.onChangePriority}>
                    <option value="">(Any)</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                    <option value="P3">P3</option>
                </select>
                <br/>
                <button onClick={this.submit}>Apply</button>
            </div>
        )
    },

    onChangeStatus: function(e) {
        this.setState({status: e.target.value});
    },
    onChangePriority: function(e) {
        this.setState({priority: e.target.value});
    },

    submit: function(e) {
        e.preventDefault();
        var newFilter = {};
        if(this.state.status) newFilter.status = this.state.status;
        if(this.state.priority) newFilter.priority = this.state.priority;
        this.props.filterHandler(newFilter);

    }
});

module.exports = BugFilter;