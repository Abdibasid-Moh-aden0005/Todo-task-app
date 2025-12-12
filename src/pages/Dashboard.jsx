import CompletedTask from "../components/CompletedTask";
import CurrentTask from "../components/CurrentTask";

const Dashboard = () => {
  return (
    <div>
      <CurrentTask />
      <CompletedTask />
    </div>
  );
};

export default Dashboard;
