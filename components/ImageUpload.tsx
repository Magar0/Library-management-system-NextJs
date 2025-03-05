"use client";
import {
  IKImage,
  IKVideo,
  ImageKitProvider,
  IKUpload,
  ImageKitContext,
} from "imagekitio-next";
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
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

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
  const ikUploadRef = useRef(null);
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
        onError={onError}
      />
      <button
        type="button"
        className="flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md bg-dark-300"
        //  onClick={()=>ikUploadRef.current.upload()}
        onClick={() => console.log("Image uoloader here")}
      >
        <Image
          src="/icons/upload.svg"
          width={20}
          height={20}
          alt="upload"
          className="object-contain"
        />
        <p className="text-base text-light-100">
          {file && <p className="mt-1 text-center text-xs">{file.filePath}</p>}
          {file && (
            <IKImage
              alt={file.filePath}
              path={file.filePath}
              width={500}
              height={500}
            />
          )}
        </p>
      </button>
    </ImageKitProvider>
  );
};

export default ImageUpload;
