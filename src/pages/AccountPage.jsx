import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SETTINGS_SECTIONS = [
  {
    title: "Profile",
    items: [
      { icon: "👤", label: "Edit Profile",    sub: "Update your name, bio and photo" },
      { icon: "📧", label: "Email Address",   sub: "Marry@Gmail.Com", highlight: true },
    ],
  },
  {
    title: "Security",
    items: [
      { icon: "🔒", label: "Change Password",               sub: "Last changed 3 months ago" },
      { icon: "🛡️", label: "Two-Factor Authentication",    sub: "Add an extra layer of security", badge: "Off", badgeColor: "bg-red-100 text-red-500" },
      { icon: "📱", label: "Trusted Devices",               sub: "Manage devices logged into your account" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "🔔", label: "Notifications",    sub: "Manage push and email alerts", badge: "On", badgeColor: "bg-green-100 text-green-600" },
      { icon: "🌐", label: "Language & Region", sub: "English (India)" },
      { icon: "🎨", label: "Appearance",        sub: "Light mode" },
    ],
  },
  {
    title: "Account",
    items: [
      { icon: "💳", label: "Subscription & Billing", sub: "Free plan · Upgrade for more features" },
      { icon: "📊", label: "Data & Privacy",          sub: "Control what data PopX stores" },
      { icon: "🗑️", label: "Delete Account",          sub: "Permanently remove your account", danger: true },
    ],
  },
];

export default function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const fileRef = useRef(null);
  const [avatar, setAvatar] = useState(user?.avatar || null);

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "MD";

  const handleLogout = () => { logout(); navigate("/"); };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
    e.target.value = "";
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
        <h2 className="text-base font-bold text-gray-900">Account Settings</h2>
        <button onClick={handleLogout} className="text-xs text-violet-600 font-semibold hover:opacity-70 transition-opacity">
          Logout
        </button>
      </div>

      {/* Profile card */}
      <div className="bg-white border-b border-dashed border-gray-200 px-6 py-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden border-2 border-violet-200">
              {avatar
                ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                : <span className="text-violet-600 font-bold text-xl">{initials}</span>
              }
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center hover:bg-violet-700 transition-colors shadow-md"
            >
              <svg width="11" height="11" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          <div>
            <p className="font-semibold text-gray-900">{user?.fullName || "Marry Doe"}</p>
            <p className="text-sm text-gray-400 mt-0.5">{user?.email || "Marry@Gmail.Com"}</p>
            {user?.isAgency && (
              <span className="inline-block mt-1 text-[10px] bg-violet-100 text-violet-600 font-semibold px-2 py-0.5 rounded-full">
                Agency
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor
          Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>
      </div>

      {/* Settings sections */}
      <div className="px-4 py-4 flex flex-col gap-5">
        {SETTINGS_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
              {section.items.map((item, idx) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                    idx !== section.items.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <span className="text-xl w-7 flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${item.danger ? "text-red-500" : "text-gray-800"}`}>
                      {item.label}
                    </p>
                    <p className={`text-xs mt-0.5 truncate ${item.highlight ? "text-violet-500" : "text-gray-400"}`}>
                      {item.sub}
                    </p>
                  </div>
                  {item.badge ? (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  ) : (
                    <svg className="flex-shrink-0" width="16" height="16" fill="none" stroke="#d1d5db" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
        <p className="text-center text-xs text-gray-300 pb-4">PopX v1.0.0</p>
      </div>
    </div>
  );
}
