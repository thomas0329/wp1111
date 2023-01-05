import { gql } from '@apollo/client';

export const IMAGE_QUERY = gql`
  query image($id: ID){
    image(id: $id){
      _id
      name
      link{
        url
      }
      img{
        url
      }
    }
  }

  query user($id: ID, $name: name, $email: email){
    user(id: $id){
      id
      name
      email
    }
  }
  `;