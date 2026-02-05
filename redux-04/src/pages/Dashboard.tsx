
import { useDispatch } from "react-redux";
import { loginFailure, logoutRequest  } from "../store/authSlice";

function Dashboard() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Dashboard
        </h1>

        <p className="mb-6 text-gray-600">
          Login successful ✅
        </p>

        <button
  onClick={() => dispatch(logoutRequest())}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout (demo)
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
