import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
  
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
}, { timestamps: true });

// Virtual field to count pending applications (status: 'pending')
jobSchema.virtual('pendingApplicationsCount', {
    ref: 'Application',
    localField: '_id',
    foreignField: 'job',
    match: { status: 'pending' },
    count: true
});

// Ensure virtuals are included in JSON and object outputs
jobSchema.set('toObject', { virtuals: true });
jobSchema.set('toJSON', { virtuals: true });

export const Job = mongoose.model("Job", jobSchema);
