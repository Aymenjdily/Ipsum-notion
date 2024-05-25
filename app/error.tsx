"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import React from 'react'

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
            src="/larry-4-dark.svg"
            alt="not-found"
            height={300}
            width={300}
            className="dark:hidden"
        />
        <Image
            src="/larry-4-light.svg"
            alt="not-found"
            height={300}
            width={300}
            className="dark:block hidden"
        />
        <h2 className="text-xl font-semibold">
            Something went wrong!
        </h2>
        <Button
            asChild
        >
            <Link href="/documents">
                Go back
            </Link>
        </Button>
    </div>
  )
}

export default Error