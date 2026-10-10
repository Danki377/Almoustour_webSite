import { createRouteHandler } from "uploadthing/next";
import { uploadConfig, uploadRouter } from "@/lib/server/uploadthing";

// Token: UPLOADTHING_TOKEN (UploadThing dashboard → API Keys)
export const { GET, POST } = createRouteHandler({ router: uploadRouter, config: uploadConfig });
