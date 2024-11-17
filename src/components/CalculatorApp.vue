<template>
  <div class="calculator">
    <CalcDisplay :display="currentDisplay" @delete-last="deleteLastCharacter" />
    <div class="buttons">
      <!-- Mode élémentaire : chiffres et opérateurs basiques -->
      <template v-if="!isScientificMode">
        <CalcButton
          label="Mode Scientifique"
          @button-click="toggleMode"
          class="toggle"
        />
        <CalcButton
          :label="currentDisplay === '0' ? 'AC' : 'C'"
          @button-click="clear"
          isClear
        />
        <CalcButton
          label="+/-"
          @button-click="handleOperator('+/-')"
          isOperator
        />
        <CalcButton label="%" @button-click="handleOperator('%')" isOperator />
        <CalcButton label="/" @button-click="handleOperator('/')" isOperator />
        <CalcButton label="7" @button-click="handleInput('7')" />
        <CalcButton label="8" @button-click="handleInput('8')" />
        <CalcButton label="9" @button-click="handleInput('9')" />
        <CalcButton label="x" @button-click="handleOperator('*')" isOperator />
        <CalcButton label="4" @button-click="handleInput('4')" />
        <CalcButton label="5" @button-click="handleInput('5')" />
        <CalcButton label="6" @button-click="handleInput('6')" />
        <CalcButton label="-" @button-click="handleOperator('-')" isOperator />
        <CalcButton label="1" @button-click="handleInput('1')" />
        <CalcButton label="2" @button-click="handleInput('2')" />
        <CalcButton label="3" @button-click="handleInput('3')" />
        <CalcButton label="+" @button-click="handleOperator('+')" isOperator />
        <CalcButton label="0" @button-click="handleInput('0')" />
        <CalcButton label="." @button-click="handleInput('.')" />
        <CalcButton label="=" @button-click="compute" isEqual />
      </template>
      <!-- Mode scientifique -->
      <template v-else>
        <CalcButton
          label="Mode Elémentaire"
          @button-click="toggleMode"
          class="toggle"
        />
        <CalcButton label="(" @button-click="handleInput('(')" isSpecial />
        <CalcButton label=")" @button-click="handleInput(')')" isSpecial />
        <CalcButton label="π" @button-click="handlePi" isSpecial />
        <CalcButton label="e" @button-click="handleE" isSpecial />
        <CalcButton
          label="sin"
          @button-click="calculateScientific('sin')"
          isSpecial
        />
        <CalcButton
          label="cos"
          @button-click="calculateScientific('cos')"
          isSpecial
        />
        <CalcButton
          label="tan"
          @button-click="calculateScientific('tan')"
          isSpecial
        />
        <CalcButton
          label="log"
          @button-click="calculateScientific('log')"
          isSpecial
        />
        <CalcButton
          label="ln"
          @button-click="calculateScientific('ln')"
          isSpecial
        />
        <CalcButton
          label="√"
          @button-click="calculateScientific('sqrt')"
          isSpecial
        />
        <CalcButton
          label="x²"
          @button-click="calculateScientific('pow')"
          isSpecial
        />
        <CalcButton
          label="e^x"
          @button-click="calculateScientific('exp')"
          isSpecial
        />
        <CalcButton label="AC" @button-click="clear" isClear />
        <CalcButton
          label="+/-"
          @button-click="handleOperator('+/-')"
          isOperator
        />
        <CalcButton label="%" @button-click="handleOperator('%')" isOperator />
        <CalcButton label="/" @button-click="handleOperator('/')" isOperator />
        <CalcButton label="7" @button-click="handleInput('7')" />
        <CalcButton label="8" @button-click="handleInput('8')" />
        <CalcButton label="9" @button-click="handleInput('9')" />
        <CalcButton label="x" @button-click="handleOperator('*')" isOperator />
        <CalcButton label="4" @button-click="handleInput('4')" />
        <CalcButton label="5" @button-click="handleInput('5')" />
        <CalcButton label="6" @button-click="handleInput('6')" />
        <CalcButton label="-" @button-click="handleOperator('-')" isOperator />
        <CalcButton label="1" @button-click="handleInput('1')" />
        <CalcButton label="2" @button-click="handleInput('2')" />
        <CalcButton label="3" @button-click="handleInput('3')" />
        <CalcButton label="+" @button-click="handleOperator('+')" isOperator />
        <CalcButton label="0" @button-click="handleInput('0')" />
        <CalcButton label="." @button-click="handleInput('.')" />
        <CalcButton label="=" @button-click="compute" isEqual />
      </template>
    </div>
  </div>
</template>

<script>
import CalcButton from './CalcButton.vue';
import CalcDisplay from './CalcDisplay.vue';

export default {
  name: 'CalculatorApp',
  components: {
    CalcButton,
    CalcDisplay,
  },
  data() {
    return {
      currentDisplay: '0',
      expression: '',
      isScientificMode: false,
      constants: {
        π: Math.PI,
        e: Math.E,
      },
    };
  },
  methods: {
    toggleMode() {
      this.isScientificMode = !this.isScientificMode;
    },
    handleInput(value) {
      if (value === '.' && this.currentDisplay.includes('.')) return;
      if (this.currentDisplay === '0' && value !== '.') {
        this.currentDisplay = value;
      } else {
        this.currentDisplay += value;
      }
      this.expression += value;
    },
    handleOperator(operator) {
      if (this.currentDisplay !== '0') {
        this.compute();
      }
      this.expression += ` ${operator} `;
    },
    clear() {
      if (this.currentDisplay !== '0') {
        this.currentDisplay = '0';
      } else {
        this.expression = '';
        this.currentDisplay = '0';
      }
    },
    deleteLastCharacter() {
      this.currentDisplay = this.currentDisplay.slice(0, -1) || '0';
    },
    compute() {
      try {
        const sanitizedExpression = this.expression
          .replace(/π/g, Math.PI)
          .replace(/e/g, Math.E);
        const result = eval(sanitizedExpression);
        this.currentDisplay = result.toString();
        this.expression = result.toString();
      } catch (error) {
        this.currentDisplay = 'Erreur';
        this.expression = '';
      }
    },
    calculateScientific(func) {
      const number = parseFloat(this.currentDisplay);
      let result;
      switch (func) {
        case 'sin':
          result = Math.sin(number);
          break;
        case 'cos':
          result = Math.cos(number);
          break;
        case 'tan':
          result = Math.tan(number);
          break;
        case 'log':
          result = Math.log10(number);
          break;
        case 'ln':
          result = Math.log(number);
          break;
        case 'sqrt':
          result = Math.sqrt(number);
          break;
        case 'pow':
          result = Math.pow(number, 2);
          break;
        case 'exp':
          result = Math.exp(number);
          break;
        default:
          return;
      }
      this.currentDisplay = result.toString();
      this.expression = result.toString();
    },
    handlePi() {
      this.expression += Math.PI;
      this.currentDisplay += 'π';
    },
    handleE() {
      this.expression += Math.E;
      this.currentDisplay += 'e';
    },
  },
};
</script>

<style scoped>
.calculator {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}
.calculator:hover {
  transform: scale(1.02);
}
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
}
.toggle {
  grid-column: span 4;
  background-color: #555;
  color: #fff;
  font-weight: bold;
}
</style>
