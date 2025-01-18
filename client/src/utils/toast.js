import { toast } from "react-toastify";

// export const initializeToast = () => {
//   toast.configure({
//     autoClose: 500, // Toast auto-close duration in ms
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "light",
//   });
// };

export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
  warning: (message) => toast.warn(message),
};
