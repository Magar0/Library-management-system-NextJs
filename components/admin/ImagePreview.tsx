"use client";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

const ImagePreview = ({ path }: { path: string }) => {
  return (
    <IKImage
      path={path}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      alt="img"
    />
  );
};

export default ImagePreview;
