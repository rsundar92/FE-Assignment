export type TJob = {
  title: string;
  companyName: string;
  industry: string;
  location: string;
  remoteType: string;
  id: string;
  minExperience: number;
  maxExperience: number;
  minSalary: number;
  maxSalary: number;
  totalEmployee: number;
  applyType: "quickApply" | "externalApply";
};
