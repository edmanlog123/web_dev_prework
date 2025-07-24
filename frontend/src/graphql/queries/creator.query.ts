import { gql } from "@apollo/client";

export const ALL_CREATORS = gql`
    query AllCreators {
        allCreators {
            _id
            name
            category
            bio
            image
        }
    }
`;