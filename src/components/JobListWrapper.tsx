import { useEffect, useState } from "react";
import { useJobDispatchContext, useJobStateContext } from "../modules/job";
import { fetchJobs } from "../modules/job/reducer";
import CreateJobFormWrapper from "./CreateJobFormWrapper";
import JobList from "./JobList";

const JobListWrapper: React.FC<{}> = () => {
  const [showCreateJobForm, toggleCreateJobForm] = useState(false);

  const dispatch = useJobDispatchContext();
  const { list, isFetching } = useJobStateContext();

  useEffect(() => {
    fetchJobs()(dispatch);
  }, [dispatch]);

  return (
    <>
      {isFetching ? (
        "Loading skeleton goes here..."
      ) : (
        <>
          <div className="flex justify-end ">
            <button
              onClick={() => {
                toggleCreateJobForm(true);
              }}
              className="flex bg-[#1597E4] h-10 px-4 py-2 rounded-lg text-white mr-6"
            >
              Create job
            </button>
          </div>
          <div className="flex flex-wrap width-full">
            {list.length > 0 && <JobList jobs={list} />}
          </div>
        </>
      )}
      {showCreateJobForm && (
        <CreateJobFormWrapper onClose={() => toggleCreateJobForm(false)} />
      )}
    </>
  );
};

export default JobListWrapper;
