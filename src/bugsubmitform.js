var React = require('react');

var BugSubmitForm = React.createClass({

    submitToAddBug: function(e) {
        e.preventDefault();

        //document.forms.formname has to be the form name of the form I'm trying to submit under name attribute
        var form = document.forms.bugForm;


        // TODO: send req to server
        this.props.addBug({owner: form.owner.value, title: form.title.value, status: form.status.value, priority: form.priority.value});
        form.owner.value = ""; form.title.value = ""; form.status.value = ""; form.priority.value = "";


    },

    render: function() {
        return(
            <div>
                <form name="bugForm">
                    <input type="text" name="owner" placeholder="Owner" />
                    <input type="text" name="title" placeholder="Title" />
                    <select name="status">
                        <option value="" disabled="disabled" selected="selected">select status</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                    <select name="priority">
                        <option value="" disabled="disabled" selected="selected">select priority</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </select>
                    <button onClick={this.submitToAddBug}>Add Bug</button>
                </form>
            </div>
        );
    }
});

module.exports = BugSubmitForm;

