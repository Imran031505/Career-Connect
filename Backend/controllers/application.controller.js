import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { sendEmail2 } from "../utils/sendEmail2.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}



export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  try {
    const application = await Application.findById(id).populate("applicant");
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    application.status = status;
    await application.save();

    // Send email to the user
    const email = application.applicant.email;
    const name = application.applicant.fullname;

    const interviewDate = new Date();
interviewDate.setDate(interviewDate.getDate() + 3);
const formattedDate = interviewDate.toDateString(); // e.g., "Fri May 2 2025"

const message =
  status === "accepted"
    ? `
      <p style="font-family: Arial, sans-serif; color: #333;">
        Dear <strong style="color: #2E86C1;">${name}</strong>,<br><br>
        <span style="color: green;"><strong>Congratulations!</strong></span> 🎉<br><br>
        We are excited to inform you that you have been <strong style="color: green;">selected</strong> for the next stage of the hiring process.<br>
        Your interview is scheduled on <strong style="color: #8E44AD;">${formattedDate}</strong> between <strong>10:00 AM</strong> and <strong>12:00 PM</strong>.<br><br>
        Please check your dashboard for detailed interview instructions.<br><br>
        Wishing you all the best!<br><br>
        <span style="color: #555;">Regards,<br>
        The <strong>Career Connect</strong> Team</span>
      </p>
    `
    : `
      <p style="font-family: Arial, sans-serif; color: #333;">
        Dear <strong style="color: #2E86C1;">${name}</strong>,<br><br>
        <span style="color: red;"><strong>Unfortunately, you were not selected</strong></span> for this opportunity.<br><br>
        We truly appreciate the time and effort you put into your application.<br>
        We encourage you to continue exploring other exciting opportunities on <strong>Career Connect</strong>.<br><br>
        <span style="color: #555;">Best wishes,<br>
        The <strong>Career Connect</strong> Team</span>
      </p>
    `;



    await sendEmail2(email, `Application ${status}`, message);

    return res.status(200).json({ success: true, message: `Application ${status} and email sent.` });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
