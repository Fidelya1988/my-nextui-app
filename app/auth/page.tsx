import React from "react";
import { Form } from "@/components/form";

const Auth = () => {
  return (
    <div>
      <Form />
      <div id="amazon-root">
        <a id="LoginWithAmazon">
          <img
            alt="Login with Amazon"
            src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_152x64_pressed.png"
            width="156"
            height="32"
          />
        </a>
      </div>
    </div>
  );
};

export default Auth;
