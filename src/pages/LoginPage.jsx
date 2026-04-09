import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [errors, setErrors]       = useState({});
  const [authError, setAuthError] = useState("");

  const validate = () => {
    const err = {};
    if (!email.includes("@")) err.email    = true;
    if (!password.trim())     err.password = true;
    setErrors(err);
    return !Object.keys(err).length;
  };

  const handleLogin = () => {
    setAuthError("");
    if (!validate()) return;
    const error = login(email, password);
    if (error) { setAuthError(error); return; }
    navigate("/account");
  };

  const ready = email.trim() && password.trim();

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-2">
          Signin to your<br />PopX account
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <FloatingInput
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setAuthError(""); }}
            required
            error={errors.email}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">Enter a valid email</p>}
        </div>
        <div>
          <FloatingInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setAuthError(""); }}
            required
            error={errors.password}
          />
          {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">Password is required</p>}
        </div>

        {authError && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <p className="text-red-500 text-sm font-medium">{authError}</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogin}
          disabled={!ready}
          className={`w-full py-4 rounded-lg font-semibold text-sm transition-colors ${
            ready
              ? "bg-violet-600 text-white hover:bg-violet-700"
              : "bg-gray-300 text-gray-400 cursor-not-allowed"
          }`}
        >
          Login
        </button>
      </div>
    </div>
  );
}
