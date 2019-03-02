<template>
  <form @submit="findTerm">
    <label>Address:</label>
    <div class="search-bar-form">
      <input
        placeholder="Search"
        v-model="term"
        required
      />
      <button type="submit" class="btn btn-sm">Submit</button>
      <span class="separator" v-if="gpsExists" />
      <button
        v-if="gpsExists"
        @click="findMe"
        type="button"
        class="btn btn-sm"
      >
        Find Me
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'search-bar',
  data() {
    return {
      term: '',
      gpsExists: 'geolocation' in navigator,
      gpsApproved: false,
    };
  },
  methods: {
    findTerm(e) {
      e.preventDefault();
      this.$emit('search', {
        type: 'geocode',
        query: this.term,
      });
    },
    findMe() {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords: { latitude, longitude } } = position;
        this.$emit('search', {
          type: 'reverse',
          query: `${latitude},${longitude}`,
        });
      });
    },
  },
};
</script>

<style scoped>
form {
  margin-bottom: 0.5rem;
}

label {
  display: block;
  margin-bottom: 0;
}

input {
  border: solid 1px #000;
  padding-left: 0.3rem;
  margin-right: 1rem;
  height: 1.8rem;
  flex: 0 0 60%;
}

button {
  flex: 0 0 10%;
  border: solid 1px #000;
  border-radius: 5px;
  background-color: #E6E6E6;
  padding: 0;
  font-size: 1.1rem
}

.search-bar-form {
  display: flex;
  flex-wrap: wrap;
}

.separator {
  flex: 0 0 2%;
  font-size: 1.8rem;
  margin-top: -0.7rem;
  width: 1.2rem;
  text-align: center;
}

.separator::before {
  content: '|';
}

@media (max-width: 420px) {
  input {
    flex: 1 0 100%;
    margin-bottom: 5px;
  }

  button {
    flex: 0 1 45%;
  }
}
</style>
