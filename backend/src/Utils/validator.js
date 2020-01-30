const MIN_LENGTH_PASSWORD = 8;
const MAX_LENGTH_PASSWORD = 25;
const MAX_LENGTH_NAME = 20;
const MIN_LENGTH_NAME = 3;
const MAX_LENGTH_PATH = 150;
const MIN_LENGTH_PATH = 7;

const email = value => {
  if (!value) {
    return "Digite um e-mail válido";
  } else if (
    value &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return "Endereço de e-mail inválido";
  }

  return null;
};
const password = value => {
  if (value.length < MIN_LENGTH_PASSWORD) {
    return `A senha deve contar no Minimo ${MIN_LENGTH_PASSWORD} caracteres`;
  }

  if (value.length >= MAX_LENGTH_PASSWORD) {
    return `A senha deve conter no Maximo ${MAX_LENGTH_PASSWORD} caracteres`;
  }

  return null;
};
const nick = value => {
  if (value.length < MIN_LENGTH_NAME) {
    return `O Nick deve conter no Minimo ${MIN_LENGTH_NAME} caracteres`;
  }

  if (value.length >= MAX_LENGTH_NAME) {
    return `O Nick deve conter no Maximo ${MAX_LENGTH_NAME} caracteres`;
  }

  return null;
};
const path = value => {
  if (value < MIN_LENGTH_PATH) {
    return `O path deve conter no Minimo ${MIN_LENGTH_PATH} caracteres`;
  }

  if (value < MAX_LENGTH_PATH) {
    return `O path deve conter no Máximo ${MAX_LENGTH_PATH} caracteres`;
  }

  return null;
};

const TYPE_VALIDATOR = {
  email,
  password,
  nick,
  path
};

const validator = (type, value) => {
  const newValue = value.trim();

  if (!newValue.length) {
    return "Campo não pode ser vazio!";
  }

  const isValid = TYPE_VALIDATOR[type];
  return isValid && isValid(value);
};

const treatArrayMessageError = errors => {
  const arr = errors
    .map(e => {
      return e !== null ? ` ${e} -` : "";
    })
    .join("");

  if (arr[arr.length - 1] === "-") {
    return arr.slice(0, arr.length - 2);
  }

  return arr;
};

export function validInputs(values) {
  let err = [];

  Object.keys(values).forEach(item => {
    err.push(validator(item, values[item]));
  });

  if (err[0] || err[1] || err[2]) {
    return treatArrayMessageError(err);
  }
}
