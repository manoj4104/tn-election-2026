import React, { useEffect, useRef } from 'react'

interface DynamicColorProps {
  color: string
  children: React.ReactNode
  className?: string
  as?: 'div' | 'span' | 'p'
}

export function DynamicColorText({ color, children, className = '', as: Component = 'span' }: DynamicColorProps) {
  const ref = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (ref.current) {
      ref.current.style.color = color
    }
  }, [color])
  
  return (
    <Component 
      ref={ref as any}
      className={className}
    >
      {children}
    </Component>
  )
}

interface DynamicBgColorProps {
  color: string
  children?: React.ReactNode
  className?: string
}

export function DynamicBgColor({ color, children, className = '' }: DynamicBgColorProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = color
    }
  }, [color])
  
  return (
    <div 
      ref={ref}
      className={className}
    >
      {children}
    </div>
  )
}

interface ProgressBarProps {
  color: string
  percentage: number
  className?: string
}

export function DynamicProgressBar({ color, percentage, className = '' }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (ref.current) {
      ref.current.style.backgroundColor = color
      ref.current.style.width = `${percentage}%`
    }
  }, [color, percentage])
  
  return (
    <div className={`bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        ref={ref}
        className="h-2 rounded-full transition-all duration-500"
      />
    </div>
  )
}
