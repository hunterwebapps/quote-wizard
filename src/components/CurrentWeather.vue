<template>
  <div>
    <h2>Currently:</h2>
    <skycon
      v-if="!!currently"
      :condition="currently.icon"
      :width="12"
      :height="12"
    />
    <span v-if="!!currently">
      {{ currently.summary }}
      and
      <c-f
        :f="currently.temperature"
        :unit="unit"
        :precision="0"
      />
    </span>
    <span v-else>
      Enter an Address for Details
    </span>
  </div>
</template>

<script>
import CF from './CF.vue';

export default {
  name: 'current-weather',
  components: {
    CF,
  },
  props: {
    currently: Object,
    unit: {
      type: String,
      validator: val => ['metric', 'imperial'].includes(val),
    },
  },
};
</script>

<style scoped>

</style>
