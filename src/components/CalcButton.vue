<template>
  <button class="button" :class="buttonClasses" @click="handleClick">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'CalcButton',
  props: {
    label: {
      type: String,
      required: true,
    },
    isOperator: Boolean,
    isSpecial: Boolean,
    isEqual: Boolean,
    isClear: Boolean,
  },
  computed: {
    buttonClasses() {
      return {
        operator: this.isOperator,
        special: this.isSpecial,
        equals: this.isEqual,
        clear: this.isClear,
      };
    },
  },
  methods: {
    handleClick() {
      this.$emit('button-click', this.label);
    },
  },
};
</script>
