import "./dashboard.scss";
import { FilterRepo, Home, Latest } from "../../Components";

export const Dashboard = () => {
  return (
    <section className="dashboard">
      <div className="dashboard__inner">
        <FilterRepo />
        <Home/>
        <Latest/>
      </div>
    </section>
  );
};
