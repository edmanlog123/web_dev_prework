import {gql }from "@apollo/client";

export const CREATE_CREATOR = gql`
    mutation createCreator($input: CreatorInput!){
      createCreator(input:$input){
        _id
        name
      bio
      image
      links {
        type
        url
      }
      }
    }`;

export const DELETE_CREATOR = gql`
	mutation DeleteCreator($creatorId: ID!) {
    deleteCreator(creatorId: $creatorId) {
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

export const UPDATE_CREATOR = gql`
	mutation UpdateCreator($creatorId: ID!, $input: UpdateCreatorInput!) {
  updateCreator(creatorId: $creatorId, input: $input) {
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