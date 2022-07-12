import { useQuery } from '@apollo/client'
import { ChaoticOrbit } from '@uiball/loaders'
import React, { Suspense, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_SUBRS } from '../graphql/queries'
import Post from './Post'

type Props = {
  subrs ?: string
}

function Feed({ subrs }: Props) {

  const {loading, data, error} = !subrs ? 
    useQuery(GET_ALL_POSTS) 
    : useQuery(GET_ALL_POSTS_BY_SUBRS, 
      {
        variables: {
          topic : subrs
        },
      })
  
  // console.log(data)
  // console.log(loading)

  if(error) {
      console.log(error)
      toast.error('oo-oo wrong subrs, no posts exist!')
  }
  
  //destructuring all the data in Post array
  const posts: Post[] = !subrs ? data?.getPostList : data?.getPostUsingSubrs_Topic

  if (!posts) 
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <ChaoticOrbit size={25} speed={1.5} color="red" />
      </div>
    );

  return (
    <div className="mt-5 space-y-4">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <p className="flex justify-center items-center p-3">
        The Feed section is over
      </p>
    </div>
  );
}

export default Feed