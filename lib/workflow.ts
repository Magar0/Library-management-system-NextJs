import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import emailjs from "@emailjs/browser";

export const workFlowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = ({
  fullName,
  email,
  subject,
  message,
}: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const templateParams = {
    full_name: fullName,
    message,
    email,
    subject,
  };
  const templateId = "template_l5bm9jw";
  console.log("🟢🟢🟢email sending inside email");
  emailjs.send(config.env.emailJs.serviceId, templateId, templateParams, {
    publicKey: config.env.emailJs.publicKey,
  });
  return;
};
