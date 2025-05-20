import { Bookmark } from "../models/bookmark.model.js";
import { Job } from "../models/job.model.js";



export const toggleBookmark = async (req, res) => {
  try {
    

      const userId = req.id;
      const jobId = req.params.jobId;

      if (!userId || !jobId) {
          return res.status(400).json({ success: false, message: "Invalid user ID or job ID" });
      }

      const existingBookmark = await Bookmark.findOne({ user: userId, job: jobId });

      if (existingBookmark) {
          await Bookmark.findByIdAndDelete(existingBookmark._id);
          return res.json({ success: true, message: "Bookmark removed" });
      }

      await Bookmark.create({ user: userId, job: jobId });
      res.json({ success: true, message: "Job bookmarked successfully" });
  } catch (error) {
      console.error("Error in toggleBookmark:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getBookmarkStatus = async (req, res) => {
  try {
      const userId = req.id;
      const jobId = req.params.jobId;

      if (!userId || !jobId) {
          return res.status(400).json({ success: false, message: "Invalid user or job ID" });
      }

      const isBookmarked = await Bookmark.exists({ user: userId, job: jobId });
      res.json({ success: true, isBookmarked: !!isBookmarked });
  } catch (error) {
      console.error("Error in getBookmarkStatus:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};

