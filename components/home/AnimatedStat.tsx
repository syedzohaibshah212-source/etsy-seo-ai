"use client"

import { useEffect, useState } from "react"

type Props = {
  value: number
  suffix?: string
}

export default function AnimatedStat({ value, suffix = "" }: Props) {
  const [count, setCount] = useState(value)

  useEffect(() => {
    setCount(value)
  }, [value])

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  )
}