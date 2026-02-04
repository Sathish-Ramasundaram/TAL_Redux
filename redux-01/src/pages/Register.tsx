import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../store/authSlice";
import { Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerRequest({ email }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white transition
            ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}
          `}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
