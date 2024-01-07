import React, { useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./Dashboard.css";
import Icon from "@mdi/react";
import { mdiCubeOutline } from "@mdi/js";

import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "../variables/chart";

import Header from "../header/header";
import { useNavigate } from "react-router-dom";

// top 4 line graphs
function CubeCard({ color, chartData, chartOptions, number, text }) {
  return (
    <Card
      className="card-chart"
      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
    >
      <CardBody>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color, // Use the color prop for the circle background
            borderRadius: "50%", // Make it a circle
            width: "40px", // Set the desired width
            height: "40px", // Set the desired height
            marginTop: "15px",
            marginLeft: "10px",
          }}
        >
          <Icon path={mdiCubeOutline} size={1} color="#FFFFFF" />{" "}
          {/* Set the icon color to white */}
        </div>

        <div
          className="text-large"
          style={{
            marginTop: "10px",
            marginLeft: "10px",
            fontWeight: "bold",
            color: "#524f53",
            fontSize: "22px",
          }}
        >
          {number}
        </div>

        <div
          className="text-medium"
          style={{ marginTop: "10px", marginLeft: "10px", color: "#524f53" }}
        >
          {text}
        </div>

        <div className="chart-area" style={{ marginBottom: "-15px" }}>
          <Line
            data={chartData}
            options={{
              ...chartOptions,
              elements: {
                line: {
                  tension: 0.4,
                },

                point: {
                  radius: 0,
                  hitRadius: 10,
                  pointStyle: false,
                },
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}

// bottom left line graph
function VerificationFeesCard() {
  const chartData = {
    labels: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
    datasets: [
      {
        label: "This Month",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
        lineTension: 0.4, // Adjust the line tension for a curvier line
        data: [
          40000, 36000, 47000, 40000, 50000, 48000, 45000, 52000, 48000, 50000,
        ],
      },
      {
        label: "Last Month",
        borderColor: "rgba(75,192,192,0.4)",
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        lineTension: 0.4,
        data: [
          30000, 27000, 40000, 36000, 45000, 42000, 39000, 44000, 41000, 43000,
        ],
      },
    ],
  };

  const chartOptions = {
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        pointStyle: false,
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}`,
        },
        grid: {
          display: false, // Hide the vertical grid lines
        },
      },
      y: {
        type: "linear",
        position: "left",
        ticks: {
          stepSize: 10000,
          max: 50000, // Adjust the maximum value for the Y-axis
          callback: (value) => `$${value}`,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Set the color for horizontal grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {
      backgroundColor: "#4848b0b3",
    },
  };

  return (
    <Card>
      <CardTitle
        tag="h4"
        style={{
          marginLeft: "30px",
          marginTop: "20px",
          color: "#524f53",
          fontWeight: "bold",
        }}
      >
        Verification Fees collected
      </CardTitle>
      <Col className="text-right">
        <div
          className="text-small"
          style={{ marginLeft: "30px", marginTop: "20px" }}
        >
          <span
            style={{
              marginLeft: "2px",
              marginRight: "18px",
              color: "#524f53",
              opacity: "0.8",
              fontWeight: "500",
            }}
          >
            This Month
          </span>
          <span style={{ color: "#524f53", opacity: "0.8", fontWeight: "500" }}>
            Last Month
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "5px", // Adjust the margin as needed
            }}
          >
            <span
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                fontSize: "20px",
                fontWeight: "bolder",
                color: "#524f53",
              }}
            >
              $
              <span
                style={{
                  color: "#4848b0b3",
                }}
              >
                86,589
              </span>
            </span>
            <span
              style={{
                marginLeft: "12px",
                fontSize: "20px",
                fontWeight: "bolder",
                color: "#524f53",
              }}
            >
              $73,683
            </span>
          </div>
        </div>
      </Col>

      <CardBody style={{ marginLeft: "20px" }}>
        <Line data={chartData} options={chartOptions} />
      </CardBody>
    </Card>
  );
}
// doughnut graph
const graphData = {
  labels: ["Completed"],
  datasets: [
    {
      data: [25, 15, 25, 40],
      backgroundColor: ["#4caf50", "#ffffff", "#ffffff", "#4caf50"],
    },
  ],
};

const graphOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  borderRadius: "0",
  radius: "85%",
  cutout: "85%", // Adjust the size of the circle
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  elements: {
    arc: {
      borderWidth: 0, // Set the border width to 0
    },
  },
};
function Dashboard(props) {
  const navigate = useNavigate();
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null || role === "client") {
      navigate("/chatbox");
    }
  }, [navigate]);
  const role = localStorage.getItem("role");
  if (role !== null && role !== "client") {
    return (
      <>
        <Header />
        <div
          className="content"
          style={{ marginTop: "30px", marginLeft: "20px", marginRight: "20px" }}
        >
          <Row></Row>
          <Row>
            <Col lg="3">
              <CubeCard
                color="#1d8cf899"
                chartData={chartExample2.data}
                chartOptions={chartExample2.options}
                number={620}
                text="Applications Recieved"
              />
            </Col>
            <Col lg="3">
              <CubeCard
                color="#4848b0b3"
                chartData={chartExample3.data}
                chartOptions={chartExample3.options}
                number={520}
                text="Verified Applications"
              />
            </Col>
            <Col lg="3">
              <CubeCard
                color="#00d6b4"
                chartData={chartExample4.data}
                chartOptions={chartExample4.options}
                number={25}
                text="Irregular Applications"
              />
            </Col>
            <Col lg="3">
              <CubeCard
                color="#1f8ef1"
                chartData={chartExample1.data1}
                chartOptions={chartExample1.options}
                number={9000}
                text="Rejected Applications"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col lg="7" md="11">
              <VerificationFeesCard />
            </Col>
            <Col lg="5" md="12">
              <Card>
                <CardTitle
                  tag="h4"
                  style={{
                    marginLeft: "30px",
                    marginTop: "20px",
                    color: "#524f53",
                    fontWeight: "bold",
                  }}
                >
                  Verification Overview
                </CardTitle>

                <CardBody>
                  <div style={{ position: "relative", textAlign: "center" }}>
                    <Doughnut
                      data={graphData}
                      options={graphOptions}
                      height={200}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "51%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#000000",
                        fontSize: "40px",
                        color: "#524f53",
                        opacity: "0.9",
                      }}
                    >
                      83%
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "20px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        justifyItems: "center",
                        border: "1px solid #ccc",
                        borderBottom: "none",
                        borderLeft: "none",
                        padding: "10px",
                        paddingLeft: "40px",
                        paddingRight: "60px",
                        borderTop: "none",
                        opacity: "0.7",
                      }}
                    >
                      Completed
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#524f53",
                          fontSize: "25px",
                        }}
                      >
                        51,032
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "center",

                        padding: "10px",
                        opacity: "0.7",
                      }}
                    >
                      In Progress
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#524f53",
                          fontSize: "25px",
                        }}
                      >
                        3,561
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        border: "1px solid #ccc",
                        borderBottom: "none",
                        borderRight: "none",
                        borderTop: "none",
                        padding: "10px",
                        paddingLeft: "60px",
                        paddingRight: "30px",
                        opacity: "0.7",
                      }}
                    >
                      Irregular
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          color: "#524f53",
                          fontSize: "25px",
                        }}
                      >
                        13,651
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  } else {
    navigate("/chatbox");
  }
}

export default Dashboard;
