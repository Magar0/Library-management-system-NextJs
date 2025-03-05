import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  // redirect to homepage if already login
  const session = await auth();
  if (session) redirect("/");
  return (
    <main className="relative flex flex-col-reverse text-light-100 sm:flex-row">
      <section className="my-auto flex h-full min-h-screen flex-1 items-center bg-dark-100 bg-pattern bg-cover bg-top px-5 py-10">
        <div className="gradient-vertical mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-10">
          <div className="flex flex-grow gap-3">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">Book House</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="sticky h-40 w-full sm:top-0 sm:h-screen sm:flex-1">
        <Image
          src={"/images/auth-illustration.png"}
          alt="auth-illustration"
          height={1000}
          width={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default layout;
