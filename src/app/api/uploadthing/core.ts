import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

 
const f = createUploadthing();
 
const handleAuth = () => {
    const { userId } = auth();
    if (!userId) throw new Error ("Unauthorized");
    return { userId };
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "16MB", maxFileCount: 1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
    courseAttachment: f({
        text: { maxFileSize: "16MB" },
        image: { maxFileSize: "16MB" },
        video: { maxFileSize: "16MB" },
        audio: { maxFileSize: "16MB" },
        pdf: { maxFileSize: "16MB" },
      })
    .middleware(() =>handleAuth())
    .onUploadComplete(() => {}),
    chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB"}})
    .middleware(() => handleAuth())
    .onUploadComplete(()=> {})

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;