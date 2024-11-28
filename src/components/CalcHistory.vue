<template>
  <div v-if="history.length" class="history">
    <ul class="history-list">
      <li v-for="(entry, index) in history" :key="index" class="history-item">
        {{ entry }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CalcHistory',
  props: {
    history: Array,
    showHistory: Boolean,
  },
};
</script>

<style scoped>
.history {
  display: block;
  width: 100%;
  max-width: 450px;
  max-height: 80px;
  overflow-y: auto;
  padding-right: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-bottom: 10px;
}

.history-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.history-item {
  text-align: left;
  margin: 5px 10px;
  color: white;
  font-size: 1em;
}

.history::-webkit-scrollbar {
  width: 8px;
}

.history::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
}

.history::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

.history::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

@media (max-width: 400px) {
  .history {
    width: 100%;
    max-width: 320px;
  }
}
</style>
