export const SEND_GRID_API_KEY =
  "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";
export const FORGET_PASSWORD_SUBJECT = "Redefinição de senha";
export const FORGET_PASSWORD_SHIPPING_EMAIL = "rasenturbo@gmail.com";

export const FORGET_PASSWORD_TEMPLATE = (path, token) => {
  return `
        <div>
            <strong>Olá, se você pediu uma redefinição de senha clique <a href="${path}?tk=${token}">aqui</a>,Note que você tem apenas 5 minutos até a validade do pedido.
            Apos esse tempo um novo pedido de redefinição de senha terá de ser solicitado.</strong>

            <strong>Caso você não tenha feito esse pedido, apenas ignore esse e-mail, obrigado!</strong>
        </div>

      `;
};
