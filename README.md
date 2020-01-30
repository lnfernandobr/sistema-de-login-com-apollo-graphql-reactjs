# Sistema de login com Apollo - GraphQl e ReactJs

O repositório contem um sistema de login com autenticação tokens jwt,
e um servidor smtp `sendgrid` de envio de emails para redefinição de senha. O repositório
contem sub-pastas backend com API e frontend com a view da aplicação. 


O frontend foi desenvolvido com `reactjs` e `apollo client` entre outros pacotes. O front Também conta com um global snackbar provider  em toda aplicação para informar o usuario com mensagens providas de erros, avisos ou sucesso.


A API foi desenvolvida em node com `ApolloServer` e `GraphQl` para realizar as `query` e `mutations`, a API conta também com pacote `sendgrid` como servidor smtp para o envio de emails de redefinição de senha.


 
**_Mais informações sobre frontend e backend são encontradas no REAMDE de cada sub-pasta._**

![Tela de login](https://github.com/lnfernandobr/sistema-de-login-com-apoll-graphql/raw/master/images/sign-in.png)
****
![Tela de Cadastro](https://github.com/lnfernandobr/sistema-de-login-com-apoll-graphql/raw/master/images/sign-up.png)
****
![Tela de Cadastro com aviso](https://github.com/lnfernandobr/sistema-de-login-com-apoll-graphql/raw/master/images/sign-up-warning.png)
