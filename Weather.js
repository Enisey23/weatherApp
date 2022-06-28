import React, { useState  } from 'react'
import propTypes from "prop-types";
import { StyleSheet, Text, View, StatusBar, Dimensions, ImageBackground, TextInput, TouchableOpacity, Alert} from 'react-native';
import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from "expo-linear-gradient";
import { night, rainy, cloudy, sunny, snow, tornado} from './assets/index';
import { EvilIcons } from '@expo/vector-icons'; 
import axios from 'axios';


const API_KEY = 'c45fdeaf1e1bc056e834b296def69e2d';

const weatherOptions = {
    Tunderstorm: {
        iconName: 'weather-lightning',
        gradient: ['#141E30','#243B55'],
        title: 'На улице гроза!',
        rainchance: 100,
        subtitle: 'Оставайтесь дома!',
    },
    Drizzle: {
        iconName: 'weather-rainy',
        gradient: ['#3a7bd5','#3a6073'],
        title: 'На улице мелкий дождь!',
        rainchance: 100,
        subtitle: 'Возможно дождь усилится!',
    },
    Rain: {
        iconName: 'weather-pouring',
        gradient: ['#000046','#1CB5E0'],
        background: rainy,
        rainchance: 100,
        title: 'На улице дождь!',
        subtitle: 'Возьмите зонтик!',
    },
    Snow: {
        iconName: 'snowflake',
        gradient: ['#83a4d4','#b6fbff'],
        background: snow,
        rainchance: 24,
        title: 'На улице снег!',
        subtitle: 'Одевайтесь потеплее!',
    },
    Dust: {
        iconName: 'weather-windy-variant',
        gradient: ['#B79891','#94816B'],
        title: 'Пыльно',
        subtitle: 'Лучше закройте окна',
    },
    Smoke: {
        iconName: 'weather-windy',
        gradient: ['#56CCF2','#2F80ED'],
        title: 'На улице смог :(',
        subtitle: 'Не стоит выходить без необходимости',
    },
    Haze: {
        iconName: 'weather-hazy',
        gradient: ['#3E5151','#DECBA4'],
        title: 'На улице туманно!',
        subtitle: 'Осторожно!',
    },
    Mist: {
        iconName: 'weather-fog',
        gradient: ['#606c88','#3f4c6b'],
        title: 'На улице туман!',
        subtitle: 'Осторожно!',
    },
    Clear: {
        iconName: 'weather-sunny',
        gradient: sunny,
        background: sunny,
        rainchance: 17,
        title: 'На улице ясно!',
        subtitle: 'Хорошее время для прогулки!',
    },
    Clouds: {
        iconName: 'weather-cloudy',
        gradient: ['#757F9A','#D7DDE8'],
        background: cloudy,
        rainchance: 42,
        title: 'На улице облачно!',
    },
    Sand: {
        iconName: 'weather-cloudy',
        gradient: ['#757F9A','#D7DDE8'],
        title: 'На улице пыльно!',
        subtitle: 'Осторожно!',
    },
    Ash: {
        iconName: 'weather-cloudy',
        gradient: ['#757F9A','#D7DDE8'],
    },
    Squall: {
        iconName: 'weather-cloudy',
        gradient: ['#757F9A','#D7DDE8'],
    },
    Tornado: {
        iconName: 'weather-cloudy',
        gradient: ['#757F9A','#D7DDE8'],
        title: 'На улице торнадо!',
        background: tornado,
        subtitle: 'Ищите укрытие!',
    },
}

