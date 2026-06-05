import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../store/toastSlice";

function Toast() {
  const { show, message } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed top-20 right-10 z-50">
      <div className="bg-green-500 text-white px-4 py-2 rounded-xl shadow-2xl text-sm font-semibold animate-bounce">
        ✔ {message}
      </div>
    </div>
  );
}

export default Toast;