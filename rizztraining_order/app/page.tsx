import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Intro from '@/components/Intro'
import React from 'react'

export default function page() {
  return (
    <div>
      <Header />
      <div>
        <Intro />
      </div>
      <Footer />
    </div>
  )
}
