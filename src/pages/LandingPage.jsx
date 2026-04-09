import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-gray-100 flex flex-col overflow-hidden">
      <div className="relative z-10 mt-auto px-6 pb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to PopX</h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="w-full bg-violet-600 text-white py-4 rounded-lg font-semibold text-sm mb-3 hover:bg-violet-700 transition-colors"
        >
          Create Account
        </button>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-violet-200 text-violet-700 py-4 rounded-lg font-semibold text-sm hover:bg-violet-300 transition-colors"
        >
          Already Registered? Login
        </button>
      </div>
    </div>
  );
}
