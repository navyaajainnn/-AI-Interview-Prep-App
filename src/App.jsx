import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/landingpage";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/Interviewprep/interviewprep";

const App= () =>{
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/interview-prep/:sessionid" element={<InterviewPrep/>}/>

        </Routes>
      </Router>

      <Toaster
      toastOptions={{
        className:"",
        style:{
          frontSize:"13px",
        },
      }}
      />
    </div>
  )
}
export default App
