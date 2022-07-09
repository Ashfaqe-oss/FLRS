import React from 'react'
import { BeakerIcon, GlobeAltIcon, HomeIcon, MenuAlt3Icon, SearchIcon, SparklesIcon, VideoCameraIcon } from '@heroicons/react/solid'
import {signIn, signOut, useSession} from "next-auth/react"
import Link from 'next/link';

function Header() {

  const { data: session } = useSession();


  return (
      <div className="sticky top-0 z-100 flex px-3 py-2 border-b-red-400 border-4">
        <Link href='/'>
          <div className="relaive h-10 w-20 flex-shrink-0 cursor-pointer">
              <h2 className="border-4 rounded-lg text-center py-1">FLRS</h2>
          </div>
        </Link>
        <Link href='/'>
          <div className="mr-3 ml-3 flex items-center xl:mon-w-[300px] cursor-pointer">
              <HomeIcon className="h-5 w-5"/>
              <p className="ml-2 hidden flex-1 lg:inline">Home</p>
          </div>
        </Link>
          {/*searh box*/}
          <form className="flex-1 hidden md:inline-flex items-center space-x-2 rounder-sm border border-gray-200 bg-gray-100 px-3 py-1 rounded-lg">
              <SearchIcon className="h-5 w-5"/>
              <input className="outline-none w-3/4 bg-transparent" type="text" placeholder="Search" />
              <button type="submit" hidden/>
          </form>

          <div className="ml-4 flex items-center flex-1 justify-self-end text-gray-500 md:hidden">
          </div>

          {session ? (
          <div onClick={() => signOut()} className="signin__button text-xs ml-3 flex items-center space-x-2 rounder-sm border border-gray-300 bg-gray-100 px-3 py-1 rounded-lg">
              <button className="text-center" type="submit">{session?.user?.name?.slice(0,13)}<p>sign out</p></button>
          </div>
          ): (
               <div onClick={() => signIn()} className="signin__button text-xs ml-3 flex items-center space-x-2 rounder-sm border border-gray-300 bg-gray-100 px-3 py-1 rounded-lg">
              <button className="text-center" type="submit">sign in</button>
          </div>   
          ) 
          }
          

          <div className='mx-5 hidden items-center text-gray-500 space-x-2 lg:inline-flex'>
              <GlobeAltIcon className='icon'/>
              <SparklesIcon className='icon'/>
              <VideoCameraIcon className='icon'/>
              <BeakerIcon className='icon'/>
          </div>
          
          <div className="ml-4 flex items-center justify-self-end text-gray-500 lg:hidden">
              <MenuAlt3Icon className="icon flex-1 justify-self-end" />
              
          </div>
    </div>
  )
}

export default Header