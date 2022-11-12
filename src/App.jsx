import { Routes, Route, Link } from "react-router-dom";
import Error from "./pages/Error";
import Lab from "./pages/Lab";
import Project from "./pages/Project";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Success from "./pages/Success";
function App() {
  return (
    <div className="min-w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/projects/:projectId" element={<Project />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/lab" element={<Lab />} /> */}
        <Route path="/error" element={<Error />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
