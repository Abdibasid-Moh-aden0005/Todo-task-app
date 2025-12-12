import AddTaskPage from "./pages/AddTaskPage";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AddTask" element={<AddTaskPage />} />
      </Routes>
    </div>
  );
};

export default App;
