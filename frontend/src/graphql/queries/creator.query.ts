import { gql } from "@apollo/client";

export const ALL_CREATORS = gql`
    query AllCreators {
        allCreators {
            _id
            name
            bio
            image
            links {
        type
        url
      }
        }
    }
`;

export const GET_CREATOR_SUGGESTION = gql`
  query GetCreatorSuggestion($name: String!) {
    getCreatorSuggestion(name: $name) {
      bio
      image
      links {
        type
        url
      }
    }
  }
`;