import React, { useContext } from "react";
import Layout from "../../layout";
import { AdminCard } from "../../components";
import { BsFileEarmark } from "react-icons/bs";
import {
  GiChemicalDrop,
  GiNurseFemale,
  GiPerson,
  GiTestTubes,
} from "react-icons/gi";
import {
  AiFillCar,
  AiFillMedicineBox,
  AiOutlineExperiment,
  AiOutlineSchedule,
} from "react-icons/ai";
import WelcomeBoard from "../../components/Welcome board";
import { PrivatePaths } from "../../routes/path";
import { AuthContext } from "../../context";
import {
  AllChecklist,
  AllCollector,
  AllDispatch,
  AllDoc,
  AllLab,
  AllPatient,
  AllSample,
  AllUsers,
  CompletedOrder,
  ReqComp,
  ReqPend,
  ReqTotal,
  SampleTaken,
  TotalLab,
  useAllTest,
} from "../../utils/filter";
import { AiOutlineCheckSquare } from "react-icons/ai";

import { FaUserInjured, FaUserMd } from "react-icons/fa";
import {
  CompletedAppoints,
  PendingAppoints,
  TestCompleted,
  TotalAppoints,
  
} from "./Hooks";
import { LabAvailableTest, LabCompleted, LabPending } from "../Lab/hooks";
import {
  DispatchAvailable,
  DispatchPending,
  TotalOrder,
} from "../Dispatcher/hooks";
import {
  CollectorAvailable,
  CollectorCompleted,
  CollectorPending,
  TotalConsultation,
} from "../Collector/Hooks";

