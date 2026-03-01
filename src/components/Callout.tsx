import React from 'react';
import { Lightbulb, AlertTriangle, BookOpenText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  type: 'tip' | 'warning' | 'exercise' | 'default';
  children: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ type, children }) => {
  const iconMap = {
    tip: <Lightbulb className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    exercise: <BookOpenText className="h-5 w-5" />,
    default: <Lightbulb className="h-5 w-5" />, // Fallback
  };

  const colorClasses = {
    tip: 'border-callout-tip-border bg-callout-tip-bg text-callout-tip-border',
    warning: 'border-callout-warning-border bg-callout-warning-bg text-callout-warning-border',
    exercise: 'border-callout-exercise-border bg-callout-exercise-bg text-callout-exercise-border',
    default: 'border-gray-300 bg-gray-50 text-gray-700',
  };

  return (
    <div
      className={cn(
        'my-6 flex items-start gap-3 rounded-lg border-l-4 p-4',
        colorClasses[type]
      )}
    >
      <div className="flex-shrink-0 mt-1">
        {iconMap[type]}
      </div>
      <div className="flex-1 prose prose-sm max-w-none !text-inherit">
        {children}
      </div>
    </div>
  );
};

export default Callout;