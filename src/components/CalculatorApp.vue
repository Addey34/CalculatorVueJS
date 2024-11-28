<template>
  <div class="calculator" ref="calculator" tabindex="0" @click="retainFocus">
    <CalcHistory v-if="showHistory" :history="history" />
    <CalcDisplay
      :display="currentDisplay"
      @delete-last="deleteLastCharacter"
      @toggle-history="toggleHistory"
    />
    <div class="buttons">
      <!-- Mode élémentaire : chiffres et opérateurs basiques -->
      <template v-if="!isScientificMode">
        <CalcButton
          label="Mode Scientifique"
          @button-click="toggleMode"
          class="toggle"
        />
        <CalcButton
          :label="currentDisplay === '0' || currentDisplay === '' ? 'AC' : 'C'"
          @button-click="clear"
          isClear
        />
        <CalcButton
          label="+/-"
          @button-click="handleOperator('+/-')"
          isOperator
        />
        <CalcButton
          label="%"
          @button-click="handleOperator(' % ')"
          isOperator
        />
        <CalcButton
          label="/"
          @button-click="handleOperator(' / ')"
          isOperator
        />
        <CalcButton label="7" @button-click="handleInput('7')" />
        <CalcButton label="8" @button-click="handleInput('8')" />
        <CalcButton label="9" @button-click="handleInput('9')" />
        <CalcButton
          label="x"
          @button-click="handleOperator(' x ')"
          isOperator
        />
        <CalcButton label="4" @button-click="handleInput('4')" />
        <CalcButton label="5" @button-click="handleInput('5')" />
        <CalcButton label="6" @button-click="handleInput('6')" />
        <CalcButton
          label="-"
          @button-click="handleOperator(' - ')"
          isOperator
        />
        <CalcButton label="1" @button-click="handleInput('1')" />
        <CalcButton label="2" @button-click="handleInput('2')" />
        <CalcButton label="3" @button-click="handleInput('3')" />
        <CalcButton
          label="+"
          @button-click="handleOperator(' + ')"
          isOperator
        />
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
        <CalcButton label="(" @button-click="handleInput(' ( ')" isSpecial />
        <CalcButton label=")" @button-click="handleInput(' ) ')" isSpecial />
        <CalcButton label="π" @button-click="handleConstant('π')" isSpecial />
        <CalcButton label="e" @button-click="handleConstant('e')" isSpecial />
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
        <CalcButton
          label="xʸ"
          @button-click="handleOperator(' ^ ')"
          isSpecial
        />
        <CalcButton
          label="arcsin"
          @button-click="calculateScientific('arcsin')"
          isSpecial
        />
        <CalcButton
          label="arccos"
          @button-click="calculateScientific('arccos')"
          isSpecial
        />
        <CalcButton
          label="arctan"
          @button-click="calculateScientific('arctan')"
          isSpecial
        />
        <CalcButton
          :label="currentDisplay === '0' || currentDisplay === '' ? 'AC' : 'C'"
          @button-click="clear"
          isClear
        />
        <CalcButton
          label="+/-"
          @button-click="handleOperator('+/-')"
          isOperator
        />
        <CalcButton
          label="%"
          @button-click="handleOperator(' % ')"
          isOperator
        />
        <CalcButton
          label="/"
          @button-click="handleOperator(' / ')"
          isOperator
        />
        <CalcButton label="7" @button-click="handleInput('7')" />
        <CalcButton label="8" @button-click="handleInput('8')" />
        <CalcButton label="9" @button-click="handleInput('9')" />
        <CalcButton
          label="x"
          @button-click="handleOperator(' x ')"
          isOperator
        />
        <CalcButton label="4" @button-click="handleInput('4')" />
        <CalcButton label="5" @button-click="handleInput('5')" />
        <CalcButton label="6" @button-click="handleInput('6')" />
        <CalcButton
          label="-"
          @button-click="handleOperator(' - ')"
          isOperator
        />
        <CalcButton label="1" @button-click="handleInput('1')" />
        <CalcButton label="2" @button-click="handleInput('2')" />
        <CalcButton label="3" @button-click="handleInput('3')" />
        <CalcButton
          label="+"
          @button-click="handleOperator(' + ')"
          isOperator
        />
        <CalcButton label="0" @button-click="handleInput('0')" />
        <CalcButton label="." @button-click="handleInput('.')" />
        <CalcButton label="=" @button-click="compute" isEqual />
      </template>
    </div>
  </div>
