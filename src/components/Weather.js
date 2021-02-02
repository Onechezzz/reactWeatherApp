import React from "react";

const Weather = (props) => {
  return (
    <div className="infoWeath">
      {props.cityForecast && (
        <div className="dayCard">
          <h6>{new Date(props.cityForecast.dt * 1000).getDate()} Число</h6>
          <div>
            <ul>
              <li>
                Зранку: {props.cityForecast.temp.morn} відчувається як{" "}
                {props.cityForecast.feels_like.morn}
              </li>
              <li>
                Ввечері: {props.cityForecast.temp.day} відчувається як{" "}
                {props.cityForecast.feels_like.day}
              </li>
              <li>
                Вночі: {props.cityForecast.temp.eve} відчувається як{" "}
                {props.cityForecast.feels_like.eve}
              </li>
            </ul>
            <img
              alt="current day weather icon"
              src={
                "http://openweathermap.org/img/w/" +
                props.cityForecast.weather[0].icon +
                ".png"
              }
            ></img>
            <p>Хмарність: {props.cityForecast.clouds} %.</p>
            <p>Вологість: {props.cityForecast.humidity} мм.</p>
            <p>Швидкість вітру: {props.cityForecast.wind_speed} м/с</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
