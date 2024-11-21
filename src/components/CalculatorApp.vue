<template>
  <div class="calculator" ref="calculator" tabindex="0" @click="retainFocus">
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
      currentDisplay: '',
      expression: '',
      isScientificMode: false,
      history: [],
      constants: {
        π: Math.PI,
        e: Math.E,
      },
    };
  },
  methods: {
    handleInput(value) {
      // Si la dernière entrée est une constante et que l'on tape un chiffre
      if (/[eπ]$/.test(this.currentDisplay) && /[0-9]$/.test(value)) {
        this.currentDisplay += ' x ' + value;
        this.expression += ' x ' + value;
        return;
      }

      // Si la dernière entrée est un nombre et que l'on tape une constante
      if (/[0-9]$/.test(this.currentDisplay) && /[eπ]$/.test(value)) {
        this.currentDisplay += ' x ' + value;
        this.expression += ' x ' + this.constants[value];
        return;
      }

      // Si la dernière entrée est une parenthèse fermante et qu'on tape un chiffre
      if (/\)$/.test(this.currentDisplay) && /[0-9]$/.test(value)) {
        this.currentDisplay += ' x ' + value;
        this.expression += ' x ' + value;
        return;
      }

      // Si l'entrée est une parenthèse ouvrante '('
      if (value === '(') {
        this.currentDisplay += value;
        this.expression += value;
        return;
      }

      // Si l'entrée est une parenthèse fermante ')'
      if (value === ')') {
        this.currentDisplay += value;
        this.expression += value;
        return;
      }

      this.currentDisplay += value;
      this.expression += value;
    },

    handleConstant(constant) {
      if (/[eπ]$/.test(this.currentDisplay)) {
        this.currentDisplay += ' x ' + constant;
        this.expression += ' x ' + this.constants[constant];
        return;
      }

      if (this.currentDisplay && /[0-9)]$/.test(this.currentDisplay)) {
        this.currentDisplay += ' x ';
        this.expression += ' x ';
      }
      this.currentDisplay += constant;
      this.expression += this.constants[constant];
    },

    handleOperator(operator) {
      if (operator)
        if (!this.currentDisplay.trim()) {
          return;
        }
      if (operator === '+/-') {
        const match = this.currentDisplay.match(
          /([+-]?\d*\.?\d+)(?!.*[+\-x*/^%])/
        );

        if (match) {
          const lastNumber = match[0];

          const toggledNumber = lastNumber.startsWith('-')
            ? lastNumber.slice(1)
            : `-${lastNumber}`;

          this.currentDisplay =
            this.currentDisplay.slice(0, -lastNumber.length) + toggledNumber;
          console.log('Nouvel affichage:', this.currentDisplay);

          this.expression = this.currentDisplay;
        }

        return;
      }

      // Si l'avant dernière entrée est un opérateur et qu'on entre un autre opérateur
      if (
        /[+\-x*/^%]\s?$/.test(this.currentDisplay.trimEnd()) &&
        /[+\-x*/^%]/.test(operator)
      ) {
        this.currentDisplay =
          this.currentDisplay.slice(0, -3).trimEnd() + ' ' + operator + ' ';
        this.expression =
          this.expression.slice(0, -3).trimEnd() + ' ' + operator + ' ';
        return;
      }

      if (operator === '*') {
        operator = 'x';
      }
      this.currentDisplay += operator;
      this.expression += operator;
    },

    calculateScientific(func) {
      if (this.currentDisplay === '' || this.currentDisplay.endsWith('(')) {
        this.currentDisplay += `${func}( `;
        this.expression += `${func}( `;
      } else {
        let angle = parseFloat(this.currentDisplay);
        if (!isNaN(angle)) {
          let result;
          switch (func) {
            case 'sin':
              result = Math.sin((angle * Math.PI) / 180);
              break;
            case 'cos':
              result = Math.cos((angle * Math.PI) / 180);
              break;
            case 'tan':
              result = Math.tan((angle * Math.PI) / 180);
              break;
            case 'arcsin':
            case 'asin':
              result = (Math.asin(angle) * 180) / Math.PI;
              break;
            case 'arccos':
            case 'acos':
              result = (Math.acos(angle) * 180) / Math.PI;
              break;
            case 'arctan':
            case 'atan':
              result = (Math.atan(angle) * 180) / Math.PI;
              break;
            case 'log':
              result = Math.log10(angle);
              break;
            case 'ln':
              result = Math.log(angle);
              break;
            case 'sqrt':
              result = Math.sqrt(angle);
              break;
            case 'pow':
              result = Math.pow(angle, 2);
              break;
            case 'exp':
              result = Math.exp(angle);
              break;
            default:
              result = NaN;
          }
          this.currentDisplay = result.toString();
          this.expression = result.toString();
        }
      }
    },

    deleteLastCharacter() {
      this.currentDisplay = this.currentDisplay.slice(0, -1);
      this.expression = this.expression.slice(0, -1);
    },

    clear() {
      this.currentDisplay = '';
      this.expression = '';
    },

    compute() {
      try {
        let sanitizedExpression = this.expression
          .replace(/x/g, '*')
          .replace(/π/g, Math.PI)
          .replace(/e/g, Math.E);

        // Gère les fonctions trigonométriques en degrés
        sanitizedExpression = sanitizedExpression.replace(
          /(sin|cos|tan)\(([^)]+)\)/g,
          (match, func, angle) => `Math.${func}(((${angle})) * Math.PI / 180)`
        );

        // Gère les fonctions trigonométriques inverses
        sanitizedExpression = sanitizedExpression.replace(
          /(arcsin|arccos|arctan)\(([^)]+)\)/g,
          (match, func, value) => {
            const mathFunc = func.replace('arc', 'a'); // arcsin -> asin
            return `(Math.${mathFunc}(${value}) * 180 / Math.PI)`;
          }
        );

        // Gère les autres fonctions scientifiques
        sanitizedExpression = sanitizedExpression.replace(
          /(sqrt|log|ln|pow|exp)\(([^)]+)\)/g,
          (match, func, value) => {
            if (func === 'ln') {
              func = 'log'; // ln devient log naturel (base e)
            } else if (func === 'log') {
              // Logarithme base 10
              return `(Math.log(${value}) / Math.log(10))`;
            } else if (func === 'pow') {
              // Si pow( x ) = x^2
              return `Math.pow(${value}, 2)`;
            } else if (func === 'exp') {
              // Exponentielle exp(x) => Math.exp(x)
              return `Math.exp(${value})`;
            }
            return `Math.${func}(${value})`;
          }
        );

        // Évalue l'expression calculée
        const result = Number(eval(sanitizedExpression).toFixed(8)); // Précision à 10 décimales

        // Met à jour l'affichage et l'expression
        this.currentDisplay = result.toString();
        this.expression = result.toString();
        this.history.push(`${this.expression} = ${result}`);
      } catch (error) {
        console.error('Erreur de calcul:', error);
        this.currentDisplay = 'Erreur';
        this.expression = '';
      }
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
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}
.calculator:hover {
  transform: scale(1.1);
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
}
</style>
