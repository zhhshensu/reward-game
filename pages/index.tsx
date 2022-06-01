import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'

const Home: NextPage = (props) => {
  useEffect(() => {
    console.log('111')
  }, [])
  return (
    <div>
      <Head>
        <title>奖励游戏</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>
      </main>

      <footer>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const users: string[] = []

  // let initData = ['A', 'B', 'C', 'D', 'E']
  // let special = ['C', 'E']
  // const ins = new Price(initData, special)
  // // dom操作
  // let btn = document.querySelector('#btn')
  // let text = document.querySelector('#text')
  // btn.onclick = function () {
  //   ins.run()
  //   text.value = ins.getSelectedName()
  // }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  }
}

export default Home
