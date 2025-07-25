import {gql }from "@apollo/client";

export const CREATE_CREATOR = gql`
    mutation createCreator($input: CreatorInput!){
      createCreator(input:$input){
        _id
        name
      category
      bio
      image
      }
    }`;