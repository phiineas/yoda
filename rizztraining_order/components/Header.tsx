import React from "react"
import Image from "next/image"
import img from '../public/yoda.png'

export default function Header() {
    return (
        <header className="flex items-center h-16 bg-gradient-to-r from-purple-700 to-purple-600 text-white p-5">
            <Image src={img} alt="yoda" className="h-[50px] w-[75px] mr-1.5 mt-3" />
            <h2 className="text-xl mr-auto">Simply Salted</h2>
            <h4 className="text-sm font-medium">Touch Some Grass</h4>
        </header>
    )
}