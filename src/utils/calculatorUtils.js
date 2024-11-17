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

export const handleSpecialFunctions = (value, { display, currentInput, history }) => {
  if (currentInput.value !== '' && !isNaN(parseFloat(currentInput.value))) {
    let result;
    const inputNumber = parseFloat(currentInput.value);

    if (value === '√') {
      result = Math.sqrt(inputNumber);
      addToHistory(`√${inputNumber} = ${result}`, history);
    } else if (value === 'x²') {
      result = Math.pow(inputNumber, 2);
      addToHistory(`${inputNumber}² = ${result}`, history);
    } else {
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
  try {
    const result = eval(expression.value);
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
