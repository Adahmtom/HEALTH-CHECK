export const BasePaths = {
  MAIN: "/app/dashboard",
};
export const PublicPaths = {
  HOME: "",
  LOGIN: "/login",
  REGISTER: "/register",
  DOCTOR_REG: "/register/doctor",
  LAB_REG: "/register/lab",
  COLLECTOR_REG: "register/collector",
  DISPATCHER_REG: "/register/dispatcher",
  FORGOT_PASSWORD: "/forgot-Password",
  RESET_PASSWORD: "/reset-Password/:id",
  UNAUTHORIZEd: "*",
};

export const PrivatePaths = {
  DOCTOR: "/Doctor",
  DISPATCHER: "/dispatcher",
  PATIENT: "/patient",
  LAB: "/lab",
  COLLECTOR: "/collector",
  ADMIN: "/app",
  MAIN: "/dashboard",
};
