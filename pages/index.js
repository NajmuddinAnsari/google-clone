import Head from 'next/head'
import { useState } from 'react'
import Body from '../components/body'
import Header from '../components/Header'
export default function Home() {
  
  return (
    <div >
      <Head>
        <title>facebook</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://iconarchive.com/download/i49148/yootheme/social-bookmark/social-facebook-button-blue.ico" />
      </Head>

      <Header />

      <Body />


    </div>
  )
}
