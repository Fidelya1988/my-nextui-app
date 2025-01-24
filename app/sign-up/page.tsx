"use client";
import React from "react";
import { Form, FormTypes, IFormData } from "@/components/form";

const SignUp = () => {
  const handleSubmit = async (data: IFormData) => {
    fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.username,
        email: data.email,
        password: data.password,
        role: "USER",
      }),
    });
  };
  return (
    <div>
      <Form type={FormTypes.signUp} onSubmit={handleSubmit} />
      {/* <div id="amazon-root">
        <a id="LoginWithAmazon">
          <img
            alt="Login with Amazon"
            src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_152x64_pressed.png"
            width="156"
            height="32"
          />
        </a>
      </div> */}
    </div>
  );
};

export default SignUp;
