import { NextResponse } from 'next/server';
import { getAllJobs, createJob } from '@/lib/jobs';
import { processJob } from '@/lib/processJob';

export async function GET() {
  try {
    const jobs = await getAllJobs();
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const newJob = await createJob();

    processJob(newJob.id);
    return NextResponse.json(newJob);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}