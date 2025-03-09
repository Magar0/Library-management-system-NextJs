import { auth } from "@/auth";
import Header from "@/components/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  after(async () => {
    if (!session.user?.id) return;

    // check if last activity is today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);
    const dateOfToday = new Date().toISOString().slice(0, 10);
    if (user[0]?.lastActivityDate === dateOfToday) return;
    // update lastactivity
    await db
      .update(users)
      .set({ lastActivityDate: dateOfToday })
      .where(eq(users.id, session.user.id));
  });
  return (
    <main className="root-container">
      <div className="mx-auto w-full max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20"> {children}</div>
      </div>
    </main>
  );
};

export default Layout;
