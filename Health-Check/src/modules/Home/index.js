import React from "react";
import { Link } from "react-router-dom";
import { PublicPaths } from "../../routes/path";
import styles from "./styles.module.css";
import "../../shared/button.css";
import HealthCheckLogo from "../../assets/plus.png";
import CustomCard from "../../components/Proceed Card";

const Home = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.home}>
        <nav className={styles.homeNav}>
          <div></div>
          <div className={styles.admin} style={{ marginRight: "" }}>
            <Link to={"/login"}>Login</Link>
          </div>
        </nav>

        <main>
          <div className={styles.title}>
            <div className={styles.logo}>
              <img src={HealthCheckLogo} alt="aa-rano-logo" />
            </div>
            <h1>
              Remote
              <i
                style={{
                  marginLeft: "10px",
                  color: "#7DC7BA",
                  textDecoration: "italics",
                }}
              >
                Health
              </i>
              <br />
              Check
            </h1>
            <p>
              Test sample collection involves the systematic gathering of
              specimens or substances from individuals or the environment for
              analysis and examination. This process is crucial in various
              fields, such as healthcare, research, and diagnostics.{" "}
            </p>
          </div>
        </main>
      </div>
      <div className={styles.btnContainer}>
        <CustomCard
          title={"A Patient"}
          content={
            "Schedule an appointment get your collected and get your test results in a timely manner"
          }
          titleColor={"rgba(30, 158, 136, 1)"}
          registrationPath={PublicPaths.REGISTER}
        />
        <CustomCard
          title={"A Collector "}
          content={
            "Schedule an appointment get your collected and get your test results in a timely manner"
          }
          titleColor={"rgba(23, 102, 193, 1)"}
          role="Collector"
          registrationPath={PublicPaths.COLLECTOR_REG}
        />
        <CustomCard
          title={"A Dispatcher "}
          content={
            "Pick up and deliver samples to laboratories in a timely manner and get paid instantly"
          }
          titleColor={"rgba(255, 120, 45, 1)"}
          registrationPath={PublicPaths.DISPATCHER_REG}
        />
        <CustomCard
          title={"A Lab"}
          content={
            "Process the test samples delivered to your lab with little or no error and get paid once the process is completed"
          }
          titleColor={"rgba(92, 5, 144, 1)"}
          registrationPath={PublicPaths.LAB_REG}
        />
        <CustomCard
          title={"A Doctor"}
          content={
            "Review test results and advice on the best medical actions to take "
          }
          titleColor={"rgba(44, 148, 42, 1)"}
          registrationPath={PublicPaths.DOCTOR_REG}
        />
      </div>
    </div>
  );
};

export default Home;
