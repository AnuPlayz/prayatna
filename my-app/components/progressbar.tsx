"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressBar() {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        function handleScroll() {
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100
            setProgress(scrollPercentage)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return <Progress value={progress} className="w-full h-[5px]" />
}