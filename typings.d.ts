type comment = {
    created_at: string
    id: number
    post_id: number
    text: string
    username: string
    post: Post
}

type Vote = {
    created_at: string
    id: number
    post_id: number
    upvote: boolean
    username: string
    post: Post
}

type Subrs = {
    created_at: string
    id: number
    topic: string
    post_id: number
    postList: Post[]
}

type Post = {
    subrs: any
    body: string
    created_at: string
    id: number
    image: string
    subrs_id: number
    title: string
    username: string
    voteList: Vote[]
    commentList: Comment[]
    subrsList: subrs[]
}





