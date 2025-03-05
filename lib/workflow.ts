import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import nodemailer from "nodemailer";

export const workFlowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const transporter = nodemailer.createTransport({
  service: "smtp.gmail.com",
  port: 587,
  auth: {
    user: config.env.smtp.mail,
    pass: config.env.smtp.password,
  },
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  console.log("🟢🟢🟢email sending inside email");

  const mailOption = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
  };

  await transporter.sendMail(mailOption);

  return;
};
