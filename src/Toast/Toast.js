import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export function successToast(message) {
  toast.success(message, { ...defaultToastOptions });
}

export function errorToast(message) {
  toast.error(message, {
    ...defaultToastOptions,
  });
}

export function warningToast(message) {
  toast.warning(message, {
    ...defaultToastOptions,
  });
}

export function infoToast(message) {
  toast.info(message, {
    ...defaultToastOptions,
  });
}
