<template>
  <button :class="buttonClasses" @click="handleClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'CalcButton',
  props: {
    label: {
      type: String,
      required: true
    },
    isOperator: Boolean,
    isSpecial: Boolean,
    isEqual: Boolean,
    isClear: Boolean
  },
  computed: {
    buttonClasses() {
      return {
        operator: this.isOperator,
        special: this.isSpecial,
        equals: this.isEqual,
        clear: this.isClear
      };
    }
  },
  methods: {
    handleClick() {
      this.$emit('button-click', this.label);
    }
  }
};
</script>

<style scoped>
button {
  font-size: 1.5em;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  background-color: #555;
  text-align: center;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
}

.operator {
  background-color: #9e9e9e;
}

.special {
  background-color: #ff9800;
}

.equals {
  background-color: #f44336;
  grid-column: span 2;
}

.clear {
  background-color: #f44336;
}

button:not(.operator):not(.special):not(.equals):not(.clear):hover {
  background-color: #6d6d6d;
}

.operator:hover {
  background-color: #b0b0b0;
}

.special:hover {
  background-color: #ffb74d;
}

.equals:hover,
.clear:hover {
  background-color: #ff6659;
}

</style>
