import { ToastOptions } from "react-toastify";

export const containerTitleStyles = {
  color: "#0d1148",
  fontWeight: 700,
  fontSize: "16px",
};

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const toastOptions: ToastOptions = {
  hideProgressBar: true,
  pauseOnHover: true,
  autoClose: 3000,
  toastId: "no-duplicate",
};
