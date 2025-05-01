import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <div className="tabs">
      {children}
    </div>
  );
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export function TabsList({ className = '', children }: TabsListProps) {
  return (
    <div className={`flex gap-2 border-b ${className}`}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

export function TabsTrigger({ value, className = '', children, onValueChange }: TabsTriggerProps) {
  const handleClick = () => {
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  activeValue?: string;
}

export function TabsContent({ value, className = '', children, activeValue }: TabsContentProps) {
  if (value !== activeValue) {
    return null;
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
} 