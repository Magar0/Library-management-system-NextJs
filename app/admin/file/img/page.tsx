import ImagePreview from "@/components/admin/ImagePreview";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { path } = await searchParams;
  console.log({ path });
  return (
    <div className="grid w-full flex-grow place-items-center">
      {path && <ImagePreview path={path} />}
    </div>
  );
};

export default Page;
