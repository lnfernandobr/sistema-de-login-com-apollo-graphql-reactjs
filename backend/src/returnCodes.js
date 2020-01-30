export const RETURN_CODES = {
  inputError: {
    code: 100,
    message: "Campos da solicitação invalidos!"
  },

  userNotFound: {
    code: 101,
    message: "Usuario não encontrado"
  },

  alreadyRegisteredUser: {
    code: 102,
    message: "Usuario já cadastrado!"
  },
  invalidToken: {
    code: 103,
    message: "Token invalido"
  },
  invalidEmail: {
    code: 104,
    message: "E-mail invalido"
  },

  errorUpdatePassword: {
    code: 105,
    message: "Erro na atualização da nova senha no banco de dados"
  },

  success: {
    code: 200,
    message: "ok"
  }
};
