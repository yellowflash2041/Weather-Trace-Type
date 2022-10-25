const api = "https://fcc-weather-api.glitch.me/api/current?";
const tempUnit = "C";
let lat, lon, currentTempInCelsius;

$(document).ready(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = "lat=" + position.coords.latitude;
      lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  $("#tempunit").click(() => {
    const currentTempUnit = $("#tempunit").text();
    const newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F") {
      const fahTemp = Math.round((parseInt($("#temp").text()) * 9) / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }
  });
});

const getWeather = (lat, lon) => {
  const urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString,
    success: (result) => {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
      IconGen(result.weather[0].main);
    },
  });
};

const IconGen = (desc) => {
  desc = desc.toLowerCase();
  switch (desc) {
    case "drizzle":
      addIcon(desc);
      break;
    case "clouds":
      addIcon(desc);
      break;
    case "rain":
      addIcon(desc);
      break;
    case "snow":
      addIcon(desc);
      break;
    case "clear":
      addIcon(desc);
      break;
    case "thunderstom":
      addIcon(desc);
      break;
    default:
      $("div.clouds").removeClass("hide");
  }
};

const addIcon = (desc) => {
  $("div." + desc).removeClass("hide");
};
