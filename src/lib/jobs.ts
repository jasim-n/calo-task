import { promises as fs } from 'fs';
import path from 'path';
import { Job } from '@/types';

const dataFile = path.join(process.cwd(), 'data', 'jobs.json');

export async function checkFileExists() {
  try {
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true });
    try {
      await fs.access(dataFile);
    } catch {
      await fs.writeFile(dataFile, '[]');
    }
  } catch (error) {
    console.error('Error while writing file', error);
  }
}

export async function getAllJobs(): Promise<Job[]> {
  await checkFileExists();
  const data = await fs.readFile(dataFile, 'utf8');
  return JSON.parse(data);
}

export async function getJobById(id: string): Promise<Job | null> {
  const jobs = await getAllJobs();
  return jobs.find(job => job.id === id) || null;
}

export async function createJob(): Promise<Job> {
  const jobs = await getAllJobs();
  
  const newJob: Job = {
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    imageUrl: null
  };
  
  jobs.push(newJob);
  await fs.writeFile(dataFile, JSON.stringify(jobs, null, 2));
  return newJob;
}

export async function updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
  const jobs = await getAllJobs();
  const index = jobs.findIndex(job => job.id === id);
  
  if (index === -1) return null;
  
  jobs[index] = { ...jobs[index], ...updates };
  await fs.writeFile(dataFile, JSON.stringify(jobs, null, 2));
  return jobs[index];
}
