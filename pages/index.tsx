import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import { Key } from "react";
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";
import SubrsRow from "../components/SubrsRow";
import { GET_SUBRS_BY_LIMIT } from "../graphql/queries";

const Home: NextPage = () => {
  const { loading, error, data } = useQuery(GET_SUBRS_BY_LIMIT, {
    variables: {
      limit: 7,
    },
  });

  //console.log(error, data); -- log the errro always in case

  const subrs: Subrs = data?.getSubrsListByLimit;

  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>FLRS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />

      <div className="flex justify-center flex-center">
        <Feed />

        <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-2-[300px] rounded-md border border-gray-300 bg-white lg:inline">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>

          <div>
            {/* Subrs */}
            {subrs?.map(
              (
                subrs: { id: Key | null | undefined; topic: string },
                i: number
              ) => (
                <div>
                  <SubrsRow key={subrs?.id} topic={subrs.topic} index={i} />
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <h1 className="flex text-lg flex-col items-center justify-center p-5 border border-top-gray-700">
        Forum Like Reddit for Students
      </h1>
    </div>
  );
};;

export default Home;

//flex min-h-screen flex-col items-center justify-center py-2 - initial style in next-tailwind
