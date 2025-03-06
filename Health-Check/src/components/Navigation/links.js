import {
  BiHomeAlt,
  BiTestTube,
  BiCalendarCheck,
  BiCollection,
  BiPackage,
  BiTime,
  BiHealth,
} from "react-icons/bi";
import { FaFileArchive, FaCogs, FaUsers } from "react-icons/fa";
import {
  AiFillBank,
  AiOutlineCheckSquare,
  AiOutlineUser,
} from "react-icons/ai";
import { GoBeaker } from "react-icons/go";

export const userLinks = [
  {
    route: "/app/dashboard",
    name: "Dashboard",
    Icon: BiHomeAlt,
    allowed: [
      "Requester",
      "Doctor",
      "Lab",
      "MedicalDispatcher",
      "SampleCollectionExpert",
      "Admin",
    ],
  },
  {
    route: "/app/profile",
    name: "Profile",
    Icon: AiOutlineUser,
    allowed: [
      "Requester",
      "Doctor",
      "Lab",
      "MedicalDispatcher",
      "SampleCollectionExpert",
      "Admin",
    ],
  },

  {
    route: "/app/admin/appointment",
    name: "Appointment",
    Icon: FaFileArchive,
    allowed: ["Admin"],
    children: [
      {
        route: "/app/admin/test/all",
        name: "All Appointment",
        Icon: BiTestTube,
        allowed: ["Admin"],
      },
      
      {
        route: "/app/admin/appointment/pending",
        name: "Pending Appointment",
        Icon: FaFileArchive,
        allowed: ["Admin"],
      },
      {
        route: "/app/admin/appointment/completed",
        name: "Completed Appointment",
        Icon: FaFileArchive,
        allowed: ["Admin"],
      },
    ],
  },
  {
    route: "/app/admin/settings",
    name: "Settings",
    Icon: FaCogs,
    allowed: ["Admin"],
    children: [
      {
        route: "/app/admin/settings/checklist",
        name: "Checklist",
        Icon: AiOutlineCheckSquare,
        allowed: ["Admin"],
      },
      {
        route: "/app/admin/settings/sample",
        name: "Sample",
        Icon: GoBeaker,
        allowed: ["Admin"],
      },
      {
        route: "/app/admin/settings/test",
        name: "Test",
        Icon: BiTestTube,
        allowed: ["Admin"],
      },
    ],
  },
  {
    route: "/app/admin/users",
    name: "Users",
    Icon: FaUsers,
    allowed: ["Admin"],
    children: [
      {
        route: "/app/admin/users/all",
        name: "All Users",
        Icon: FaUsers,
        allowed: ["Admin"],
      },
      {
        route: "/app/admin/users/patients",
        name: "Patients",
        Icon: FaUsers,
        allowed: ["Admin"],
      },
      {
        route: "/app/admin/users/collectors",
        name: "Sample Collectors",
        Icon: FaUsers,
        allowed: ["Admin"],
      },
      {
        route: "/app/admin/users/dispatchers",
        name: "Medical Dispatchers",
        Icon: FaUsers,
        allowed: ["Admin"],
      },
      {
        route: "/app/admin/users/doctors",
        name: "Doctors",
        Icon: FaUsers,
        allowed: ["Admin"],
      },
      {
        route: "/app/admin/users/labs",
        name: "All Labs",
        Icon: FaUsers,
        allowed: ["Admin"],
      },
    ],
  },

  {
    route: "/app/patient/appointment",
    name: "Test",
    Icon: BiTestTube,
    allowed: ["Requester"],
    children: [
      {
        route: "/app/patient/test/all",
        name: "All Test",
        Icon: BiTestTube,
        allowed: ["Requester"],
      },

      {
        route: "/app/patient/test/pending",
        name: "Pending Test",
        Icon: BiTestTube,
        allowed: ["Requester"],
      },
      {
        route: "/app/patient/test/completed",
        name: "Completed Test",
        Icon: BiTestTube,
        allowed: ["Requester"],
      },
    ],
  },

  {
    route: "/app/doctor/consultations",
    name: "Consultations",
    Icon: BiTime,
    allowed: ["Doctor"],
    children: [
      // {
      //   route: "/app/doctor/consultations/all",
      //   name: "Total Consults",
      //   Icon: BiTime,
      //   allowed: ["Doctor"],
      // },
      {
        route: "/app/doctor/consultations/pending",
        name: "Pending Consults",
        Icon: BiTime,
        allowed: ["Doctor"],
      },
      {
        route: "/app/doctor/consultations/completed",
        name: "Completed Consults",
        Icon: BiTime,
        allowed: ["Doctor"],
      },
    ],
  },
  {
    route: "/app/admin/audit",
    name: "Audit",
    Icon: AiFillBank,
    allowed: ["Admin"],
  },
  {
    route: "/app/patient/appointment",
    name: "Appointment",
    Icon: BiCalendarCheck,
    allowed: ["Requester"],
  },
  {
    route: "/app/collector/appointment/available",
    name: "Appointment",
    Icon: BiCalendarCheck,
    allowed: ["SampleCollectionExpert"],
  },
  {
    route: "/app/dispatcher/order/available",
    name: "Available Orders",
    Icon: BiPackage,
    allowed: ["MedicalDispatcher"],
  },
  {
    route: "/app/lab/order/available",
    name: "Available Labs",
    Icon: BiHealth,
    allowed: ["Lab"],
  },

  {
    route: "/app/collector/collection",
    name: "Collections",
    Icon: BiCollection,
    allowed: ["SampleCollectionExpert"],
    children: [
      {
        route: "/app/collector/collection/all",
        name: "Total Collections",
        Icon: BiCollection,
        allowed: ["SampleCollectionExpert"],
      },
      {
        route: "/app/collector/collection/pending",
        name: "Pending Collections",
        Icon: BiCollection,
        allowed: ["SampleCollectionExpert"],
      },
      {
        route: "/app/collector/collection/completed",
        name: "Completed Collections",
        Icon: BiCollection,
        allowed: ["SampleCollectionExpert"],
      },
    ],
  },
  {
    route: "/app/dispatcher/order",
    name: "Orders",
    Icon: BiPackage,
    allowed: ["MedicalDispatcher"],
    children: [
      {
        route: "/app/dispatcher/order/all",
        name: "Total Orders",
        Icon: BiPackage,
        allowed: ["MedicalDispatcher"],
      },
      {
        route: "/app/dispatcher/order/pending",
        name: "Pending Orders",
        Icon: BiPackage,
        allowed: ["MedicalDispatcher"],
      },
      {
        route: "/app/dispatcher/order/completed",
        name: "Completed Orders",
        Icon: BiPackage,
        allowed: ["MedicalDispatcher"],
      },
    ],
  },
  {
    route: "/app/lab/test",
    name: "Tests",
    Icon: BiTestTube,
    allowed: ["Lab"],
    children: [
      {
        route: "/app/lab/test/all",
        name: "Total Tests",
        Icon: BiTestTube,
        allowed: ["Lab"],
      },
      {
        route: "/app/lab/test/pending",
        name: "Pending Tests",
        Icon: BiTestTube,
        allowed: ["Lab"],
      },
      {
        route: "/app/lab/test/completed",
        name: "Completed Tests",
        Icon: BiTestTube,
        allowed: ["Lab"],
      },
    ],
  },
];
