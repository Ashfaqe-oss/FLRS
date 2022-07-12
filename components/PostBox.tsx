import React, {useState} from 'react'
import Avatars from './Avatars'
import {useSession} from 'next-auth/react'
import {LinkIcon, PhotographIcon} from '@heroicons/react/outline'
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBRS } from '../graphql/mutations';
import client from '../apollo-client'
import { GET_ALL_POSTS, GET_SUBRS_BY_TOPIC } from '../graphql/queries';
import toast from 'react-hot-toast';

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subrs: string;
}

type Props = {
  subrs?: string
}

function PostBox({subrs}: Props) {
  const { data: session } = useSession();
  const [imageBoxOpen, setImageBoxOpen] = useState(false);

  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS,'getPostList']
  })

  const [addSubrs] = useMutation(ADD_SUBRS)
 
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async(formData) => {
    console.log(formData)
    const notification = toast.loading('creating new post')

    try{
      //query for the subrs topic...
      console.log(subrs)
      //one method to call with client from our own configured apollo file
      const {data: {getSubrsListByTopic}} = await client.query({
        query: GET_SUBRS_BY_TOPIC,
        variables: {
          topic: subrs || formData.subrs
        }
      })
      
      console.log(getSubrsListByTopic)
      const subrsExists = getSubrsListByTopic.length > 0;

      if(!subrsExists) {
        //create subrs..

        console.log('Subrs is new ! -- creating a new subrss')

        const {data: { insertSubrs: newSubrs }} = await addSubrs({
          variables: {
            topic: formData.subrs
          }
        })

        console.log('creating post ...')

        const image = formData.postImage || ''

        const {data: {insertPost: newPost}} = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            title: formData.postTitle,
            username: session?.user?.name || 'Anonymous',
            subrs_id: newSubrs.id
          }
        })

        console.log('new post added:', newPost)

      } else {
        //use the existing subrs..
        console.log('subrs exists so -- using the already existing one')
        console.log(getSubrsListByTopic)

        const image = formData.postImage || ''

        const {data: {insertPost: newPost}} = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            title: formData.postTitle,
            username: session?.user?.name || 'Anonymous',
            subrs_id: getSubrsListByTopic[0].id
          }
        })

        console.log(newPost)
      }

      //after post has been added

      setValue('postBody', '')
      setValue('postTitle', '')
      setValue('postImage', '')
      setValue('subrs', '')

      toast.success('New Post Created !', {
        id: notification
      })
    } catch(error) {
      console.log(error)
      toast.error('oo-oo Whoops someting went wrong!', {
        id: notification
      })
    }
  })

    return (
      <form
        onSubmit={onSubmit}
        className="sticky top-0 z-50 m-3 p-2 rounded-md border border-gray-300
     bg-white my-5 mx-auto max-w-5xl"
      >
        <div className="flex place-items-center justify-center space-x-3 ">
          <Avatars seed={session?.username as string} large />
          <input
            disabled={!session}
            className="flex w-2/3 rounded-md bg-gray-50 p-2 pl-5 outline-none"
            {...register("postTitle", { required: true })}
            type="text"
            placeholder={
              session
                ? subrs
                  ? `Type a post in r/${subrs}`
                  : "Enter a title for a post"
                : "Sign in to post"
            }
          />
          <PhotographIcon
            onClick={() => setImageBoxOpen(!imageBoxOpen)}
            className={`h-6 text-slate-500 cursor-pointer ${
              imageBoxOpen && "text-blue-500"
            }`}
          />
          <LinkIcon className="h-6 text-gray-300" />
        </div>
        {!!watch("postTitle") && (
          <div className="">
            <div className="flex items-center p-2">
              <p className="min-w-[90px] text-slate-500 ">Body :</p>
              <input
                className="m2 flex-1 bg-blue-50 p-2 outline-none rounded-md"
                {...register("postBody")}
                type="text"
                placeholder="Txt"
              />
            </div>

            {!subrs && (
              <div className="flex items-center p-2">
                <p className="min-w-[90px] text-slate-500">Subrs :</p>
                <input
                  className="m2 flex-1 bg-blue-50 p-2 outline-none rounded-md"
                  {...register("subrs", { required: true })}
                  type="text"
                  placeholder="Optional ..."
                />
              </div>
            )}

            {imageBoxOpen && (
              <div className="flex items-center p-2">
                <p className="min-w-[90px] text-slate-500">Image url :</p>
                <input
                  className="m2 flex-1 bg-blue-50 p-2 outline-none rounded-md"
                  {...register("postImage")}
                  type="text"
                  placeholder="optional ..."
                />
              </div>
            )}
          </div>
        )}

        {/* error handling */}
        {Object.keys(errors).length > 0 && (
          <div className="space-y-2 p-2 text-red-500">
            {errors.postTitle?.type === "required" && (
              <p>- A Post Title is required</p>
            )}

            {errors.subrs?.type === "required" && <p>-- A Subrs is required</p>}
          </div>
        )}

        {!!watch("postTitle") && (
          <div className="flex place-items-center justify-center p-2">
            <button
              type="submit"
              className="flex justify-center  w-1/2 max-w-[230px] rounded-xl bg-rose-400 p-2 text-white"
            >
              Create Post
            </button>
          </div>
        )}
      </form>
    );
}

export default PostBox