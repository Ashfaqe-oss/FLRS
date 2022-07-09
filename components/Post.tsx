import { ArrowDownIcon, ArrowUpIcon, GiftIcon } from '@heroicons/react/solid'
import React, { Suspense, useState } from 'react'
import Avatars from './Avatars'
import TimeAgo from 'react-timeago'
import { ChatAlt2Icon, DotsHorizontalIcon, ShareIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { ChaoticOrbit } from '@uiball/loaders'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useMutation } from '@apollo/client'
import { ADD_VOTE } from '../graphql/mutations'
import { GET_ALL_VOTES_BY_POST_ID } from '../graphql/queries'

type Props = {
  post: Post;
};

function Post({post}: Props) {
  const {data: session} = useSession()
  const [vote, setVote] = useState<boolean>()

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesUsingPost_id']
  })

  const UpVote = async (isUpVote: boolean) => {
    if(!session) {
      toast("! You need to sign in to vote !")
      return;
    }
  }

  if (!post) 
    return (
      <div className='flex w-full items-center justify-center p-10 text-xl'>
        <ChaoticOrbit size={25} speed={1.5} color="black" />
      </div>
    );

  return (
    <Link href={`/post/${post.id}`}>

    <div className="flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
       {/* Votes */}
        <div className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-100 p-4 text-gray-400'>
           <ArrowUpIcon onClick={() => UpVote(true)} className="voteButtons hover:text-green-400"/>
           <p className='text-black text-xs font-bold'>0</p>
           <ArrowDownIcon onClick={() => UpVote(false)} className="voteButtons hover:text-blue-400"/>
        </div>

        <div className="p-3 pb-1">
            {/* header */}
            <div className="flex items-center space-x-2">
                <Avatars seed={post.subrs[0]?.topic || "me"} />
                <p className='text-xs text-gray-400'>
                    <Link href={`/subrs/${post.subrs[0]?.topic}`}>
                    <span className='font-bold text-black hover:text-blue-400 hover:underline'>
                        r/{post.subrs[0]?.topic}
                    </span>
                    </Link>
                    -- Posted by u/ {post.username} <TimeAgo date={post.created_at}/>
                </p>
            </div>

            {/* Body */}
            <div className='py-4'>
                <h2 className='text-xl font-semibold'>{post.title}</h2>
                <p className='mt-2 text-sm font-light'>{post.body}</p>
            </div>

            {/* Image */}
            <div>
                <img className='w-full max-w-md' src={post.image} alt="image for the post"/>
            </div>

            {/* Footer */}
            <div className='flex space-x-4 text-gray-400'>
                <div className="postButtons hover:bg-gray-100 rounded-md m-1 mt-3 mb-2">
                    <ChatAlt2Icon className="h-6 w-6 hover:text-gray-300"/>
                    <p className="text-xs sm:text-sm ">{post.commentList.length} Comments</p>
                </div>
                <div className="postButtons hover:bg-gray-100 rounded-md m-2 mb-1">
                    <GiftIcon className="h-5 w-5 hover:text-gray-300"/>
                    <p className="hidden sm:inline"> Award</p>
                </div>
                <div className="postButtons hover:bg-gray-100 rounded-md m-2 mb-1">
                    <ShareIcon className="h-5 w-5 hover:text-gray-300"/>
                    <p className="hidden sm:inline"> Share</p>
                </div>
                <div className="postButtons hover:bg-gray-100 rounded-md m-2 mb-1">
                    <DotsHorizontalIcon className="h-5 w-5 hover:text-gray-300"/>
                    <p className="hidden sm:inline"> Save</p>
                </div>
                
            </div>
        </div>

    </div>

</Link>
  )
}

export default Post