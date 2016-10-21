var React = require('react');

var BugFilter = React.createClass({
    render: function() {

        return (
            <div>
                <button onClick={this.submit}>test Filter</button>
            </div>
        )
    },

    submit: function(e) {
        console.log('testing filter');
        e.preventDefault;
        this.props.filterHandler({priority: "P3"});
    }
});

module.exports = BugFilter;