var axios =require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=4fb34e2cbb819e9aa4b0846490c4d937';

module.exports = {
  getTemp: function(location){
var encodedLocation = encodeURIComponent(location);
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

    return axios.get(requestUrl).then(function(response){
      debugger;
      if(response.data.cod && response.data.message){
        throw new Error(response.data.message);
      }else{
        return response.data.main.temp;
      }
    },function(response){
      debugger;
      throw new Error(response.response.data.message);
    });
  }
}
