import { gql } from '@apollo/client';

export const IMAGE_QUERY = gql`
  query image($id: ID){
    image(id: $id){
      _id
    }
  }
  `;