import axios from "axios";
import { BASE_URL } from "../../appConstants";
import { TJob } from "../types";

export const retrieveJobs = () => {
  return axios.get(`${BASE_URL}`);
};

export const retrieveJobReq = (id: string) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const createJobReq = (values: TJob) => {
  return axios.post(BASE_URL, {
    ...values,
  });
};

export const updateJobReq = (id: string, values: TJob) => {
  return axios.put(`${BASE_URL}/${id}`, {
    ...values,
  });
};

export const deleteJobReq = (id: string) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
