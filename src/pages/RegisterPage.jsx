import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", password: "", company: "", isAgency: true,
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.fullName.trim())        err.fullName = true;
    if (!form.phone.trim())           err.phone    = true;
    if (!form.email.includes("@"))    err.email    = true;
    if (form.password.length < 6)     err.password = true;
    setErrors(err);
    return !Object.keys(err).length;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    register(
      { fullName: form.fullName, email: form.email, company: form.company, isAgency: form.isAgency, avatar: null },
      form.password
    );
    navigate("/account");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          Create your<br />PopX account
        </h1>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <div>
          <FloatingInput label="Full Name" value={form.fullName} onChange={set("fullName")} required error={errors.fullName} />
          {errors.fullName && <p className="text-red-400 text-xs mt-1 ml-1">Required</p>}
        </div>
        <div>
          <FloatingInput label="Phone number" type="tel" value={form.phone} onChange={set("phone")} required error={errors.phone} />
          {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">Required</p>}
        </div>
        <div>
          <FloatingInput label="Email address" type="email" value={form.email} onChange={set("email")} required error={errors.email} />
          {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">Enter a valid email</p>}
        </div>
        <div>
          <FloatingInput label="Password" type="password" value={form.password} onChange={set("password")} required error={errors.password} />
          {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">Min 6 characters</p>}
        </div>
        <FloatingInput label="Company name" value={form.company} onChange={set("company")} />

        <div>
          <p className="text-sm text-gray-600 mb-2">
            Are you an Agency?<span className="text-violet-600">*</span>
          </p>
          <div className="flex items-center gap-8">
            {["Yes", "No"].map((opt) => {
              const checked = form.isAgency === (opt === "Yes");
              return (
                <label key={opt} className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => setForm((p) => ({ ...p, isAgency: opt === "Yes" }))}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      checked ? "border-violet-600" : "border-gray-300"
                    }`}
                  >
                    {checked && <div className="w-2.5 h-2.5 rounded-full bg-violet-600" />}
                  </div>
                  <span className="text-sm text-gray-700">{opt}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="w-full bg-violet-600 text-white py-4 rounded-lg font-semibold text-sm hover:bg-violet-700 transition-colors"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
