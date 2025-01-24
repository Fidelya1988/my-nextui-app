"use client";
import React from "react";
import { EyeFilledIcon } from "@/components/eye-filled-icon";
import { EyeSlashFilledIcon } from "@/components/eye-slash-filled-icon";
import { Button, Card, Input } from "@nextui-org/react";

export enum FormTypes {
  login = "login",
  signUp = "signUp",
}
export interface IFormData {
  username?: string;
  email: string;
  password: string;
}
interface IProps {
  type: FormTypes;
  onSubmit: (data: IFormData) => void;
}
export const Form: React.FC<IProps> = ({ type, onSubmit }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  interface IHandleSubmitEvent {
    preventDefault: () => void;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Card className="w-[20rem] p-4 ">
      <form onSubmit={() => onSubmit(formData)} className="gap-3">
        <Input
          isRequired
          type="email"
          label="Email"
          name="email"
          className="max-w-xs"
          onChange={handleChange}
        />
        {type === FormTypes.signUp && (
          <Input
            isRequired
            type="text"
            label="Username"
            className="max-w-xs"
            onChange={handleChange}
            name="username"
          />
        )}
        <Input
          isRequired
          label="Password"
          variant="bordered"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
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
        <Button type="submit">Send</Button>
      </form>
    </Card>
  );
};
function useState(arg0: { name: string; email: string }): [any, any] {
  throw new Error("Function not implemented.");
}
