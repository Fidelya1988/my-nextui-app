"use client";
import React from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
export interface ICardContentProps {
  content?: React.ReactNode | React.ReactNode[];
  header?: string;
  isDisabled?: boolean;
  handleDeleteAll: () => void;
  textToCopy: string;
}
export const CardComponent: React.FC<
  React.PropsWithChildren<ICardContentProps>
> = ({
  content,
  header,
  isDisabled,
  children,
  handleDeleteAll,
  textToCopy,
}) => {
  return (
    <Card className="p-2 w-[30rem]">
      <CardHeader className="justify-between">
        {header}

        <Button color="danger" variant="ghost" onClick={handleDeleteAll}>
          Delete all
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        {content}
        <div>{children}</div>
      </CardBody>
    </Card>
  );
};
