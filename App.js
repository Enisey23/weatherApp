import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import Loading from './Loading';
import Weather from './Weather';
import axios from 'axios';

const API_KEY = 'c45fdeaf1e1bc056e834b296def69e2d';

export default class extends React.Component {

  state = {
    isLoading: true
  }

  getWeather = async (latitude, longitude) => {
    const {data: {main: {temp, humidity}, weather, wind: {speed}, name}} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=ru&units=metric`);
    this.setState({
        isLoading: false,
        temp: temp,
        humidity: humidity,
        condition: weather[0].main,
        speed: speed,
        name: name,
      });
  }

  getLocation = async () => {
    try {
      const response = await Location.requestForegroundPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert('Не могу определить местоположение', 'Возможно перезагрузка приложения поможет.');
      console.log(error)
    }
  }


  componentDidMount() {
    this.getLocation();
  }

  render () {
    const {isLoading, temp, condition, name, humidity, speed} = this.state;
    return (
      isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} name={name} humidity={humidity} speed={speed}/>
    );
  }
}