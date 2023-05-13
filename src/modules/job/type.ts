import {
  DELETE_JOB,
  IS_FETCHING,
  RECEIVE_JOB,
  RECEIVE_JOBS,
  UPDATE_JOB,
} from "../../appConstants";
import { TJob } from "../../components/types";

export type ErrorState = {
  code: number;
  message: string;
};

export type IsFetching = {
  type: typeof IS_FETCHING;
};

export type ReceiveJobs = {
  type: typeof RECEIVE_JOBS;
  jobs: TJob[];
};

export type ReceiveJob = {
  type: typeof RECEIVE_JOB;
  job: TJob;
};

export type UpdateJob = {
  type: typeof UPDATE_JOB;
  job: TJob;
};

export type DeleteJob = {
  type: typeof DELETE_JOB;
  id: string;
};

export type JobAction =
  | IsFetching
  | ReceiveJobs
  | ReceiveJob
  | UpdateJob
  | DeleteJob;

export type JobState = {
  isFetching: boolean;
  list: TJob[];
  error: ErrorState;
};
