import React from 'react'
import Avatars from './Avatars'
import TimeAgo from 'react-timeago'

type Props = {
    comment: Comment[];
}

function Comments({ comment }: Props) {
  return (
    <div>
      <div
        key={comment.id}
        className="relative flex items-center space-x-2 space-y-5"
      >
        {/* {console.log(comment)} */}
        <hr className="h-16 absolute top-10 left-7 z-0 border" />
        <div className="z-50">
          <Avatars seed={comment.username} />
        </div>

        <div className="flex flex-col">
          <p className="py-2 text-xs text-gray-400">
            <span className="font-semibold text-gray-600">
              {comment.username}
            </span>{" "}
            - <TimeAgo date={comment.created_at} />
          </p>
          <p>{comment.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Comments