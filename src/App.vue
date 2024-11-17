<template>
  <div id="app">
    <CalculatorApp />
  </div>
</template>

<script>
import CalculatorApp from './components/CalculatorApp.vue';

export default {
  name: 'App',
  components: { CalculatorApp },
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97vh;
  width: 100%;
  box-sizing: border-box;
}
</style>
