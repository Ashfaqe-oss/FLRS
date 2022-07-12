import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import {  useForm,  SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
// import Avatars from '../../components/Avatars'
// import TimeAgo from 'react-timeago'
import Post from '../../components/Post'
import { ADD_COMMENT } from '../../graphql/mutations'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'
import Comments from '../../components/Comments'

type FormData = {
    comment: string;
}
type commentList = {
  comment: string;
};

type Comment = {
  id?: number;
  username?: string;
  created_at?: string;
  text?: string;
};

function PostPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const { loading, data, error } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      id: router.query.postId, 
    },
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "getPost"],
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const notification = toast.loading("uploading new comment");

    const {
      data: { comment },
    } = await addComment({
      variables: {
        text: formData.comment,
        post_id: router.query.postId,
        username: session?.user?.name,
      },
    });

    console.log(comment);
    setValue("comment", "");

    toast.success("successfully commented", {
      id: notification,
      //to dismiss the already created loading notification
    });
  };

  const post: Post = data?.getPost;
  //console.log(post);

  // if(post) {
  //     const { data } = useQuery(GET_ALL_COMMENTS_BY_POST_ID, {
  //         variables: {
  //             post_id: router.query.postId
  //         }
  //     })

  //     console.log(data)
  //     const comment: Comment = data?.getCommentsUsingPost_id
  //     console.log(comment)
  // }

  if (router.query.postId) {
    return (
      <div className="mx-auto my-7 max-w-5xl">
        <Post post={post} />
        {post && (
          <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-gray-100 p-5 pl-16 smm:pl-11">
            <p className="text-sm text-gray-500 p-2 pt-0">
              Comment as{" "}
              <span className="text-red-500">{session?.user?.name}</span>
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex smm:flex-col smm:items-start items-end justify-start"
            >
              <textarea
                {...register("comment", { required: true })}
                className="h-24 w-2/3 smm:w-5/6 rounded-md border border-gray-200 p-2 pl-4
                outline-none disabled:bg-gray-400"
                placeholder={
                  session
                    ? "What are your thoughts ?"
                    : "You need to sign in first"
                }
              />

              <button
                type="submit"
                className="rounded-md ml-3 mt-2 bg-red-400 px-2 py-1 md:p-3 font-semibold text-white text-xs disabled:bg-gray-200"
              >
                comment
              </button>
            </form>
            <div className="my-4 rounded-md border border-t-0 border-gray-300 bg-white py-5 pb-7 px-10">
              <hr className="py-1" />
              {post?.commentList?.map((comment) => (
                <Comments comment={comment as Comment} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PostPage

















// <div
//                key={comment.id}
//                className="relative flex items-center space-x-2 space-y-5"
//              >
//                {/* {console.log(comment)} */}
//                <hr className="h-16 absolute top-10 left-7 z-0 border" />
//                <div className="z-50">
//                  <Avatars seed={comment.username} />
//                </div>

//                <div className="flex flex-col">
//                  <p className="py-2 text-xs text-gray-400">
//                    <span className="font-semibold text-gray-600">
//                      {comment.username}
//                    </span>{" "}
//                    - <TimeAgo date={comment.created_at} />
//                  </p>
//                  <p>{comment.text}</p>
//                </div>
//              </div>




    // if (loading && !data) {
    //     console.log(loading)
    //     toast.loading('loadig ..', {
    //         duration: 1000
    //     })
    // }
    // if (error) {
    //     console.log(error)
    //     toast.error('error occured')
    // }
