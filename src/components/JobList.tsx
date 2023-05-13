import JobDetail from "./JobDetail";
import { TJob } from "./types";

const JobList: React.FC<{ jobs: TJob[] }> = ({ jobs }) => {
  console.log("jobsjobs", jobs);
  return (
    <>
      {jobs.map((job: TJob) => (
        <div key={job.id} className="p-4 w-6/12">
          {/*<div key={job.id} className="m-10 w-5/12">*/}
          <JobDetail key={job.id} job={job} />
        </div>
      ))}
    </>
  );
};

export default JobList;
