import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import './index.css'; // Import the CSS file

interface ButtonIconComponentProps extends ButtonProps {
  icon?: React.ReactNode;
}

const ButtonIconComponent: React.FC<ButtonIconComponentProps> = ({ icon, children, ...props }) => {
  return (
    <Button {...props} className="button-icon-component">
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-text">{children}</span>
    </Button>
  );
};

export default ButtonIconComponent;
