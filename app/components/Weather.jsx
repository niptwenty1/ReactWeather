var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openweathermap = require('openweathermap');
var ErrorModal = require('ErrorModal');

var Weather = React.createClass({
  getInitialState: function () {
    return{
        isLoading: false
    }

  },
  handleSearch: function(location){
    var that = this;

    this.setState({
      isLoading: true,
      errorMessage : undefined,
      location : undefined,
      temp: undefined
    });

    openweathermap.getTemp(location).then(function(temp){
      that.setState({
        location:location,
        temp: temp,
        isLoading: false
      });
    }, function(e){
      that.setState({
          isLoading: false,
          errorMessage: e.message,
          title: 'Error'
      })
    });
  },
  componentWillReceiveProps: function(newProps){
    var location = newProps.location.query.location;

    if(location && location.length>0){
        this.handleSearch(location);
        window.location.hash = '#/';
    }
  },
  componentDidMount: function(){
    var location = this.props.location.query.location;

    if(location && location.length>0){
        this.handleSearch(location);
        window.location.hash = '#/';
    }
  },
  render: function(){
    var {isLoading, temp, location, errorMessage, title} = this.state;
    function renderMessage(){
      if (isLoading){
        return <h3 className="text-center">fetching weather...</h3>;
      }else if(temp && location){
        return   <WeatherMessage temp={temp} location={location}/>;
      }
    }
    function renderError(){
      if (typeof errorMessage === 'string'){
        return (
          <ErrorModal title={title} errorMessage={errorMessage}/>
        )
      }
    }

    return (

      <div>
        <h2 className="page-title">Weather Component</h2>
        <WeatherForm onSearch={this.handleSearch}/>
        {renderMessage()}
        {renderError()}
      </div>

    );
  }

});
module.exports= Weather;
