import { useRouter } from 'next/router'
import React from 'react'
import Avatars from '../../components/Avatars'
import Feed from '../../components/Feed'
import PostBox from '../../components/PostBox'

function Subrs() {
    const {query: {topic},} = useRouter()

  return (
    <div className='h-24 bg-red-400 p-8'>
        <div className='-mx-8 mt-8 bg-white'>
            <div className='mx-auto flex max-w-5xl items-center space-x-4 pb-3'>
                <div className='-mt-12 border border-dashed border-red-200'>
                    <Avatars seed={topic as string} large />
                </div>
                <div className='py-1 border border-dashed border-red-200'>
                    <h1 className='text-2xl font-semibold'>
                        Welcome to the r/{topic} subrS page
                    </h1>
                    <p className='text-sm text-gray-400'>
                        r/{topic}
                    </p>
                </div>
            </div>
            <div className='mx-auto mt-5 max-w-5xl pb-10'>
                <PostBox subrs={topic as string}/>
                <Feed subrs={topic as string}/>
            </div>
        </div>
    </div>
  )
}

export default Subrs