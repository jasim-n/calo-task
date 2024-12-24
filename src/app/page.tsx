'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/types';
import { JobCard } from '@/components/JobCard';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000); 
    return () => clearInterval(interval);
  }, []);

  async function fetchJobs() {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        console.log("🚀 ~ file: page.tsx:22 ~ fetchJobs ~ data:", data)
        setJobs(data);
      }
    } finally {
      setLoading(false);
    }
  }

  async function createJob() {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST'
      });
      if (response.ok) {
        fetchJobs();
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  }

  return (
    <div className="container mx-auto p-4" suppressHydrationWarning>
      <h1 className="text-3xl font-bold mb-8">Job Processing System</h1>
      
      <button
        onClick={createJob}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Create New Job
      </button>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}