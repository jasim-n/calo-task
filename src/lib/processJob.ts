import { updateJob } from './jobs';

export async function processJob(jobId: string) {
  const delay = Math.floor(Math.random() * 60) * 5000 + 5000;
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  const imageUrl = `https://source.unsplash.com/random/800x600/?food`;
  
  await updateJob(jobId, {
    status: 'completed',
    imageUrl
  });
}