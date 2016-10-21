var React = require('react');

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
                    <select name="status">
                        <option value="" disabled="disabled" selected="selected">select status</option>
                        <option value="open">open</option>
                        <option value="closed">closed</option>
                    </select>
                    <select name="priority">
                        <option value="" disabled="disabled" selected="selected">select priority</option>
                        <option value="super urgent">super urgent</option>
                        <option value="urgent">urgent</option>
                        <option value="high">high</option>
                    </select>
                    <button onClick={this.submitToAddBug}>Add Bug</button>
                </form>
            </div>
        );
    }
});

module.exports = BugSubmitForm;

