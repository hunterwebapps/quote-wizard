<template>
  <div>
    <h2>Forecast:</h2>
    <table class="table-hover">
      <thead>
        <tr>
          <td>Summary</td>
          <td>Temp Low</td>
          <td>Temp High</td>
        </tr>
      </thead>
      <tbody v-if="!!forecast">
        <tr v-for="(day, index) in forecast.data" :key="index">
          <td><strong>{{ getDay(index) }}</strong> {{ day.summary }}</td>
          <td><c-f :f="day.temperatureLow" :unit="unit" /></td>
          <td><c-f :f="day.temperatureHigh" :unit="unit" /></td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3">Enter an Address for Details</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CF from './CF.vue';

export default {
  name: 'daily-forecast',
  props: ['forecast', 'unit'],
  components: {
    CF,
  },
  methods: {
    getDay(index) {
      const day = (new Date().getDay() + index - 1) % 7;
      const weekday = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ];
      return weekday[day];
    },
  },
};
</script>

<style scoped>
  table {
    width: 100%;
  }

  thead {
    background-color: #ccc;
  }

  td {
    border: solid 2px #000;
    padding: 0.5rem;
  }
</style>
