"use client";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value: string;
  onFileChange: (filePath: string) => void;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : " bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast.success(`${type} uploaded successfully`);
  };

  const onError = (error: any) => {
    console.error(error);
    // toast.error(`${type} upload failed`);
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size too large. Please upload less than 5MB");
        return false;
      }
    } else if (type === "video") {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size too large. Please upload less than 10MB");
        return false;
      }
    }
    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        className="hidden"
        fileName="test-upload.png"
        useUniqueFileName
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const precent = Math.round((loaded / total) * 100);
          setProgress(precent);
        }}
        folder={folder}
        accept={accept}
      />
      <button
        type="button"
        className={cn(
          "flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md bg-dark-300",
          styles.button,
        )}
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
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {file && (
          <p className={cn("mt-1 text-center text-xs", styles.text)}>
            {file.filePath}
          </p>
        )}
      </button>
      {progress > 0 && progress < 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}
      {file.filePath &&
        (type === "image" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : type === "video" ? (
          <IKVideo
            path={file.filePath}
            controls
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
