"use client";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

// calls backend to get imagekit authentication parameters
const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success("Image uploaded successfully");
  };

  const onError = (error: any) => {
    console.error(error);
    toast.error("Image upload failed");
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        fileName="test-upload.png"
        ref={ikUploadRef}
        onSuccess={onSuccess}
        useUniqueFileName
        onError={onError}
      />
      <button
        type="button"
        className="flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md bg-dark-300"
        //  onClick={()=>ikUploadRef.current.upload()}
        onClick={() => {
          if (ikUploadRef.current) {
            console.log({ test: ikUploadRef.current });
            ikUploadRef.current.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          width={20}
          height={20}
          alt="upload"
          className="object-contain"
        />
        <p className="text-base text-light-100">
          {file && (
            <span className="mt-1 text-center text-xs">{file.filePath}</span>
          )}
        </p>
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
