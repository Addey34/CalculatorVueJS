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
import { evaluate } from 'mathjs';
import CalcButton from './CalcButton.vue';
import CalcDisplay from './CalcDisplay.vue';
// import CalcHistory from './CalcHistory.vue';

export default {
  name: 'CalculatorApp',
  components: {
    CalcButton,
    CalcDisplay,
    // CalcHistory,
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
    toggleMode() {
      this.isScientificMode = !this.isScientificMode;
    },
    handleInput(value) {
      // Met à jour l'affichage et l'expression avec la valeur entrée
      this.currentDisplay += value;
      this.expression += value;
    },
    handleOperator(operator) {
      // Empêche les opérateurs successifs ou mal placés
      if (this.currentDisplay === '' && operator !== '-') return;
      this.currentDisplay += operator;
      this.expression += operator;
    },
    deleteLastCharacter() {
      // Supprime le dernier caractère
      this.currentDisplay = this.currentDisplay.slice(0, -1);
      this.expression = this.expression.slice(0, -1);
    },
    clear() {
      // Réinitialise l'affichage et l'expression
      this.currentDisplay = '';
      this.expression = '';
    },
    compute() {
      try {
        const result = evaluate(this.expression);
        this.history.push(`${this.expression} = ${result}`);
        this.currentDisplay = result.toString();
        this.expression = result.toString();
      } catch {
        this.currentDisplay = 'Erreur';
      }
    },
    handleKeyPress(event) {
      const key = event.key;

      // Empêche l'interaction si le focus n'est pas sur la calculatrice
      if (this.$refs.calculator !== document.activeElement) return;

      // Gestion des chiffres
      if (!isNaN(parseInt(key))) {
        this.handleInput(key);
      }

      // Gestion des opérateurs
      if (['+', '-', '*', '/', '%'].includes(key)) {
        this.handleOperator(key);
      }

      // Touche "Enter" pour calculer
      if (key === 'Enter') {
        this.compute();
      }

      // Touche "Backspace" pour supprimer
      if (key === 'Backspace') {
        this.deleteLastCharacter();
      }

      // Touche "Escape" pour tout effacer
      if (key === 'Escape') {
        this.clear();
      }

      // Touche "." pour ajouter un point
      if (key === '.') {
        this.handleInput('.');
      }
    },
  },
  mounted() {
    // Focus sur la calculatrice à l'initialisation pour capter les touches
    this.$refs.calculator.focus();
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
