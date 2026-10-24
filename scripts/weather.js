        // User Story: getWeather Funktion
async function getWeather(city) {
  try {
    const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

// User Story: showWeather Funktion
async function showWeather(city) {
  // Wenn keine Stadt ausgewählt ist, nichts tun
  if (!city) return;

  const weatherData = await getWeather(city);

  if (weatherData === undefined) {
    alert("Something went wrong, please try again later.");
    return;
  }

  const icon = weatherData.weather?.[0]?.icon || '';
  const location = weatherData.name || 'N/A';
  const weatherMain = weatherData.weather?.[0]?.main || 'N/A';
  const temp = weatherData.main?.temp !== undefined ? weatherData.main.temp : 'N/A';
  const feelsLike = weatherData.main?.feels_like !== undefined ? weatherData.main.feels_like : 'N/A';
  const humidity = weatherData.main?.humidity !== undefined ? weatherData.main.humidity : 'N/A';
  const windSpeed = weatherData.wind?.speed !== undefined ? weatherData.wind.speed : 'N/A';
  const windGust = weatherData.wind?.gust !== undefined ? weatherData.wind.gust : 'N/A';

  // DOM Elemente aktualisieren
  document.getElementById('weather-icon').src = icon;
  document.getElementById('location').textContent = location;
  document.getElementById('weather-main').textContent = weatherMain;
  document.getElementById('main-temperature').textContent = temp;
  document.getElementById('feels-like').textContent = feelsLike;
  document.getElementById('humidity').textContent = humidity;
  document.getElementById('wind').textContent = windSpeed;
  document.getElementById('wind-gust').textContent = windGust;
}

// Event Listener für den Button
document.getElementById('get-weather-btn').addEventListener('click', () => {
  const selectElement = document.getElementById('city-select');
  const selectedCity = selectElement.value;
  
  if (selectedCity === '') return;

  showWeather(selectedCity);
});
