import { gql } from '@apollo/client';

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox($name1: String!, $name2: String!) {
    createChatBox(name1: $name1, name2: $name2) {
      name
      messages {
        sender
body }
 } }
`;

// export const CREATE_POST_MUTATION = gql`
//   mutation createPost(
//     $title: String!
//     $body: String!
//     $published: Boolean!
//     $authorId: ID!
//   ) {
//     createPost(
//       data: {
//         title: $title
//         body: $body
//         published: $published
//         author: $authorId
//       }
//     ) {
//       title
//       body
//       author {
//         name
//       }
//       published
//     }
//   }
// `;
