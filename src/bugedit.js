var React = require('react');
var $ = require('jquery');

var BugEdit = React.createClass({

    getInitialState: function() {
        return {};
    },

    loadBug: function() {
        $.ajax({
            url: 'api/bugs/' + this.props.params.id,
            success: function(cb) {
                var bug = cb;
                this.setState({owner: bug.owner, title: bug.title, status: bug.status, priority: bug.priority});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        console.log("load: ", this.state);
    },

    saveChanges: function(data) {
        console.log('saving Changes ', data);
        $.ajax({
            method: 'PUT',
            url: 'api/bugs/' + this.props.params.id,
            contentType: 'application/JSON',
            data: JSON.stringify(data),
            success: function() {
                console.log('Changes saved');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadBug();
    },

    componentDidUpdate: function(prevProps) {
        console.log("BugEdit: componentDidUpdate", prevProps.params.id, this.props.params.id);
        if (this.props.params.id != prevProps.params.id) {this.loadBug();}
    },


    submitEdit: function(e) {
        e.preventDefault();
        var bug = {
            owner: this.state.owner,
            title: this.state.title,
            status: this.state.status,
            priority: this.state.priority
        };
        this.saveChanges(bug);
    },

    onChangeOwner: function(e) {
        this.setState({owner: e.target.value});
    },

    onChangeTitle: function(e) {
        this.setState({title: e.target.value});
    },

    onChangeStatus: function(e) {
        this.setState({status: e.target.value});
        console.log('status: ', this.state.status);
    },
    onChangePriority: function(e) {
        this.setState({priority: e.target.value});
    },


    render: function() {

        return(
            <div>
                <h3>edit bug here:</h3>
                <div>
                    <input type="text" name="owner" value={this.state.owner} onChange={this.onChangeOwner}/>
                    <input type="text" name="title" value={this.state.title} onChange={this.onChangeTitle}/>
                    <select name="status" value={this.state.status} onChange={this.onChangeStatus}>
                        <option value="open">open</option>
                        <option value="closed">closed</option>
                    </select>
                    <select name="priority" value={this.state.priority}onChange={this.onChangePriority}>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </select>
                    <button onClick={this.submitEdit}>Save Edit</button>

                </div>
            </div>
        );
    }
});

module.exports = BugEdit;