<template>
  <div v-if="history.length" class="history">
    <h3>History</h3>
    <ul>
      <li v-for="(entry, index) in history" :key="index">{{ entry }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CalcHistory',
  props: {
    history: Array,
  },
};
</script>

<style scoped>
.history {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  text-align: center;
  color: white;
}

.history h3 {
  font-size: 1.2em;
}
</style>
