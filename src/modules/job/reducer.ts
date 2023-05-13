import { Reducer, Dispatch } from "react";
import {
  IsFetching,
  JobState,
  JobAction,
  ReceiveJobs,
  ReceiveJob,
  UpdateJob,
  DeleteJob,
} from "./type";
import { TJob } from "../../components/types";
import { toast } from "react-toastify";
import { retrieveJobs } from "../../components/api/job";
import {
  DELETE_JOB,
  IS_FETCHING,
  RECEIVE_JOB,
  RECEIVE_JOBS,
  UPDATE_JOB,
} from "../../appConstants";

export const initialState: JobState = {
  isFetching: false,
  list: [],
  error: { code: 0, message: "" },
};

const reducer: Reducer<JobState, JobAction> = (state, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_JOBS:
      return {
        ...state,
        list: action.jobs,
        isFetching: false,
      };
    case RECEIVE_JOB:
      return {
        ...state,
        list: [...state.list, action.job],
        isFetching: false,
      };
    case UPDATE_JOB:
      return {
        ...state,
        list: state.list.map((job) => {
          return job.id === action.job.id ? action.job : job;
        }),
        isFetching: false,
      };
    case DELETE_JOB:
      return {
        ...state,
        list: state.list.filter((job) => job.id !== action.id),
        isFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;

export const isFetching = (): IsFetching => ({
  type: IS_FETCHING,
});

export const receiveJobs = (jobs: TJob[]): ReceiveJobs => ({
  type: RECEIVE_JOBS,
  jobs,
});

export const receiveJob = (job: TJob): ReceiveJob => ({
  type: RECEIVE_JOB,
  job,
});

export const updateJob = (job: TJob): UpdateJob => ({
  type: UPDATE_JOB,
  job,
});

export const deleteJob = (id: string): DeleteJob => ({
  type: DELETE_JOB,
  id,
});

export const fetchJobs = () => (dispatch: Dispatch<JobAction>) => {
  dispatch(isFetching());
  return retrieveJobs()
    .then((data) => {
      dispatch(receiveJobs(data?.data));
    })
    .catch((err) => {
      console.error(err);
      toast("Error in fetching jobs");
    });
};
