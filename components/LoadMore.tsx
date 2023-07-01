"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";

type Props = {
    startCursor: string
    endCursor: string
    hasPreviousPage: boolean
    hasNextPage: boolean
    setState: (value: boolean) => void;
}

const LoadMore = ({ startCursor, endCursor, hasPreviousPage, hasNextPage, setState }: Props) => {
  const router = useRouter();
  
  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (direction === "next" && hasNextPage) {
      currentParams.delete("startcursor")
      currentParams.set("endcursor", endCursor)
      setState(false);
    } else if (direction === "first" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
      setState(false);
    } else if (direction === "previous" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
      setState(true);
    }
    const newSearchParams = currentParams.toString();
    const newPathName = `${window.location.pathname}?${newSearchParams}`
    router.push(newPathName);
  }
  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button 
          title="First Page"
          handleClick={() => handleNavigation("first")}
        />
      )}
      {hasPreviousPage && (
        <Button 
          title="Previous Page"
          handleClick={() => handleNavigation("previous")}
        />
      )}
      {hasNextPage && (
        <Button 
          title="Next Page"
          handleClick={() => handleNavigation("next")}
        />
      )}
    </div>
  )
}

export default LoadMore