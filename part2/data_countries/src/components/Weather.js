import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {

    const api_key = process.env.REACT_APP_API_KEY
    const capital = country.capital
    const [ weatherData, setWeatherData ] = useState({})
    useEffect(() => 
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
             .then(response => setWeatherData(response.data)), [api_key, capital])

    if (weatherData.current) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>temperature: {weatherData.current.temperature} celsius</p>
                <img alt="weather icon" src={weatherData.current.weather_icons[0]} />
                <p>wind: {weatherData.current.wind_speed} mph direction: {weatherData.current.wind_dir}</p>
            </div>
        )
    }
    return (
        <div></div>
    )
}

export default Weather