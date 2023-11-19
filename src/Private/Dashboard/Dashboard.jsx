import "./dashboard.scss";
import { FilterRepo, Home } from "../../Components";

export const Dashboard = () => {
  return (
    <section className="dashboard">
      <div className="dashboard__inner">
        <FilterRepo />
        <Home/>
      </div>
    </section>
  );
};
