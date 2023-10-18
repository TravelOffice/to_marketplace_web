import React from 'react';

export interface NotificationProps {
  title: string,
  message: string,
  onClick?: (e: React.MouseEvent) => void,
}

export default function Notification(props: NotificationProps) {
  const {
    title, message, onClick,
  } = props;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
      return true;
    }
    return false;
  };

  return (
    <div onClick={handleClick}>
      <div className="text-base font-semibold">{title}</div>
      <div className="text-sm">{message}</div>
    </div>
  );
}
