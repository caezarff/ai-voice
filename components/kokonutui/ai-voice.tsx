"use client"

/**
 * @author: @kokonutui
 * @description: AI Voice
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { Mic } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function AI_Voice() {
  const [submitted, setSubmitted] = useState(false)
  const [time, setTime] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isDemo, setIsDemo] = useState(true)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (submitted) {
      intervalId = setInterval(() => {
        setTime((t) => t + 1)
      }, 1000)
    } else {
      setTime(0)
    }

    return () => clearInterval(intervalId)
  }, [submitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  /**
   * Remove that, only used for demo
   */
  useEffect(() => {
    if (!isDemo) return

    let timeoutId: NodeJS.Timeout
    const runAnimation = () => {
      setSubmitted(true)
      timeoutId = setTimeout(() => {
        setSubmitted(false)
        timeoutId = setTimeout(runAnimation, 1000)
      }, 3000)
    }

    const initialTimeout = setTimeout(runAnimation, 100)
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(initialTimeout)
    }
  }, [isDemo])

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false)
      setSubmitted(false)
    } else {
      setSubmitted((prev) => !prev)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: "#121212" }}>
      <div className="w-full py-4">
        <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-6 max-w-md mx-auto border border-white/10">
            <p className="text-white/80 text-sm mb-4">Não esquecer de revisar aquele arquivo amanhã cedo.</p>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-white animate-spin" style={{ animationDuration: "1s" }} />
              <span className="text-white/60 text-sm">Generating</span>
            </div>
          </div>

          <button
            className={cn(
              "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
              submitted ? "bg-none" : "bg-none hover:bg-white/10",
            )}
            type="button"
            onClick={handleClick}
          >
            {submitted ? (
              <div
                className="w-6 h-6 rounded-sm animate-spin bg-white cursor-pointer pointer-events-auto"
                style={{ animationDuration: "3s" }}
              />
            ) : (
              <Mic className="w-6 h-6 text-white/90" />
            )}
          </button>

          <span
            className={cn(
              "font-mono text-sm transition-opacity duration-300",
              submitted ? "text-white/70" : "text-white/30",
            )}
          >
            {formatTime(time)}
          </span>

          <div className="h-4 w-64 flex items-center justify-center gap-0.5">
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-0.5 rounded-full transition-all duration-300",
                  submitted ? "bg-white/50 animate-pulse" : "bg-white/10 h-1",
                )}
                style={
                  submitted && isClient
                    ? {
                        height: `${20 + Math.random() * 80}%`,
                        animationDelay: `${i * 0.05}s`,
                      }
                    : undefined
                }
              />
            ))}
          </div>

          <p className="h-4 text-xs text-white/70">{submitted ? "Listening..." : "Click to speak"}</p>
        </div>
      </div>
    </div>
  )
}
