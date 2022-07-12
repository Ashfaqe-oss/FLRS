import { gql } from "@apollo/client";


export const GET_SUBRS_BY_LIMIT = gql`
query MyQuery($limit: Int!) {
    getSubrsListByLimit(limit: $limit) {
    created_at
    id
    topic
}
}
`

export const GET_ALL_VOTES_BY_POST_ID = gql`
query MyQuery($post_id: ID!){
    getVotesUsingPost_id(post_id: $post_id) {
    created_at
    id
    post_id
    upvote
    username
    }
}
`

// export const GET_ALL_COMMENTS_BY_POST_ID = gql`
// query MyQuery($post_id: ID!){
//     getCommentsUsingPost_id(post_id: $post_id) {
//     created_at
//     id
//     post_id
//     text
//     username
//     }
// }
// `


export const GET_POST_BY_POST_ID = gql`
query MyQuery($id: ID!){
    getPost(id: $id) {
        body
        created_at
        id
        image
        title
        username
        subrs_id
        commentList {
            created_at
            id
            post_id
            text
            username
        }
        subrs {
            created_at
            id
            topic
        }
        voteList {
            created_at
            id
            post_id
            upvote
            username
        }
    }
}
`

export const GET_ALL_POSTS = gql`
query MyQuery{
    getPostList {
        body
        created_at
        id
        image
        title
        username
        subrs_id
        commentList {
            created_at
            id
            post_id
            text
            username
        }
        subrs {
            created_at
            id
            topic
        }
        voteList {
            created_at
            id
            post_id
            upvote
            username
        }
    }
}
`

export const GET_ALL_POSTS_BY_SUBRS = gql`
query MyQuery($topic: String!){
    getPostUsingSubrs_Topic(topic: $topic) {
        body
        created_at
        id
        image
        title
        username
        subrs_id
        commentList {
            created_at
            id
            post_id
            text
            username
        }
        subrs {
            created_at
            id
            topic
        }
        voteList {
            created_at
            id
            post_id
            upvote
            username
        }
    }
}
`


export const GET_SUBRS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubrsListByTopic(topic: $topic) {
        id
        topic
        created_at
    }
  }
`
