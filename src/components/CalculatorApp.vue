<template>
  <div class="calculator" ref="calculator" tabindex="0" @click="retainFocus">
    >
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
        <CalcButton label="%" @button-click="handleOperator('%')" isOperator />
        <CalcButton label="/" @button-click="handleOperator('/')" isOperator />
        <CalcButton label="7" @button-click="handleInput('7')" />
        <CalcButton label="8" @button-click="handleInput('8')" />
        <CalcButton label="9" @button-click="handleInput('9')" />
        <CalcButton label="x" @button-click="handleOperator('x')" isOperator />
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
        <CalcButton label="xʸ" @button-click="startExponentiation" isSpecial />
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
        <CalcButton label="%" @button-click="handleOperator('%')" isOperator />
        <CalcButton label="/" @button-click="handleOperator('/')" isOperator />
        <CalcButton label="7" @button-click="handleInput('7')" />
        <CalcButton label="8" @button-click="handleInput('8')" />
        <CalcButton label="9" @button-click="handleInput('9')" />
        <CalcButton label="x" @button-click="handleOperator('x')" isOperator />
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
import { evaluate } from 'mathjs';
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
        this.currentDisplay += 'x' + value;
        this.expression += 'x' + value;
        return;
      }

      // Si la dernière entrée est un nombre et que l'on tape une constante, ajoute 'x' entre le nombre et la constante
      if (/[0-9]$/.test(this.currentDisplay) && /[eπ]$/.test(value)) {
        this.currentDisplay += 'x' + value;
        this.expression += 'x' + this.constants[value]; // Remplace par la valeur de la constante
        return;
      }

      // Si la dernière entrée est une parenthèse fermante et qu'on tape un chiffre, on ajoute 'x' entre ) et le chiffre
      if (/\)$/.test(this.currentDisplay) && /[0-9]$/.test(value)) {
        this.currentDisplay += 'x' + value;
        this.expression += 'x' + value;
        return;
      }

      // Si la dernière entrée est un opérateur, et qu'on entre un autre opérateur, remplace par le dernier entrée
      if (/[+\-x/^%]$/.test(this.currentDisplay) && /[+\-x/^%]/.test(value)) {
        this.currentDisplay = this.currentDisplay.slice(0, -1) + value;
        this.expression = this.expression.slice(0, -1) + value;
        return;
      }

      // Si l'entrée est une parenthèse ouvrante '(', on l'ajoute sans conditions
      if (value === '(') {
        this.currentDisplay += value;
        this.expression += value;
        return;
      }

      // Si l'entrée est une parenthèse fermante ')', on l'ajoute sans conditions
      if (value === ')') {
        this.currentDisplay += value;
        this.expression += value;
        return;
      }

      // Sinon, on ajoute la valeur à l'affichage et à l'expression
      this.currentDisplay += value;
      this.expression += value;
    },

    handleConstant(constant) {
      if (/[eπ]$/.test(this.currentDisplay)) {
        this.currentDisplay += 'x' + constant;
        this.expression += '*' + this.constants[constant];
        return;
      }

      if (this.currentDisplay && /[0-9)]$/.test(this.currentDisplay)) {
        this.currentDisplay += 'x';
        this.expression += '*';
      }
      this.currentDisplay += constant;
      this.expression += this.constants[constant];
    },

    handleOperator(operator) {
      if (operator === '+/-' && this.currentDisplay) {
        if (!isNaN(parseFloat(this.currentDisplay))) {
          this.currentDisplay = (
            parseFloat(this.currentDisplay) * -1
          ).toString();
          this.expression = this.currentDisplay;
        }
        return;
      }

      if (operator === '*') {
        operator = 'x';
      }
      this.currentDisplay += operator;
      this.expression += operator;
    },

    startExponentiation() {
      this.currentDisplay += '^';
      this.expression += '^';
    },

    calculateScientific(func) {
      if (this.currentDisplay === '' || this.currentDisplay.endsWith('(')) {
        // Si l'affichage est vide ou se termine par une parenthèse ouverte,
        // on ajoute simplement la fonction avec une parenthèse ouverte
        this.currentDisplay += `${func}(`;
        this.expression += `${func}(`;
      } else {
        // Sinon, on calcule le résultat
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

        // Convertir les angles en radians pour les fonctions trigonométriques
        sanitizedExpression = sanitizedExpression.replace(
          /(sin|cos|tan)\(([^)]+)\)/g,
          (match, func, angle) => `${func}((${angle}) * Math.PI / 180)`
        );

        // Gérer les fonctions trigonométriques inverses
        sanitizedExpression = sanitizedExpression.replace(
          /(arcsin|arccos|arctan)\(([^)]+)\)/g,
          (match, func, value) => {
            const mathFunc = func.replace('arc', 'a');
            return `(Math.${mathFunc}(${value}) * 180 / Math.PI)`;
          }
        );

        let result = evaluate(sanitizedExpression);

        // Arrondir le résultat à un nombre raisonnable de décimales
        result = Number(result.toFixed(10));

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
      if (/[0-9+\-x/^%.()]/.test(key)) {
        this.handleInput(key);
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
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}
.calculator:hover {
  transform: scale(1.15);
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
