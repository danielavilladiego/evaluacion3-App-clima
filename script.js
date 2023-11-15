document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "d3c39f57206d5904890771c822ffaac3";
    const searchInput = document.querySelector(".search input");
    const botonBuscar = document.querySelector(".search button");
    const errorDiv = document.querySelector(".error");
    const clima = document.querySelector(".weather");

    botonBuscar.addEventListener("click", function () {
        const ciudad = searchInput.value;
        if (ciudad) {
            errorDiv.style.display = "none";
            obtenerTiempo(ciudad);
        } else {
            errorDiv.style.display = "block";
        }
    });

    function obtenerTiempo(ciudad) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${ciudad}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Respuesta de la API incorrecta");
                }
                return response.json();
            })
            .then(function (informacionDelClima) {
                actualizarClima(informacionDelClima);
            })
            .catch(function (error) {
                if (error.message === "Respuesta de la API incorrecta") {
                    mostrarError();
                } else {
                    console.error("Error al obtener los datos de la API", error);
                    errorDiv.style.display = "block";
                }
            });
    }

    function actualizarClima(informacionDelClima) {
        const climaIcon = document.querySelector(".weather-icon");
        const temperatura = document.querySelector(".temp");
        const ciudad = document.querySelector(".city");
        const humedad = document.querySelector(".humidity");
        const velocidadViento = document.querySelector(".wind");
        const climaImageUrl = imagenClima(informacionDelClima.weather[0].main);
        climaIcon.src = climaImageUrl;
        temperatura.textContent = `${informacionDelClima.main.temp}°C`;
        ciudad.textContent = informacionDelClima.name;
        humedad.textContent = `${informacionDelClima.main.humidity}%`;
        velocidadViento.textContent = `${informacionDelClima.wind.speed} km/h`;
        clima.style.display = "block";
    }

    function imagenClima(estadoClima) {
        switch (estadoClima) {
            case "Clouds":
                return "images/clouds.png";
            case "Clear":
                return "images/clear.png";
            case "Rain":
                return "images/rain.png";
            case "Drizzle":
                return "images/drizzle.png";
            case "Mist":
                return "images/mist.png";

        }
    }

    function mostrarError() {
        errorDiv.textContent = "Ciudad no encontrada. Por favor, ingrese un nombre de ciudad válido.";
        errorDiv.style.display = "block";
        clima.style.display = "none";
    }
});
