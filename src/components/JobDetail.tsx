import { TJob } from "./types";
import "tailwindcss/tailwind.css";
import Logo from "../assets/images/Netflix.png";
import { APPLY_TYPE } from "../appConstants";
import { useState } from "react";
import CreateJobFormWrapper from "./CreateJobFormWrapper";
import { useJobDispatchContext } from "../modules/job";
import { deleteJob } from "../modules/job/reducer";
import { toast } from "react-toastify";
import { deleteJobReq } from "./api/job";

const JobDetailCard: React.FC<{ job: TJob }> = ({ job }) => {
  const {
    id,
    title,
    companyName,
    industry,
    location,
    remoteType,
    minExperience,
    maxExperience,
    minSalary,
    maxSalary,
    totalEmployee,
  } = job;

  const [edit, setEdit] = useState(false);
  const dispatch = useJobDispatchContext();

  const deleteJob1 = () => {
    deleteJobReq(id)
      .then(() => {
        dispatch(deleteJob(id));
        toast("Job is deleted successfully");
      })
      .catch(() => {
        toast("Error in deleting job");
      });
  };

  return (
    <div className="rounded-md p-4 bg-white h-80">
      <div className="flex justfiy-between">
        <div className="mr-2">
          <img className="bg-black w-10 h-12" src={Logo} alt={"logo"} />
        </div>
        <div className="w-9/12">
          <p className="font-normal text-2xl leading-8">{title}</p>
          <p className="text-base">
            {companyName}- {industry}
          </p>
          <p className="text-[#7A7A7A]">
            {location} ({remoteType})
          </p>
          <div className="my-6 text=[#212427]">
            <p>Part-Time (9.00 am - 5.00 pm IST)</p>
            <p className="mt-2">
              Experience ({minExperience} - {maxExperience} years)
            </p>
            <p className="mt-2">
              INR (₹) {minSalary} - {maxSalary} / Month
            </p>
            <p className="mt-2">
              {totalEmployee}-{Number(totalEmployee) + 200} employees
            </p>
          </div>
          {job.applyType === APPLY_TYPE.QUICK_APPLY ? (
            <button className="bg-[#1597E4] h-10 px-4 py-2 rounded-lg text-white mr-6">
              Apply Now
            </button>
          ) : (
            <button className="bg-white h-10 px-4 py-2 rounded-lg text-[#1597E4] border border-[#1597E4]">
              External Apply
            </button>
          )}
        </div>
        {/* Actions */}
        <div className="ml-24 text-gray-500 flex flex-row items-start">
          <button
            className="mr-2 hover:text-red-700"
            onClick={() => setEdit(true)}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button className="hover:text-red-700" onClick={() => deleteJob1()}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      {edit && <CreateJobFormWrapper onClose={() => setEdit(false)} id={id} />}
    </div>
  );
};

export default JobDetailCard;
