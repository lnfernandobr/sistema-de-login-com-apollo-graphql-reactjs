export const UserSchema = `
  type Query {
    getUser: User
  }
  
  type Mutation {
    createUser(user: InputUser): ResponseCreateUser!
    loginUser(email: String!, password: String!): ResponseLogin
    
    forgetPassword(email: String!, path: String!): requestStatus!
    resetPassword(token: String!, password: String!): requestStatus!
    
    logout(token: String!) : Boolean
    
  }
  
 
  
  type ResponseCreateUser {
    _id: ID
    status: requestStatus
  }
  
  type ResponseLogin {
    token: String
    status: requestStatus
  }
  
  type requestStatus {
      message: String!
      code: Int!
  }
  
  input InputUser {
    nick: String!
    email: String!
    password: String!
  }
  
  type User {
    _id: ID!
    nick: String!
    email: String!
    password: String!
  }
`;
