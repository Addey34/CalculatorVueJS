const constants = {
  π: Math.PI,
  e: Math.E,
};

export function handleInput(value, currentDisplay, expression) {
  // Si la dernière entrée est une constante et qu'on tape un chiffre
  if (/[eπ]$/.test(currentDisplay) && /[0-9]$/.test(value)) {
    return {
      currentDisplay: `${currentDisplay} x ${value}`,
      expression: `${expression} x ${value}`,
    };
  }

  // Si la dernière entrée est un nombre et qu'on tape une constante
  if (/[0-9]$/.test(currentDisplay) && /[eπ]$/.test(value)) {
    return {
      currentDisplay: `${currentDisplay} x ${value}`,
      expression: `${expression} x ${constants[value]}`,
    };
  }

  // Si la dernière entrée est une parenthèse fermante et qu'on tape un chiffre
  if (/\)$/.test(currentDisplay) && /[0-9]$/.test(value)) {
    return {
      currentDisplay: `${currentDisplay} x ${value}`,
      expression: `${expression} x ${value}`,
    };
  }

  // Si l'entrée est une parenthèse ouvrante '('
  if (value === '(') {
    return {
      currentDisplay: `${currentDisplay}${value}`,
      expression: `${expression}${value}`,
    };
  }

  // Si l'entrée est une parenthèse fermante ')'
  if (value === ')') {
    return {
      currentDisplay: `${currentDisplay}${value}`,
      expression: `${expression}${value}`,
    };
  }

  return {
    currentDisplay: `${currentDisplay}${value}`,
    expression: `${expression}${value}`,
  };
}

export function handleConstant(constant, currentDisplay, expression) {
  if (/[eπ]$/.test(currentDisplay)) {
    return {
      currentDisplay: `${currentDisplay} x ${constant}`,
      expression: `${expression} x ${constants[constant]}`,
    };
  }

  if (currentDisplay && /[0-9)]$/.test(currentDisplay)) {
    return {
      currentDisplay: `${currentDisplay} x ${constant}`,
      expression: `${expression} x ${constants[constant]}`,
    };
  }

  return {
    currentDisplay: `${currentDisplay}${constant}`,
    expression: `${expression}${constants[constant]}`,
  };
}

export function handleOperator(operator, currentDisplay, expression) {
  if (operator && !currentDisplay.trim()) {
    return { currentDisplay, expression };
  }

  if (operator === '+/-') {
    const match = currentDisplay.match(/([+-]?\d*\.?\d+)(?!.*[+\-x*/^%])/);
    if (match) {
      const lastNumber = match[0];
      const toggledNumber = lastNumber.startsWith('-')
        ? lastNumber.slice(1)
        : `-${lastNumber}`;

      return {
        currentDisplay: `${currentDisplay.slice(
          0,
          -lastNumber.length
        )}${toggledNumber}`,
        expression: `${currentDisplay.slice(
          0,
          -lastNumber.length
        )}${toggledNumber}`,
      };
    }
    return { currentDisplay, expression };
  }

  // Si l'avant-dernière entrée est un opérateur et qu'on entre un autre opérateur
  if (
    /[+\-x*/^%]\s?$/.test(currentDisplay.trimEnd()) &&
    /[+\-x*/^%]/.test(operator)
  ) {
    return {
      currentDisplay: `${currentDisplay.slice(0, -3).trimEnd()}${operator}`,
      expression: `${expression.slice(0, -3).trimEnd()}${operator}`,
    };
  }

  if (operator === '*') {
    operator = 'x';
  }

  return {
    currentDisplay: `${currentDisplay}${operator}`,
    expression: `${expression}${operator}`,
  };
}

export function calculateScientific(func, currentDisplay, expression) {
  if (currentDisplay === '') {
    return {
      currentDisplay: `${currentDisplay}${func}( `,
      expression: `${expression}${func}( `,
    };
  }

  let angle = parseFloat(currentDisplay);
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
        result = (Math.asin(angle) * 180) / Math.PI;
        break;
      case 'arccos':
        result = (Math.acos(angle) * 180) / Math.PI;
        break;
      case 'arctan':
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
    return {
      currentDisplay: result.toString(),
      expression: result.toString(),
    };
  }

  return { currentDisplay, expression };
}

export function deleteLastCharacter(currentDisplay, expression) {
  return {
    currentDisplay: currentDisplay.slice(0, -1),
    expression: expression.slice(0, -1),
  };
}

export function clear() {
  return {
    currentDisplay: '',
    expression: '',
  };
}

export function compute(expression) {
  try {
    let sanitizedExpression = expression
      .replace(/x/g, '*')
      .replace(/π/g, Math.PI)
      .replace(/e/g, Math.E)
      .replace(/\^/g, '**')
      .replace(/%/g, '/ 100 * ');

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
    const result = Number(eval(sanitizedExpression).toFixed(8));

    return {
      currentDisplay: result.toString(),
      expression: result.toString(),
    };
  } catch (error) {
    console.error('Erreur de calcul:', error);
    return {
      currentDisplay: 'Erreur',
      expression: '',
    };
  }
}
