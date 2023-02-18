import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";
import AddCity from "./AddCity";
import DashboardHeader from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import ErrorMessage from "./ErrorMessage";

const Dashboard = ({ weatherData, errMessage }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <AddCity />

      <div className="weather-data-box">
        {weatherData.length != 0 ? (
          weatherData.map((val, idx) => {
            return (
              <div
                key={idx}
                className="box-size"
                onClick={() => navigate(`/view-weather/${val.id}`)}
              >
                <DashboardHeader val={val} />
                <DashboardFooter val={val} />
              </div>
            );
          })
        ) : (
          <ErrorMessage errMessage={errMessage} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
