import React, { useEffect, useState } from 'react';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  // Debug 输出，看看有没有收到数据
  useEffect(() => {
    fetch("http://localhost:4003/jobs")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched jobs:", data); // 👈 调试输出
        setJobs(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Listings</h1>

      {jobs.length === 0 && (
        <p style={{ color: "gray" }}>No jobs loaded (check console)</p>
      )}

      {jobs.map(job => (
        <div key={job._id} style={{
          border: "1px solid #ccc",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "10px"
        }}>
          <h2>{job.title}</h2>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
