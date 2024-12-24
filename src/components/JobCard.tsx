import { Job } from "@/types";
import { useState } from "react";

interface JobCardProps {
  job: Job;
}


// showing job card status with Image
export function JobCard({ job }: JobCardProps) {
  const [randomNumber] = useState(Math.random());

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <p className="font-semibold mb-2">Job ID: {job.id}</p>
      <p className="mb-2">Status: {job.status}</p>
      <p className="mb-2">
        Created: {new Date(job.createdAt).toLocaleString()}
      </p>

      {job.status === "completed" && job.imageUrl && (
        <img
          src={`https://picsum.photos/800/600?random=${randomNumber}`}
          alt="Food"
          className="w-full h-48 object-cover rounded"
        />
      )}
    </div>
  );
}
