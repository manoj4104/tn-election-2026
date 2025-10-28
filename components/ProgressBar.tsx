'use client'

interface ProgressBarProps {
  percentage: number;
  color?: 'indigo' | 'green' | 'blue' | 'red';
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProgressBar({ 
  percentage, 
  color = 'indigo', 
  height = 'sm',
  className = ''
}: ProgressBarProps) {
  const heightClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-6'
  };

  const colorClasses = {
    indigo: 'bg-indigo-600',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500'
  };

  // Create width class based on percentage ranges
  const getWidthClass = (pct: number) => {
    const rounded = Math.round(pct / 5) * 5; // Round to nearest 5
    if (rounded >= 95) return 'w-full';
    if (rounded >= 90) return 'w-11/12';
    if (rounded >= 75) return 'w-3/4';
    if (rounded >= 70) return 'w-2/3';
    if (rounded >= 50) return 'w-1/2';
    if (rounded >= 33) return 'w-1/3';
    if (rounded >= 25) return 'w-1/4';
    if (rounded >= 20) return 'w-1/5';
    if (rounded >= 10) return 'w-1/12';
    return 'w-2';
  };

  return (
    <div className={`w-full bg-gray-200 rounded ${heightClasses[height]} overflow-hidden ${className}`}>
      <div className={`${heightClasses[height]} rounded transition-all duration-300 ease-in-out ${colorClasses[color]} ${getWidthClass(percentage)}`} />
    </div>
  );
}