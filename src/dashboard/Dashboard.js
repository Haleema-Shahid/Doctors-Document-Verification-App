import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "../variables/chart";

// top 4 line graphs
function CubeCard({ color, chartData, chartOptions, number, text }) {
  return (
    <Card
      className="card-chart"
      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
    >
      <CardBody>
        <FontAwesomeIcon icon="fa-light fa-cube" />

        <div className="text-small">{number}</div>
        {/* Number below the cube */}
        <div className="text-small">{text}</div>
        {/* Text below the number */}
        <div className="chart-area" style={{ marginBottom: "-15px" }}>
          {/* Your line chart */}
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
          40000, 25000, 47000, 40000, 50000, 48000, 45000, 52000, 48000, 50000,
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
          30000, 20000, 40000, 36000, 45000, 42000, 39000, 44000, 41000, 43000,
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
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Verification Fees collected</CardTitle>
        <Col className="text-right">
          <div className="text-small">
            <span style={{ marginRight: "10px" }}>This Month</span>
            <span>Last Month</span>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                marginTop: "5px", // Adjust the margin as needed
              }}
            >
              <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                $86,589
              </span>
              <span style={{ marginLeft: "12px" }}>$73,683</span>
            </div>
          </div>
        </Col>
      </CardHeader>
      <CardBody>
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
  cutout: "93%", // Adjust the size of the circle
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};
function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  return (
    <>
      <div
        className="content"
        style={{ marginTop: "30px", marginLeft: "20px", marginRight: "20px" }}
      >
        <Row></Row>
        <Row>
          <Col lg="3">
            <CubeCard
              color="#FF5733"
              chartData={chartExample2.data}
              chartOptions={chartExample2.options}
              number={620}
              text="Applications Recieved"
            />
          </Col>
          <Col lg="3">
            <CubeCard
              color="#FF5733"
              chartData={chartExample3.data}
              chartOptions={chartExample3.options}
              number={520}
              text="Verified Applications"
            />
          </Col>
          <Col lg="3">
            <CubeCard
              color="#FF5733"
              chartData={chartExample4.data}
              chartOptions={chartExample4.options}
              number={25}
              text="Irregular Applications"
            />
          </Col>
          <Col lg="3">
            <CubeCard
              color="#FF5733"
              chartData={chartExample1.data1}
              chartOptions={chartExample1.options}
              number={9000}
              text="Rejected Applications"
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          {/* <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Tasks(5)</h6>
                <p className="card-category d-inline"> today</p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Update the Documentation</p>
                          <p className="text-muted">
                            Dwuamish Head, Seattle, WA 8:47 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">GDPR Compliance</p>
                          <p className="text-muted">
                            The GDPR is a regulation that requires businesses to
                            protect the personal data and privacy of Europe
                            citizens for transactions that occur within EU
                            member states.
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip457194718"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Solve the issues</p>
                          <p className="text-muted">
                            Fifty percent of all respondents said they would be
                            more likely to shop at a company
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip362404923"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip362404923"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Release v2.0.0</p>
                          <p className="text-muted">
                            Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip818217463"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip818217463"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Export the processed files</p>
                          <p className="text-muted">
                            The report also shows that consumers will not easily
                            forgive a company once a breach exposing their
                            personal data occurs.
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip831835125"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip831835125"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Arival at export process</p>
                          <p className="text-muted">
                            Capitol Hill, Seattle, WA 12:34 AM
                          </p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip217595172"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip217595172"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col> */}
          <Col lg="6" md="12">
            <VerificationFeesCard />
          </Col>
          {/* <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-center">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col> */}
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Verification Overview</CardTitle>
              </CardHeader>
              <CardBody>
                <div style={{ position: "relative", textAlign: "center" }}>
                  <Doughnut data={graphData} options={graphOptions} />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#4caf50", // Green color
                    }}
                  >
                    83%
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderTop: "none",
                      borderRight: "none",
                      padding: "10px",
                    }}
                  >
                    Completed
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      51,032
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderTop: "none",
                      borderRight: "none",
                      padding: "10px",
                    }}
                  >
                    In Progress
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      3,561
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      border: "1px solid #ccc",
                      borderTop: "none",
                      padding: "10px",
                    }}
                  >
                    Irregular
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      13,651
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          );
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
