var React = require("react");
var ReactDom = require("react-dom");
var d3 = require("d3");
var _ = require("underscore");


var AppList = React.createClass({
	votarPresin: function(e){
		e.preventDefault();
        var item = e.target.value;
		this.props.onVoteSubmit(item);
	},
	render: function(){
		var _this = this;
		var crearAvatar = function(item,index){
			return(
				<div className="Avatar" id={index} key={index}>
                    
					<div className="Avatar-title">
						Nombre: -{item.name}-Tipo: -{item.type}------> votos {item.votes}
					</div>
					<div className="Avatar-image">
						<img src={`img/${index+1}.png`} alt={item.lname}/>
					</div>
					<div className="Avatar-button">
						<a href="#" onClick={_this.votarPresin} ref="pres" value={index}>Votar</a>
					</div>
				</div>
			);
		};
		return <div className="Avatars">
                <h2>Personajes</h2>
				{this.props.items.map(crearAvatar)} 
				</div>;
	}
});

var Chart = React.createClass({
    render: function() {
      return (
        <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
      );
    }
});

var Bar = React.createClass({
    getDefaultProps: function() {
      return {
        width: 0,
        height: 0,
        offset: 0
      }
    },
    render: function() {
      return (
        <rect fill={this.props.color}
          width={this.props.width} height={this.props.height} 
          x={this.props.offset} y={this.props.availableHeight - this.props.height} />
      );
    }
});

var DataSeries = React.createClass({
    getDefaultProps: function() {
      return {
        title: '',
        data: []
      }
    },
    render: function() {
      var props = this.props;

      var yScale = d3.scale.linear()
        .domain([0, d3.max(this.props.data)])
        .range([0, this.props.height]);

      var xScale = d3.scale.ordinal()
        .domain(d3.range(this.props.data.length))
        .rangeRoundBands([0, this.props.width], 0.05);

      var bars = _.map(this.props.data, function(point, i) {
        var hgt = point.votes;
        console.log(yScale(hgt));
        return (
          <Bar height={(hgt)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} color={props.color} key={i} />
        )
      });
      return (
        <g>{bars}</g>
      );
    }
});

var AppResult = React.createClass({
    getDefaultProps: function() {
      return {
        width: 600,
        height: 300
      }
    },
	render : function(){
		return (<div className="Results">
			<h2>Estadistica</h2>
			<Chart width={this.props.width} height={this.props.height}>
              <DataSeries data={this.props.items} width={this.props.width} height={this.props.height} color="cornflowerblue" />
            </Chart>
		</div>);
	}
});


var App = React.createClass({
	getInitialState:function(){
		return{
			candidatos:[
				{name:'Bulbasaur',type:'Planta',votes:0},
				{name:'Charmander',type:'Fuego',votes:0},
				{name:'Squirtle',type:'Agua',votes:0},
				{name:'Butterfree',type:'Bicho',votes:0},
				{name:'Caterpie',type:'Bicho',votes:0},
				{name:'Pidgey',type:'Normal',votes:0},
				{name:'Rattata',type:'Normal',votes:0},
				{name:'Pikachu',type:'Eléctrico',votes:0},
				{name:'Nidoran Hembra',type:'Veneno',votes:0}
		]};
	},
	handleSubmit:function(result){
		var _this = this;		
		var json = this.state.candidatos;
		json.map(function(item,index){
			if (index == result) {
				var n = _this.state.candidatos;
				n[index].votes=(n[index].votes+1);
				_this.setState({candidatos:n});
				console.log(`${item.name}-->${index}`);
			}
		});		
	},
	render : function(){
		return (
			<div className="App">
				<div className="App-title">
                    <h1>codemario</h1>
                </div>
				<div className="App__Body">
					<AppList onVoteSubmit={this.handleSubmit} items={this.state.candidatos}/>					
                    <AppResult items={this.state.candidatos}/>
				</div>				
			</div>
			);
	}
});
 

ReactDom.render(<App />,document.getElementById('app'));