</template>

<script>
import {
  calculateScientific,
  clear,
  compute,
  deleteLastCharacter,
  handleConstant,
  handleInput,
  handleOperator,
} from '../utils/calculatorUtils.js';
import CalcButton from './CalcButton.vue';
import CalcDisplay from './CalcDisplay.vue';
import CalcHistory from './CalcHistory.vue';
3;

export default {
  name: 'CalculatorApp',
  components: {
    CalcButton,
    CalcDisplay,
    CalcHistory,
  },
  data() {
    return {
      currentDisplay: '',
      expression: '',
      showHistory: false,
      isScientificMode: false,
      history: [],
    };
  },
  methods: {
    handleInput(value) {
      const result = handleInput(value, this.currentDisplay, this.expression);
      this.currentDisplay = result.currentDisplay;
      this.expression = result.expression;
    },
    handleConstant(constant) {
      const result = handleConstant(
        constant,
        this.currentDisplay,
        this.expression
      );
      this.currentDisplay = result.currentDisplay;
      this.expression = result.expression;
    },
    handleOperator(operator) {
      const result = handleOperator(
        operator,
        this.currentDisplay,
        this.expression
      );
      this.currentDisplay = result.currentDisplay;
      this.expression = result.expression;
    },
    calculateScientific(func) {
      const result = calculateScientific(
        func,
        this.currentDisplay,
        this.expression
      );
      if (this.currentDisplay) {
        this.history.push(
          `${func}( ${this.currentDisplay} ) = ${result.currentDisplay}`
        );
      }
      this.currentDisplay = result.currentDisplay;
      this.expression = result.expression;
    },
    deleteLastCharacter() {
      const result = deleteLastCharacter(this.currentDisplay, this.expression);
      this.currentDisplay = result.currentDisplay;
      this.expression = result.expression;
    },
    clear() {
      const result = clear();
      this.currentDisplay = result.currentDisplay;
      this.expression = result.expression;
    },
    compute() {
      const result = compute(this.expression);
      this.history.push(`${this.currentDisplay} = ${result.currentDisplay}`);
      this.currentDisplay = result.currentDisplay;
      this.expression = result.expression;
    },

    retainFocus() {
      this.$refs.calculator.focus();
    },

    handleKeyPress(event) {
      const key = event.key;
      if (/^[+\-x/^%]$/.test(key)) {
        this.handleOperator(` ${key} `);
      } else if (/[0-9.]/.test(key)) {
        this.handleInput(key);
      } else if (/[()]/.test(key)) {
        this.handleInput(` ${key} `);
      } else if (key === 'Enter') {
        this.compute();
      } else if (key === 'Backspace') {
        this.deleteLastCharacter();
      } else if (key === 'Escape') {
        this.clear();
      }
    },

    toggleMode() {
      this.isScientificMode = !this.isScientificMode;
    },

    toggleHistory() {
      this.showHistory = !this.showHistory;
    },
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeyPress);
    this.$refs.calculator.focus();
  },

  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  },
};
</script>

<style scoped>
.calculator {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 450px;
  margin: auto;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
}

.toggle {
  margin-top: 10px;
  grid-column: span 4;
  background-color: #555;
  color: #fff;
  font-weight: bold;
  font-size: 1.2em;
}

.button {
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
  grid-column: span 2; /* Prend 2 cases sur 4 */
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

@media (max-width: 600px) {
  .calculator {
    padding: 15px;
    max-width: 100%;
    box-sizing: border-box;
  }

  .buttons {
    gap: 8px;
  }

  .toggle {
    margin-top: 8px;
    font-size: 1.3em;
  }

  .button {
    font-size: 1.3em;
    padding: 12px;
  }
}

@media (max-width: 400px) {
  .buttons {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  .toggle {
    margin-top: px;
    font-size: 1.1em;
  }

  .button {
    font-size: 1.2em;
    padding: 10px;
  }
}
</style>
