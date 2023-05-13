import {
  Dispatch,
  createContext,
  useReducer,
  useContext,
  ReactNode,
} from "react";
import reducer, { initialState } from "./reducer";
import { JobState, JobAction } from "./type";

type StateContext = {
  state: JobState;
};

type DispatchContext = {
  dispatch: Dispatch<JobAction>;
};

const JobStateContext = createContext<StateContext | undefined>(undefined);

const JobDispatchContext = createContext<DispatchContext | undefined>(
  undefined
);

const JobContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <JobDispatchContext.Provider value={{ dispatch }}>
      <JobStateContext.Provider value={{ state }}>
        {children}
      </JobStateContext.Provider>
    </JobDispatchContext.Provider>
  );
};

export default JobContextProvider;

export const useJobStateContext = () => {
  const context = useContext(JobStateContext);
  if (!context) {
    throw new Error(
      "useJobStateContext should be wrapped under Job Context provider"
    );
  }
  const { state } = context;
  return { ...state };
};

export const useJobDispatchContext = () => {
  const dispatchContext = useContext(JobDispatchContext);
  if (!dispatchContext) {
    throw new Error(
      "useJobDispatchContext should be wrapped under Job Context provider"
    );
  }
  const { dispatch } = dispatchContext;
  return dispatch;
};
