var React = require("react");
var ReactDom = require("react-dom");

var App = React.createClass({
	render:function(){
		return <h2>application</h2>;
	}
});

ReactDom.render(<App />,document.getElementById('app'));