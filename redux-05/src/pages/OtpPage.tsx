
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  otpStart,
  otpSubmitRequest,
} from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function OtpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showTimeoutModal, setShowTimeoutModal] = useState(false);

  const { otpStatus, otpError } = useSelector(
    (state: any) => state.auth
  );

  const [otp, setOtp] = useState("");

  useEffect(() => {
    dispatch(otpStart());
  }, [dispatch]);

  useEffect(() => {
    if (otpStatus === "success") {
      navigate("/dashboard");
    }

    if (otpStatus === "timeout") {
  setShowTimeoutModal(true);
}
  }, [otpStatus, navigate]);

  const handleVerify = () => {
    dispatch(otpSubmitRequest(otp));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          OTP Verification
        </h2>

        <p className="text-sm text-gray-500 mb-4 text-center">
          Enter OTP within 3 seconds
        </p>

        {otpError && (
          <p className="text-red-600 text-sm mb-3">
            {otpError}
          </p>
        )}

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Verify OTP
        </button>

      </div>

      
{showTimeoutModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">

      <h3 className="text-lg font-semibold mb-3">
        OTP Expired
      </h3>

      <p className="text-sm text-gray-600 mb-5">
        You did not enter OTP within 5 seconds.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Back to Login
      </button>

    </div>
  </div>
)}


    </div>
  );
}

export default OtpPage;
