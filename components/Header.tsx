import React, { Key, useState } from "react";
import {
  BeakerIcon,
  GlobeAltIcon,
  HomeIcon,
  MenuAlt3Icon,
  SearchIcon,
  SparklesIcon,
  VideoCameraIcon, 
} from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_SUBRS_BY_LIMIT } from "../graphql/queries";
import SubrsRow from "./SubrsRow";
import { XIcon } from "@heroicons/react/outline";


function Header() {
  const { data: session } = useSession();
  const [ handleNav, setHandleNav ] = useState(false);

  console.log(handleNav)

  const { loading, error, data } = useQuery(GET_SUBRS_BY_LIMIT, {
    variables: {
      limit: 7,
    },
  });

  //console.log(error, data); -- log the errro always in case

  const subrs: Subrs = data?.getSubrsListByLimit;



  return (
    <div className="sticky top-0 z-100 flex px-3 py-2 border-b-red-400 border-4">
      <Link href="/">
        <div className="relaive h-10 w-20 flex-shrink-0 cursor-pointer">
          <h2 className="border-4 rounded-lg text-center py-1">FLRS</h2>
        </div>
      </Link>
      <Link href="/">
        <div className="mr-3 ml-3 flex items-center xl:mon-w-[300px] cursor-pointer">
          <HomeIcon className="h-5 w-5" />
          <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        </div>
      </Link>
      {/*searh box*/}
      <form className="flex-1 hidden md:inline-flex items-center space-x-2 rounder-sm border border-gray-200 bg-gray-100 px-3 py-1 rounded-lg">
        <SearchIcon className="h-5 w-5" />
        <input
          className="outline-none w-3/4 bg-transparent"
          type="text"
          placeholder="Search"
        />
        <button type="submit" hidden />
      </form>

      <div className="ml-4 flex items-center flex-1 justify-self-end text-gray-500 md:hidden"></div>

      {session ? (
        <div
          onClick={() => signOut()}
          className="signin__button text-xs ml-3 flex items-center space-x-2 rounder-sm border border-gray-300 bg-gray-100 px-3 py-1 rounded-lg"
        >
          <button className="text-center" type="submit">
            {session?.user?.name?.slice(0, 13)}
            <p>sign out</p>
          </button>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="signin__button text-xs ml-3 flex items-center space-x-2 rounder-sm border border-gray-300 bg-gray-100 px-3 py-1 rounded-lg"
        >
          <button className="text-center" type="submit">
            sign in
          </button>
        </div>
      )}

      <div className="mx-5 hidden items-center text-gray-500 space-x-2 lg:inline-flex">
        <GlobeAltIcon className="icon" />
        <SparklesIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <BeakerIcon className="icon" />
      </div>

      <div className="ml-4 flex items-center justify-self-end text-gray-500 lg:hidden">
        {!handleNav && (
          <MenuAlt3Icon
            onClick={() => setHandleNav(true)}
            className="icon flex-1 justify-self-end"
          />
        )}

        {handleNav && (
          <div className="fixed flex flex-col rounded-md top-0 bottom-0 right-0 z-50 p-0 justify-center align-center h-full w-full backdrop-blur-md">
            <XIcon
              onClick={() => setHandleNav(false)}
              className="cursor-pointer flex m-auto pt-28 justify-self-end text-bold h-40 w-40"
            />
            {subrs?.map(
              (
                subrs: { id: Key | null | undefined; topic: string },
                i: number
              ) => (
                <div className="">
                  <SubrsRow key={subrs?.id} topic={subrs.topic} index={i} />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

// const handleNav = create(set => ({
//   bears: 0,
//   increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
// }),
// console.log(bears)
// )
