<template>
  <span v-if="unit === 'metric'">{{ metricTemp }}&deg;C</span>
  <span v-else>{{ imperialTemp }}&deg;F</span>
</template>

<script>
export default {
  name: 'c-f',
  props: {
    c: Number,
    f: Number,
    unit: {
      type: String,
      validator: val => ['metric', 'imperial'].includes(val),
    },
    precision: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    metricTemp() {
      const c = this.c || (this.f - 32) * (5 / 9);
      return c.toFixed(this.precision);
    },
    imperialTemp() {
      const f = this.f || this.c * (9 / 5) + 32;
      return f.toFixed(this.precision);
    },
  },
};
</script>

<style scoped>

</style>
