<template>
  <div class="container">
    <div id="unit">
      <span :class="{ active: unit === 'metric' }" @click="unit = 'metric'">Metric</span>&nbsp;
      <span :class="{ active: unit === 'imperial' }" @click="unit = 'imperial'">Imperial</span>
    </div>
    <h1>Weather Forecast</h1>
    <search-bar @search="handleSearch"></search-bar>
    {{ address }}
    <hr>
    <current-weather :currently="forecast.currently" :unit="unit"></current-weather>
    <daily-forecast :forecast="forecast.daily" :unit="unit"></daily-forecast>
    <loading-overlay :show="loading"></loading-overlay>
  </div>
</template>

<script>
import axios from 'axios';
import { GEOCODIO_API_KEY, DARKSKY_API_KEY } from './config';

import SearchBar from './components/SearchBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';
import DailyForecast from './components/DailyForecast.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';

export default {
  name: 'weather-app',
  components: {
    SearchBar,
    CurrentWeather,
    DailyForecast,
    LoadingOverlay,
  },
  data() {
    return {
      address: '',
      coords: {
        lat: 0,
        lng: 0,
      },
      forecast: {
        currently: null,
        daily: null,
      },
      unit: 'imperial',
      loading: false,
    };
  },
  watch: {
    async coords(newCoords, oldCoords) {
      this.loading = true;
      const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${newCoords.lat},${newCoords.lng}?exclude=minutely,hourly,alerts,flags`);
      this.forecast = res.data;
      this.loading = false;
    },
  },
  methods: {
    async handleSearch({ type, query }) {
      if (!query) return;
      this.loading = true;
      const encQuery = encodeURIComponent(query);
      const res = await axios.get(`https://api.geocod.io/v1.3/${type}?q=${encQuery}&api_key=${GEOCODIO_API_KEY}`);
      const { results } = res.data;
      this.coords = results[0].location;
      this.address = results[0].formatted_address;
      this.loading = false;
    },
    changeUnits(type) {
      this.unit = type;
    },
  },
};
</script>

<style>
h1 {
  font-size: 1.8rem !important;
  font-weight: 100;
  margin-bottom: 1rem !important;
  margin-top: 0.5rem !important;
}

hr {
  border-top: solid 2px #000 !important;
}

#unit {
  float: right;
}

#unit > span {
  cursor: pointer;
}

#unit > span.active {
  font-weight: bold;
}
</style>
