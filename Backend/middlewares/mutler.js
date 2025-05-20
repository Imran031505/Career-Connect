import multer from "multer";

const storage = multer.memoryStorage();
export const single2Upload = multer({storage}).single("file");
export const singleUpload = multer({ storage }).fields([
  { name: "resume", maxCount: 1 }, // Resume
  { name: "profilePhoto", maxCount: 1 } // Profile photo
]);




