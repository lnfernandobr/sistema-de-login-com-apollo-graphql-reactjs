const MIN_LENGTH_PASSWORD = 8;
const MAX_LENGTH_PASSWORD = 25;
const MAX_LENGTH_NAME = 20;
const MIN_LENGTH_NAME = 3;
const MIN_LENGTH_DESCRIPTION = 0;
const MAX_LENGTH_DESCRIPTION = 100;

const fieldEmail = value => {
  if (!value.length) {
    return "Campo não pode ser vazio!";
  }

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
const fieldPassword = value => {
  if (!value.length) {
    return "Campo não pode ser vazio!";
  }

  if (value.length < MIN_LENGTH_PASSWORD) {
    return `Minimo ${MIN_LENGTH_PASSWORD} caracteres`;
  }

  if (value.length >= MAX_LENGTH_PASSWORD) {
    return `Maximo ${MAX_LENGTH_PASSWORD} caracteres`;
  }

  return null;
};
const fieldName = value => {
  if (!value.length) {
    return "Campo não pode ser vazio!";
  }

  if (value.length < MIN_LENGTH_NAME) {
    return `Minimo ${MIN_LENGTH_NAME} caracteres`;
  }

  if (value.length >= MAX_LENGTH_NAME) {
    return `Maximo ${MAX_LENGTH_NAME} caracteres`;
  }

  return null;
};

const fieldDescription = value => {
  if (value.length < MIN_LENGTH_DESCRIPTION) {
    return `Minimo ${MIN_LENGTH_DESCRIPTION} caracteres`;
  }

  if (value.length >= MAX_LENGTH_DESCRIPTION) {
    return `Maximo ${MAX_LENGTH_DESCRIPTION} caracteres`;
  }
};

const TYPE_VALIDATOR = {
  fieldEmail,
  fieldPassword,
  fieldName,
  fieldDescription
};

export const validator = (value, type) => {
  const validatorIsValid = TYPE_VALIDATOR[type];
  return validatorIsValid && validatorIsValid(value);
};
