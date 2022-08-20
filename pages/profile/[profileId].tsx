import { useQuery } from "@apollo/client";
import { ChaoticOrbit } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import router, { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import Post from "../../components/Post";
import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_BY_SUBRS,
  GET_POSTLIST_BY_POST_USERNAME,
} from "../../graphql/queries";

function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();

  console.log(router.query.profileId);

  const { loading, data, error } = useQuery(GET_POSTLIST_BY_POST_USERNAME, {
    variables: {
      username: router.query.profileId,
    },
  });

  // console.log(data)
  // console.log(loading)

  if (error) {
    console.log(error);
    toast.error("oo-oo, no posts exist!");
  }

  //destructuring all the data in Post array
  const posts: Post[] = data?.getPostListByPost_username;

  // console.log(posts);

  if (!posts)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <ChaoticOrbit size={25} speed={1.5} color="red" />
      </div>
    );

  return (
    <div className="flex items-center justify-center flex-col">
      {posts.length == 0 ? (
        <h1 className="font-bold text-xl margin-auto p-10">
          No Posts yet..{" "}
          {session?.user?.name ? session?.user?.name : "Anonymous"}
        </h1>
      ) : (
        <h1 className="font-bold text-xl margin-auto p-10">
          All of Your Posts..{" "}
          {session?.user?.name ? session?.user?.name : "Anonymous"}
        </h1>
      )}

      <div className="mt-5 space-y-4">
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <p className="flex justify-center items-center p-3">
          The Feed section is over
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
