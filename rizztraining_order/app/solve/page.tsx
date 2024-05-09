import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Selection from '@/components/Selection'
import React from 'react'

export default function page() {
  return (
    <div>
      <Header />  
      <div>
        <Selection />
      </div>
      <Footer />
    </div>
  )
}
