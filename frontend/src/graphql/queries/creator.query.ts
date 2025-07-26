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