<template>
  <div class="input-container">
    <input type="text" :value="display" readonly />
    <button class="delete-button" @click="$emit('delete-last')">⌫</button>
  </div>
</template>


<script>
export default {
  name: 'CalcDisplay',
  props: {
    display: String,
  },
};
</script>

<style scoped>
.input-container {
  position: relative;
  width: 100%;
  max-width: 350px;
}

input {
  width: 100%;
  height: 50px;
  font-size: 1.8em;
  text-align: right;
  padding: 10px 50px 10px 10px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-sizing: border-box;
}

.delete-button {
  position: absolute;
  right: 5px;
  top: 12%;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #333;
}

.delete-button:hover {
  color: red;
}
</style>
