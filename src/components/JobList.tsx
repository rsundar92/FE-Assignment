import JobDetailCard from "./JobDetail";
import { TJob } from "./types";

const JobList: React.FC<{ jobs: TJob[] }> = ({ jobs }) => {
  return (
    <>
      {jobs.map((job: TJob) => (
        <div key={job.id} className="p-4 w-6/12">
          <JobDetailCard key={job.id} job={job} />
        </div>
      ))}
    </>
  );
};

export default JobList;
