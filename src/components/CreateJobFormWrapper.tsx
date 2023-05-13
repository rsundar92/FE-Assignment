import { useEffect, useState } from "react";
import CreateJobForm from "./CreateJobForm";
import { TJob } from "./types";
import { toast } from "react-toastify";
import { retrieveJobReq } from "./api/job";

const CreateJobFormWrapper: React.FC<{
  onClose: () => void;
  id?: string;
}> = ({ onClose, id }) => {
  const [jobDetail, setJobDetail] = useState<TJob | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    retrieveJobReq(id)
      .then((data) => {
        setJobDetail(data?.data);
      })
      .catch((err) => {
        console.error(err);
        toast("Error in getting job detail");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {(!loading || !id) && (
        <CreateJobForm onClose={onClose} jobDetail={jobDetail} />
      )}
    </div>
  );
};

export default CreateJobFormWrapper;
