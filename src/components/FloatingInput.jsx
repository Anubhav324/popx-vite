import { useState } from "react";

export default function FloatingInput({ label, type = "text", value, onChange, required, error }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;

  return (
    <div className="relative w-full">
      <label
        className="absolute left-3 transition-all duration-200 pointer-events-none z-10"
        style={{
          top:      active ? "6px"  : "50%",
          transform: active ? "none" : "translateY(-50%)",
          fontSize: active ? "11px" : "14px",
          color:    active ? "#7c3aed" : "#9ca3af",
          fontWeight: active ? 600 : 400,
        }}
      >
        {label}{required && <span style={{ color: "#7c3aed" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ paddingTop: active ? "22px" : "12px" }}
        className={`w-full bg-white rounded-lg px-3 pb-2 text-sm text-gray-800 outline-none border transition-all duration-200 h-14 ${
          error ? "border-red-400" : focused ? "border-violet-600" : "border-gray-200"
        }`}
      />
    </div>
  );
}
