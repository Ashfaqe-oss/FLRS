import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'


const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>FLRS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox/>

      <div className="flex">
        <Feed/>
      </div>

      <h1 className="flex text-lg flex-col items-center justify-center p-5">Forum Like Reddit for Students</h1>
    </div>
  )
}

export default Home


//flex min-h-screen flex-col items-center justify-center py-2 - initial style in next-tailwind