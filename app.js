window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat  = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/8a4e364662fed11edec8c15625c55c5b/${lat},${long}`;
            fetch(api)
                .then(response =>{
                    return response.json()
                })
                .then(data => {
                    console.log(data);
                    //set DOM elements from api
                    const {temperature, summary, icon} = data.currently;
                    temperatureDegree.textContent = temperature + "F";
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //formula for celcius

                    let celsius = (temperature - 32) * (5/9);
                    //set icons
                    setIcons(icon, document.querySelector('.icon'));
                    //change celcius/farenheit

                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius)
                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;

                        }
                    });
                });
        });
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color:"black"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
