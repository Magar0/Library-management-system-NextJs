"use client";

import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";
import React from "react";

const page = () => (
  <AuthForm
    type="SIGN_IN"
    schema={signInSchema}
    defaultValues={{ email: "admin@gmail.com", password: "12345678" }}
    onSubmit={signInWithCredentials}
  />
);
export default page;