async function fetchWeatherData(cityName) {
    const {data: {main: {temp}, weather, wind: {speed}, name}} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}lang=ru&units=metric`);
    this.setState({
        isLoading: false,
        temp: temp,
        humidity: humidity,
        condition: weather[0].main,
        speed: speed,
        name: name,
      });
  }

export default function Weather({temp, name, condition,  speed, humidity}) {
    console.log(name)
    const [cityName, setCityName] = useState('');

    if ((condition === 'Clear') || (condition === 'Rain') || (condition === 'Clouds') || (condition === 'Snow')) {
        return (
            <ImageBackground 
            source={weatherOptions[condition].background}
            style={styles.backgroundImg}
            resizeMode='cover'>
                <View style={styles.appHeader}>
                    <TouchableOpacity onPress={() => { 
                      try {
                          throw e
                        } catch (error) {
                          Alert.alert('Не могу выполнить поиск', 'Возможно указано неверное название города.');
                          console.log(error)
                        }
                      }
                    }>
                        <MaterialIcons name="search" size={28} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Feather name="menu" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                 {/* <View style={styles.searchBar}>
                 <TextInput 
                placeholder='Введите название города'
                value={cityName}
                onChangeText={(text) => setCityName(text)} />
                    <EvilIcons name="search" size={28} color="black"  onPress={() => fetchWeatherData(cityName)}/>
                </View> */}
                <StatusBar barStyle="light-content"/>
                <View style={styles.halfContainer}> 
                    <MaterialCommunityIcons name={weatherOptions[condition].iconName} size={96} color='black'/>
                    <Text style={styles.temp}> {temp}°</Text>
                    <Text style={styles.name}> {name} </Text>
                </View>
                <View style={{...styles.halfContainer, ...styles.textContainer}}>
                    <Text style={styles.title}>{weatherOptions[condition].title}</Text>
                    <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
                </View>
                <View
                    style={{
                      borderBottomColor: 'rgba(255,255,255,0.7)',
                      marginTop: 20,
                      borderBottomWidth: 1,
                    }}
                  />
                  <View style={styles.bottomInfoWrapper}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Скорость ветра</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {speed}
                      </Text>
                      <Text style={styles.infoText}>Км/ч</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: speed / 2,
                            height: 5,
                            backgroundColor: '#69F0AE',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Вероятность дождя</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {weatherOptions[condition].rainchance}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: weatherOptions[condition].rainchance / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Влажность</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {humidity}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: humidity / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
    else {
        return (
            <LinearGradient
            colors={weatherOptions[condition].gradient}
            style={styles.container}>
                <View style={styles.searchBar}>
                 <TextInput 
                placeholder='Введите название города'
                value={cityName}
                onChangeText={(text) => setCityName(text)} />
                    <EvilIcons name="search" size={28} color="black"  onPress={() => fetchWeatherData(cityName)}/>
                </View>
                <StatusBar barStyle="light-content"/>
                <View style={styles.halfContainer}> 
                    <MaterialCommunityIcons name={weatherOptions[condition].iconName} size={96} color='black'/>
                    <Text style={styles.temp}> {temp}°</Text>
                    <Text style={styles.name}> {name} </Text>
                </View>
                <View style={{...styles.halfContainer, ...styles.textContainer}}>
                    <Text style={styles.title}>{weatherOptions[condition].title}</Text>
                    <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
            </View>
            <View
                    style={{
                      borderBottomColor: 'rgba(255,255,255,0.7)',
                      marginTop: 20,
                      borderBottomWidth: 1,
                    }}
                  />
                  <View style={styles.bottomInfoWrapper}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Скорость ветра</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {speed}
                      </Text>
                      <Text style={styles.infoText}>Км/ч</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: speed / 2,
                            height: 5,
                            backgroundColor: '#69F0AE',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Вероятность дождя</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {weatherOptions[condition].rainchance}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: weatherOptions[condition].rainchance / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Влажность</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {humidity}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: humidity / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                  </View>
            </LinearGradient>
        );
    }
}

Weather.propTypes = {
    temp: propTypes.number.isRequired,
    condition: propTypes.oneOf(['Thunderstorm', 'Drizzle', 'Rain', 'Snow', 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Squall', 'Tornado', 'Clear', 'Clouds']).isRequired
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    halfContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    temp: {
        fontSize: 42,
        color: 'black',
    },
    title: {
        color: 'black',
        fontSize: 44,
        fontWeight: '500',
        marginBottom: 10,
        textAlign: 'left'
    },
    subtitle: {
        color: 'black',
        fontWeight: '400',
        fontSize: 30,
    },
    textContainer: {
        paddingHorizontal: 40,
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    name: {
        color: 'black',
        fontWeight: '400',
        fontSize: 28,
        marginTop: 20,
    },
    searchBar: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderColor: 'white'
    },
    appHeader: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 20
    },
    bottomInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    infoText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '700',
      },
      infoBar: {
        width: 45,
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
})