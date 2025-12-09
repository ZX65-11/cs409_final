// server/models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },     
  company: { type: String, required: true },   
  location: { type: String, required: true },   
  description: { type: String, default: "" },   
  requirements: { type: String, default: "" }, 
  tags: [{ type: String }],                  
  salaryRange: { type: String },             
  applyUrl: { type: String },
  applyEmail: { type: String },
  deadline: { type: Date },
  source: { type: String },                    

  createdBy: {                                  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
