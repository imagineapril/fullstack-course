import { ToastContainer } from "react-toastify";

const Notification = () =>  {
  return (
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
  )
}

export default Notification;

