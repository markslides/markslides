import * as React from "react";

interface Props {
  children?: React.ReactNode;
}

export const Button = ({ children }: Props) => {
  return (
    <div>
      <h1>Button</h1>
      {children}
    </div>
  );
};
