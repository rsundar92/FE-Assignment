import "./App.css";
import JobListWrapper from "./components/JobListWrapper";
import "tailwindcss/tailwind.css";
import JobContextProvider from "./modules/job";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-[#D8D8D8] p-8">
      <ToastContainer />
      <JobContextProvider>
        <JobListWrapper />
      </JobContextProvider>
    </div>
  );
}

export default App;
