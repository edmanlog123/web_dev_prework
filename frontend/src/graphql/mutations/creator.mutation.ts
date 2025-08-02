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

export const DELETE_TRANSACTION = gql`
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

export const UPDATE_TRANSACTION = gql`
	mutation UpdateCreator($input: UpdateCreatorInput!) {
		updateCreator(input: $input) {
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