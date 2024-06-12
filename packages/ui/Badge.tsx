import * as React from "react";

interface Props {
  children?: React.ReactNode;
}

export const Badge = ({ children }: Props) => {
  return (
    <div>
      <h1>Badge</h1>
      {children}
    </div>
  );
};
