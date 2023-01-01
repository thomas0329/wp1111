import { gql } from '@apollo/client';

 const SIGNUP_MUTATION = gql`
   mutation SignupMutation(
     $email: String!
     $password: String!
     $name: String!
   ) {
     signup(
       email: $email
       password: $password
       name: $name
     ) {
       id
       name
       email
     }
   }
 `;

 const LOGIN_MUTATION = gql`
   mutation LoginMutation(
     $email: String!
     $password: String!
   ) {
     login(email: $email, password: $password) {
       id
       name
       email
     }
   }
 `;

 export { SIGNUP_MUTATION, LOGIN_MUTATION };