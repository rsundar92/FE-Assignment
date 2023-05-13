import { Field, FormikProvider, useFormik } from "formik";
import SimpleInfoModal from "./Modal/SimpleInfoModal";
import { TextField } from "./formutils";
import { useState } from "react";
import { TJob } from "./types";
import { useJobDispatchContext } from "../modules/job";
import { receiveJob, updateJob } from "../modules/job/reducer";
import { toast } from "react-toastify";
import { createJobReq, updateJobReq } from "./api/job";
import { validate } from "./formutils/validate";

const CreateJobForm: React.FC<{
  onClose: () => void;
  jobDetail: TJob | undefined;
}> = ({ onClose, jobDetail }) => {
  const [isStep1Completed, setStep1Completed] = useState(false);
  const dispatch = useJobDispatchContext();

  const formik = useFormik<TJob>({
    initialValues: jobDetail || ({} as TJob),
    validate,
    onSubmit: (values: TJob) => {
      if (values.id) {
        updateJobReq(values.id, values)
          .then((data) => {
            dispatch(updateJob(data?.data));
            toast("Posted Job is updated successfully");
            onClose();
          })
          .catch((err) => {
            toast("Error in updating the posted job");
            console.error(err);
          });
      } else {
        createJobReq(values)
          .then((data) => {
            dispatch(receiveJob(data?.data));
            toast("New Job is posted successfully");
            onClose();
          })
          .catch((err) => {
            toast("Error in posting the job");
            console.error(err);
          });
      }
    },
  });

  const { submitForm, values, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <SimpleInfoModal onClose={() => onClose()}>
        {() => (
          <>
            <div>
              <div className="flex justify-between">
                <div className="text-xl mb-8 font-normal">Create a job</div>
                <div className="text-xl mb-8 font-normal">
                  {isStep1Completed ? "Step 2" : "Step 1"}
                </div>
              </div>
              {!isStep1Completed ? (
                <div>
                  <Field
                    placeholder="ex. UX UI Designer"
                    label="Job title"
                    name="title"
                    component={TextField}
                    required
                  />

                  <Field
                    placeholder="ex. Google"
                    label="Company name"
                    name="companyName"
                    component={TextField}
                    required
                  />

                  <Field
                    placeholder="ex. Information Technology "
                    label="Industry"
                    name="industry"
                    component={TextField}
                    required
                  />

                  <div className="flex justify-between">
                    <div className="w-2/4 mr-4">
                      <Field
                        placeholder="ex. Chennai"
                        label="Location"
                        name="location"
                        component={TextField}
                      />
                    </div>
                    <div className="w-2/4">
                      <Field
                        placeholder="ex. In-office"
                        label="Remote Type"
                        name="remoteType"
                        component={TextField}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between">
                    <div className="w-2/4 mr-4">
                      <Field
                        placeholder="Minimum"
                        label="Experience"
                        name="minExperience"
                        component={TextField}
                        type={"Number"}
                      />
                    </div>
                    <div className="w-2/4">
                      <Field
                        placeholder="Maximum"
                        name="maxExperience"
                        component={TextField}
                        type={"Number"}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-2/4 mr-4">
                      <Field
                        placeholder="Minimum"
                        label="Salary"
                        name="minSalary"
                        component={TextField}
                        type={"Number"}
                      />
                    </div>
                    <div className="w-2/4">
                      <Field
                        placeholder="Maximum"
                        name="maxSalary"
                        component={TextField}
                        type={"Number"}
                      />
                    </div>
                  </div>
                  <Field
                    placeholder="ex. 100"
                    label="Total employee"
                    name="totalEmployee"
                    component={TextField}
                    type={"Number"}
                  />
                  <div>
                    <div className="mb-1">
                      <label className="font-medium">Apply Type</label>
                    </div>
                    <div className="flex">
                      <div
                        className="mr-4"
                        onClick={() => {
                          setFieldValue("applyType", "quickApply");
                        }}
                      >
                        <input
                          type="radio"
                          className="mr-1"
                          checked={values.applyType === "quickApply"}
                          name="applyType"
                        />
                        <label className="ml-1 text-[#7A7A7A] font-normal">
                          Quick apply
                        </label>
                      </div>
                      <div
                        onClick={() => {
                          setFieldValue("applyType", "externalApply");
                        }}
                      >
                        <input
                          type="radio"
                          checked={values.applyType === "externalApply"}
                          name="applyType"
                        />
                        <label className="ml-1 text-[#7A7A7A] font-normal">
                          External apply
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (
                    !values.companyName ||
                    !values.industry ||
                    !values.title
                  ) {
                    submitForm();
                  } else {
                    isStep1Completed ? submitForm() : setStep1Completed(true);
                  }
                }}
                className="bg-[#1597E4] h-10 px-4 py-2 rounded-lg text-white mt-14"
              >
                {isStep1Completed ? "Save" : "Next"}
              </button>
              {isStep1Completed && (
                <button
                  onClick={() => setStep1Completed(false)}
                  className="bg-[#1597E4] h-10 px-4 py-2 rounded-lg text-white mt-24"
                >
                  {isStep1Completed && "Back"}
                </button>
              )}
            </div>
          </>
        )}
      </SimpleInfoModal>
    </FormikProvider>
  );
};

export default CreateJobForm;
