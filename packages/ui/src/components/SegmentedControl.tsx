// packages/ui/src/components/SegmentedControl.tsx
import React from 'react';

// Simplified cn function for internal use if clsx/tailwind-merge are not set up yet
// In a real project, we would use a shared @clawsome/ui/utils package or just clsx.
const cn = (...classes: (string | undefined | null | boolean)[]) => 
  classes.filter(Boolean).join(' ');

interface SegmentedControlProps {
  options: string[] | { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  theme?: 'light' | 'dark';
  className?: string;
  itemClassName?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ 
  options, 
  value, 
  onChange,
  theme = 'dark',
  className,
  itemClassName
}) => {
  const renderedOptions = options.map(opt => 
    typeof opt === 'string' ? { id: opt, label: opt } : opt
  );

  return (
    <div className={cn(
      "p-1 rounded-full border flex items-center gap-1 shadow-xl transition-all h-full",
      theme === 'dark' ? "bg-slate-900/60 border-slate-800 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40",
      className
    )}>
      {renderedOptions.map((opt) => {
        const isActive = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              "flex-1 h-full px-4 min-w-[60px] flex items-center justify-center rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
              isActive
                ? "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20"
                : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-950"),
              itemClassName
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
