import { toast } from "react-toastify"

const showNotification = (message, type) =>  {
  toast(message, {type: type})
}

export default showNotification;