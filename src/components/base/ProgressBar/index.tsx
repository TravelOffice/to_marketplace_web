import React from 'react';

export interface ProgressBarProps {
  progress: number,
}

export default function ProgressBar(props: ProgressBarProps) {
  const { progress } = props;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-200/50">
      <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
    </div>
  );
}
