import { useEffect } from "react";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../../helpers/myHelper";
import { clearToast } from "../../redux/slice/toastSlice";

function User() {
  const { message, type } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    // Show the toast notification if there is a message
    if (message) {
      showToast(message, type);
      dispatch(clearToast()); // Clear the toast after showing it
    }
  }, [message, type, dispatch]); // Removed setMessage from dependency array

  return (
    <div>User</div>
  );
}

export default User;
