export const handleNumber = (value, display, currentInput) => {
  currentInput.value += value;
  display.value = currentInput.value;
};

export const handleOperator = (value, display, currentInput, expression) => {
  if (currentInput.value !== '') {
    expression.value += ` ${currentInput.value} ${value}`;
    currentInput.value = '';
    display.value = expression.value;
  }
};

export const handleSpecialFunctions = (
  value,
  { display, currentInput, history }
) => {
  if (currentInput.value !== '' && !isNaN(parseFloat(currentInput.value))) {
    let result;
    const inputNumber = parseFloat(currentInput.value);

    switch (value) {
      case '√':
        if (inputNumber < 0) {
          display.value = 'Erreur';
          return;
        }
        result = Math.sqrt(inputNumber);
        addToHistory(`√${inputNumber} = ${result}`, history);
        break;

      case 'x²':
        result = Math.pow(inputNumber, 2);
        addToHistory(`${inputNumber}² = ${result}`, history);
        break;

      case 'xʸ': // Pour x^y, initialisez un calcul intermédiaire
        currentInput.value += '^';
        display.value = currentInput.value;
        return;

      case 'arcsin':
        if (inputNumber < -1 || inputNumber > 1) {
          display.value = 'Erreur';
          return;
        }
        result = Math.asin(inputNumber);
        addToHistory(`arcsin(${inputNumber}) = ${result}`, history);
        break;

      case 'arccos':
        if (inputNumber < -1 || inputNumber > 1) {
          display.value = 'Erreur';
          return;
        }
        result = Math.acos(inputNumber);
        addToHistory(`arccos(${inputNumber}) = ${result}`, history);
        break;

      case 'arctan':
        result = Math.atan(inputNumber);
        addToHistory(`arctan(${inputNumber}) = ${result}`, history);
        break;

      default:
        return;
    }

    currentInput.value = result.toString();
    display.value = currentInput.value;
  }
};

export const calculate = (display, currentInput, expression, history) => {
  if (currentInput.value !== '') {
    expression.value += ` ${currentInput.value}`;
  }

  let sanitizedExpression = expression.value.replace(/\^/g, '**');

  try {
    const result = eval(sanitizedExpression);
    addToHistory(`${expression.value} = ${result}`, history);
    display.value = result.toString();
    currentInput.value = result.toString();
    expression.value = '';
  } catch {
    display.value = 'Erreur';
    expression.value = '';
    currentInput.value = '';
  }
};

export const clear = (display, currentInput, expression) => {
  currentInput.value = '';
  expression.value = '';
  display.value = '';
};

export const addToHistory = (entry, history) => {
  history.value.push(entry);
};
