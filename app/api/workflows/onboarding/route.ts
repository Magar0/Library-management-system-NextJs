import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import config from "@/lib/config";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";

type InitialData = {
  email: string;
  fullName: string;
};
type UserState = "non-active" | "active";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 587,
  auth: {
    user: config.env.smtp.mail,
    pass: config.env.smtp.password,
  },
});

// sending email using nodemailer
const sendEmail = async ({
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

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

//getting user state
const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
    timeDifference > 3 * ONE_DAY_IN_MS &&
    timeDifference <= 30 * ONE_DAY_IN_MS
  ) {
    return "non-active";
  }
  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  console.log("🟢🟢Workflow start");

  //welcome email
  await context.run("new-signup", async () => {
    console.log("🟢Email start");
    await sendEmail({
      email,
      subject: "Welcom to the platform",
      message: `Welcome ${fullName}`,
    });
  });

  console.log("🟢Sleep start");
  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "Are you still there?",
          message: `Hey ${fullName}, we miss you`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcom back!",
          message: `Welcome back ${fullName}!`,
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
