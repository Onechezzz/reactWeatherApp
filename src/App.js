import React from "react";
import Info from "./components/info";
import Weather from "./components/Weather";
import { API_GEO_URL, API_WEATHER_URL } from "./utilities/api";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cityForecast: [],
      error: undefined,
      position: undefined,
    };
  }

  componentDidMount() {
    const sucessfulLookup = (position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `${API_GEO_URL}?q=${latitude}+${longitude}&key=${process.env.REACT_APP_API_GEO_KEY}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({
            position: position.coords,
          });

          // console.log("geometry", this.state.position.geometry)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const errorLookup = (error) => {
      console.log("label", error);
      this.setState(
        {
          error:
            "Для корректного виконання програми треба дозволити визначити геолокацію! Обновіть сторінку і дозвольте відстеження",
        },
        () => {
          console.log("this.state.error", this.state.error);
        }
      );
    };
    navigator.geolocation.getCurrentPosition(sucessfulLookup, errorLookup);
  }
  componentDidUpdate(position, cityForecast) {
    if (this.state.position !== position.position) {
      const { latitude, longitude } = this.state.position;
      const part = "alerts,hourly,minutely";
      fetch(
        `${API_WEATHER_URL}?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          if (this.state.cityForecast === cityForecast.cityForecast) {
            let temp = [];
            for (let i = 0; i < data.daily.length; i += 1) {
              temp.push(data.daily[i]);
            }
            this.setState({
              cityForecast: temp,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            error: "Не вдалося завантажити інформацію з сервера!",
          });
        });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <div className="container">
                  <h3>Дані по погоді на наступні 7 днів.</h3>
                  <div className="row mt-6">
                    {this.state.position !== undefined ? (
                      this.state.cityForecast.map((value, index) => {
                        return (
                          <div className="weather-cards" key={index}>
                            <Weather
                              cityForecast={value}
                              error={this.state.error}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <p className="error">{this.state.error}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
