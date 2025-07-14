const creatorTypeDef = `#graphql
  type Creator {
    _id: ID!
    name: String!
    userId: ID!
    category: String!
    bio: String
    image: String
  }

  type Query {
    allCreators: [Creator!]!
    creator(creatorId: ID!): Creator
  }

  input CreatorInput {
    name: String!
    category: String!
    bio: String
    image: String
  }

  input UpdateCreatorInput {
    name: String
    category: String
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
