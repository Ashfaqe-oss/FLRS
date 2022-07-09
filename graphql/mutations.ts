import { gql } from "@apollo/client"

export const ADD_VOTE = gql`
mutation MyMutation(
  $post_id: ID!
  $upvote: Boolean! 
  $username: String!
) {
  insertVote(
    post_id: $post_id 
    upvote: $upvote
    username: $username
  ) {
    created_at
    id
    post_id
    upvote
    username
  }
}
`

export const ADD_COMMENT = gql`
mutation MyMutation(
  $post_id: ID!
  $text: String! 
  $username: String!
) {
  insertComment(
    post_id: $post_id 
    text: $text
    username: $username
  ) {
    created_at
    id
    post_id
    text
    username
  }
}
`

export const ADD_POST = gql`
mutation MyMutation(
  $body: String!
  $image: String!
  $subrs_id: ID!
  $title: String!
  $username: String!
) {
  insertPost(
    body: $body
    image: $image
    subrs_id: $subrs_id
    title: $title
    username: $username
  ) {
    body
    created_at
    id
    image
    subrs_id
    title
    username
  }
}
`

export const ADD_SUBRS = gql`
mutation MyMutation($topic: String!) {
  insertSubrs(topic: $topic) {
    id
    topic
    created_at
  }
}
`