"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";

type Props = {
    startCursor: string
    endCursor: string
    hasPreviousPage: boolean
    hasNextPage: boolean
}

const LoadMore = () => {
  return (
    <div>LoadMore</div>
  )
}

export default LoadMore