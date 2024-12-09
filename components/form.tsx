"use client";
import React from "react";
import { EyeFilledIcon } from "@/components/eye-filled-icon";
import { EyeSlashFilledIcon } from "@/components/eye-slash-filled-icon";
import { Card, Input } from "@nextui-org/react";

// type FormType = 'login'
// enum FormTypes {
//     login = 'login'
// }
// interface IProps {
//     type: FormTypes
// }
export const Form = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Card className="w-[20rem] p-4 gap-3">
      <Input
        isRequired
        type="email"
        label="Email"
        defaultValue="junior@nextui.org"
        className="max-w-xs"
      />
      <Input
        isRequired
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        className="max-w-xs"
      />
    </Card>
  );
};