const Patient = () => {
  const { user } = useContext(AuthContext);

  //For all Roles
  const Docs = AllDoc({ propId: 123 });
  const Dispatch = AllDispatch({ propId: 123 });
  const Lab = AllLab({ propId: 123 });
  const Pat = AllPatient({ propId: 123 });
  const Coll = AllCollector({ propId: 123 });
  const AllUse = AllUsers({ propId: 123 });
  const Checks = AllChecklist();
  const Sample = AllSample();
  const AllTests = useAllTest();

  // For the Admin
  const GetPending = PendingAppoints();
  const GetTotal = TotalAppoints();
  const GetCompleted = CompletedAppoints();
  

  // For the Requester
  const RequesterComp = ReqComp();
  const RequesterTotal = ReqTotal();
  const RequesterPend = ReqPend();

  // For the Doctor
  const DoctorTotal = TotalConsultation();
  const DoctorPend = TestCompleted()
  // For the Sample Collection Expert
  const PendColl = CollectorPending();
  const CompColl = CollectorCompleted();
  const AvailColl = CollectorAvailable();

  const SampleTak = SampleTaken();

  // New Lab endpoints
  const availTest = LabAvailableTest();
  const LabComplete = LabCompleted();
  const LabPend = LabPending();
  const LabTotal = TotalLab();

  // For the Medical Dispatcher
  const TotalOrd = TotalOrder();
  const PendOrd = DispatchPending();
  const CompOrd = CompletedOrder();
  const AvailOrd = DispatchAvailable();
 

  return (
    <Layout name="Dashboard" title="Dashboard">
      <div className="welcome_container">
        <WelcomeBoard />
      </div>
      <div className="cardFlex">
        {user?.role === "Admin" ? (
          <>
            <AdminCard
              title={"Total Appointment"}
              total={GetTotal?.total || 0}
              Icon={AiOutlineSchedule}
              color="cyan"
              colorInner="lightCyan"
              url={`${PrivatePaths.ADMIN}/admin/test/all`}
            />
            <AdminCard
              title={"Pending Appointment"}
              total={GetPending?.total || 0}
              Icon={AiOutlineSchedule}
              color="gold"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/admin/appointment/pending`}
            />
            <AdminCard
              title={"Completed Appointment"}
              total={GetCompleted?.total || 0}
              Icon={AiOutlineSchedule}
              color="green"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/admin/appointment/completed`}
            />
            <AdminCard
              title={"Total Test"}
              total={AllTests?.total || 0}
              Icon={GiTestTubes}
              color="cyan"
              colorInner="lightCyan"
              url={`${PrivatePaths.ADMIN}/admin/settings/test`}
            />
            

            <AdminCard
              title={"Total Checklists"}
              total={Checks?.total || 0}
              Icon={AiOutlineCheckSquare}
              color="green"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/admin/settings/checklist`}
            />

            <AdminCard
              title={"Total Samples"}
              total={Sample?.total || 0}
              Icon={GiChemicalDrop}
              color="cyan"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/admin/settings/sample`}
            />

            <AdminCard
              title={"All Users"}
              total={AllUse?.total || 0}
              Icon={GiPerson}
              color="cyan"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/admin/users/all`}
            />

            <AdminCard
              title={"All Labs"}
              total={Lab?.total || 0}
              Icon={AiFillMedicineBox}
              color="cyan"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/admin/users/labs`}
            />

            <AdminCard
              title={"All Sample Collectors"}
              total={Coll?.total || 0}
              Icon={GiNurseFemale}
              color="green"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/admin/users/collectors`}
            />

            <AdminCard
              title={"All Patients"}
              total={Pat?.total || 0}
              Icon={FaUserInjured}
              color="cyan"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/admin/users/patients`}
            />

            <AdminCard
              title={"All Dispatchers"}
              total={Dispatch?.total || 0}
              Icon={AiFillCar}
              color="cyan"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/admin/users/dispatchers`}
            />

            <AdminCard
              title={"All Doctors"}
              total={Docs?.total || 0}
              Icon={FaUserMd}
              color="green"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/admin/users/doctors`}
            />
          </>
        ) : user?.role === "Doctor" ? (
          <>
            {/* <AdminCard
              title={"Total Consultation"}
              total={DoctorTotal?.total || 0}
              Icon={AiOutlineSchedule}
              color="cyan"
              colorInner="lightCyan"
              url={`${PrivatePaths.ADMIN}/doctor/consultations/all`}
            /> */}
            <AdminCard
              title={"Pending Consultation"}
              total={DoctorPend?.total || 0}
              Icon={AiOutlineSchedule}
              color="gold"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/doctor/consultations/pending`}
            />

            <AdminCard
              title={"Completed Consultation"}
              total={DoctorTotal?.total || 0}
              Icon={AiOutlineSchedule}
              color="green"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/doctor/consultations/completed`}
            />
          </>
        ) : user?.role === "SampleCollectionExpert" ? (
          <>
            {" "}
            <AdminCard
              title={"Sample Taken"}
              total={SampleTak?.total || 0}
              Icon={GiTestTubes}
              color="cyan"
              colorInner="lightCyan"
              url={`${PrivatePaths.ADMIN}/collector/collection/all`}
            />
            <AdminCard
              title={"Pending Collection"}
              total={PendColl?.total || 0}
              Icon={AiOutlineExperiment}
              color="gold"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/collector/collection/pending`}
            />
            <AdminCard
              title={"Collection Completed"}
              total={CompColl?.total || 0}
              Icon={BsFileEarmark}
              color="green"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/collector/collection/completed`}
            />
            <AdminCard
              title={"Available Collection"}
              total={AvailColl?.total || 0}
              Icon={BsFileEarmark}
              color="purple"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/collector/appointment/available`}
            />
          </>
        ) : user?.role === "Lab" ? (
          <>
            {" "}
            <AdminCard
              title={"Test Taken"}
              total={LabTotal?.total || 0}
              Icon={GiTestTubes}
              color="cyan"
              colorInner="lightCyan"
              url={`${PrivatePaths.ADMIN}/lab/test/all`}
            />
            <AdminCard
              title={"Pending Result"}
              total={LabPend?.total || 0}
              Icon={AiOutlineExperiment}
              color="gold"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/lab/test/pending`}
            />
            <AdminCard
              title={"Test Completed"}
              total={LabComplete?.total || 0}
              Icon={BsFileEarmark}
              color="green"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/lab/test/completed`}
            />
            <AdminCard
              title={"Available Test"}
              total={availTest?.total || 0}
              Icon={BsFileEarmark}
              color="purple"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/lab/order/available`}
            />
          </>
        ) : user?.role === "MedicalDispatcher" ? (
          <>
            {" "}
            <AdminCard
              title={"Total Order"}
              total={TotalOrd?.total || 0}
              Icon={AiFillCar}
              color="cyan"
              colorInner="lightCyan"
              url={`${PrivatePaths.ADMIN}/dispatcher/order/all`}
            />
            <AdminCard
              title={"Pending Order"}
              total={PendOrd?.total || 0}
              Icon={AiOutlineExperiment}
              color="gold"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/dispatcher/order/pending`}
            />
            <AdminCard
              title={"Completed Order"}
              total={CompOrd?.total || 0}
              Icon={BsFileEarmark}
              color="green"
              colorInner="lightCyan"
              url={`${PrivatePaths.ADMIN}/dispatcher/order/completed`}
            />
            <AdminCard
              title={"Available Order"}
              total={AvailOrd?.total || 0}
              Icon={BsFileEarmark}
              color="purple"
              colorInner="lightGold"
              url={`${PrivatePaths.ADMIN}/dispatcher/order/available`}
            />
          </>
        ) : (
          <>
            {" "}
            <AdminCard
              title={"Total Appointments"}
              total={RequesterTotal?.total || 0}
              Icon={AiOutlineSchedule}
              color="cyan"
              colorInner="lightCyan"
              url={`${PrivatePaths.ADMIN}/patient/test/all`}
            />
            <AdminCard
              title={"Pending Appointments"}
              total={RequesterPend?.total || 0}
              Icon={AiOutlineSchedule}
              color="gold"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/patient/test/pending`}
            />
            <AdminCard
              title={"Completed Appointments"}
              total={RequesterComp?.total || 0}
              Icon={AiOutlineSchedule}
              color="green"
              colorInner="lightGreen"
              url={`${PrivatePaths.ADMIN}/patient/test/completed`}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Patient;
