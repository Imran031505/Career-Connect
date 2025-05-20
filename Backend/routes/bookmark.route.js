import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { toggleBookmark, getBookmarkStatus } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.route("/save/:jobId").post(isAuthenticated, toggleBookmark);
router.route("/status/:jobId").get(isAuthenticated, getBookmarkStatus);

export default router;
