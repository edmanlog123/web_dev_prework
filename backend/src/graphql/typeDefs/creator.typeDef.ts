const creatorTypeDef = `#graphql
  type Creator {
    _id: ID!
    name: String!
    userId: ID!
    links: [Link!]!
    bio: String
    image: String
  }

  type Query {
    allCreators: [Creator!]!
    creator(creatorId: ID!): Creator
  }

  type Link {
  type: String!
  url: String!
}

  input CreatorInput {
    name: String!
    links: [LinkInput!]
    bio: String
    image: String
  }

  input LinkInput {
  type: String!
  url: String!
  }


  input UpdateCreatorInput {
    name: String
    links: [LinkInput!]
    bio: String
    image: String
  }

  type Mutation {
    createCreator(input: CreatorInput!): Creator!
    updateCreator(creatorId: ID!, input: UpdateCreatorInput!): Creator!
    deleteCreator(creatorId: ID!): Creator!
  }
`;

export default creatorTypeDef;
