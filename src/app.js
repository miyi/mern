//var data = require(./data/data.js);


var BugList = React.createClass({
    getInitialState: function() {
        return {bugs:[]}
    },
    loadBugs: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({bugs: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        // $.ajax('/api/bugs').done(function(bugs) {
        //     this.setState({bugs:bugs});
        // }.bind(this));
    },

    componentDidMount: function() {
            this.loadBugs();
    },
    render: function() {
        console.log("Rendering bug list, num items:", this.state.bugs.length);
        return (
            <div>
                <h1>Bug Tracker</h1>
                <BugFilter />
                <hr />
                <BugTable bugs = {this.state.bugs}/>
                <hr />
                <BugSubmitForm addBug = {this.addBug}/>
            </div>
        )
    },

    addBug: function(newBugJSON) {
        console.log('adding a new bug: ', newBugJSON);

        //TODO: optimistic updates

        $.ajax({
            type: 'post',
            url: this.props.url,
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

var BugFilter = React.createClass({
    render: function() {
        return (
            <div>A way to filter the list of bugs would come here.</div>
        )
    }
});

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

var BugTable = React.createClass({
    render: function() {
        console.log("Rendering bug table, num items:", this.props.bugs.length);
        var bugRows = this.props.bugs.map(function(bug) {

            return <BugRow key={bug._id} bug={bug}/>

        });

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Owner</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                    {bugRows}
                    </tbody>
                </table>
            </div>
        )
    }
});

var BugSubmitForm = React.createClass({

    submitToAddBug: function(e) {
        e.preventDefault();
        console.log('handling submit');

        //document.forms.formname has to be the form name of the form I'm trying to submit under name attribute
        var form = document.forms.bugForm;


        // TODO: send req to server
        this.props.addBug({owner: form.owner.value, title: form.title.value, status: form.status.value, priority: form.priority.value});
        form.owner.value = ""; form.title.value = ""; form.status.value = ""; form.priority.value = "";


    },

    render: function() {
        console.log('Rendering Bug Submit Form');
        return(
            <div>
                <form name="bugForm">
                    <input type="text" name="owner" placeholder="Owner" />
                    <input type="text" name="title" placeholder="Title" />
                    <input type="text" name="status" placeholder="Status" />
                    <input type="text" name="priority" placeholder="priority" />
                    <button onClick={this.submitToAddBug}>Add Bug</button>
                </form>
            </div>
        );
    }
});

ReactDOM.render(
    <BugList url='/api/bugs'/>,
    document.getElementById('main')
);
