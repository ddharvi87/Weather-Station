function fetch_data() {
    var cityname = document.getElementById('city').value;
    console.log(cityname);
    if (cityname === "") {
        alert("Enter the city name");
        return;
    }
    var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityname + '&appid=48cd3c3a9df91c6fa46ba572d353d97c&units=metric';
    fetch(url)
    .then(response => response.json())
    .then(data => {
        var resp_code = data['cod'];
        if (resp_code === '404') {
            alert('city not found');
        } else {
            var forecastData = data['list'];
            var forecastHTML = '';
            for (var i = 0; i < forecastData.length; i += 8) { // Loop through every 8th index to get daily data
                var date = new Date(forecastData[i]['dt'] * 1000);
                var temp = forecastData[i]['main']['temp'];
                var icon = forecastData[i]['weather'][0]['icon'];
                var icon_url = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
                forecastHTML += '<div><h3>' + date.toDateString() + '</h3><p>Temperature: ' + temp + '°C</p><img src=' + icon_url + '></div>';
            }
            document.getElementById('result').innerHTML = forecastHTML;

            // Change background color based on today's temperature
            var todayTemp = forecastData[0]['main']['temp'];
            if (todayTemp < 15) {
                document.body.style.backgroundColor = 'lightblue'; // Cold
            } else if (todayTemp >= 15 && todayTemp < 25) {
                document.body.style.backgroundColor = 'lightgreen'; // Moderate
            } else {
                document.body.style.backgroundColor = 'lightcoral'; // Hot
            }
        }
    });
}
