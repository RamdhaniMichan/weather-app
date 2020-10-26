window.addEventListener('load', ()=> {
    let long 
    let lat 

    let temperatureDescription = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector(".location-timezone")
    let iconLogo = document.querySelector(".icon")
    let temperatureSection = document.querySelector(".temperature")
    let temperatureSpan = document.querySelector(".temperature span")

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1a338d294db5640f3d5e634fa35199dc`

            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const {main, icon} = data.weather[0]
                    const {temp} = data.main
                    const {country} = data.sys
                    const urlImage = ` http://openweathermap.org/img/wn/${icon}@2x.png`

                    temperatureDescription.textContent = main
                    temperatureDegree.textContent = Math.floor(kelvinToFahrenheit(temp))
                    locationTimezone.textContent = `${country} / ${data.name}`
                    iconLogo.innerHTML = `<img = src="${urlImage}">`
                
                    
                    temperatureSection.addEventListener("click", ()=> {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C"
                            temperatureDegree.textContent = Math.floor(kelvinToCelcius(temp))
                        } else {
                            temperatureSpan.textContent = "F"
                            temperatureDegree.textContent = Math.floor(kelvinToFahrenheit(temp))
                        }
                    })
                    function kelvinToFahrenheit(valueTemp){
                        return valueTemp - 273
                    }

                    function kelvinToCelcius(valueTemp){
                        return (valueTemp - 273) * 9/5 + 32
                    }
                })
        })
    }
})