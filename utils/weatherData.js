import request from 'request'

const openWeatherMap = {
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
  SECRET_KEY: "1e19256f39d77a510a2d31ba62844f6a",
};

const weatherData = (address, callback) => {
  const url =
    openWeatherMap.BASE_URL +
    encodeURIComponent(address) +
    "&APPID=" +
    openWeatherMap.SECRET_KEY;
  console.log(url);
  request({ url, json: true }, (error, data) => {
    if (error) {
      callback(true, "Unable to fetch data, Please try again. " + error);
    }
    callback(false, data?.body);
  });
};

export default weatherData

