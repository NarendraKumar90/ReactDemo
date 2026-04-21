import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const loginValid = emailValid && form.password.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginValid) alert("Login Successful");
  };

  return (
  <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              // onChange={handleChange}
              className={`w-full border rounded-xl p-3 focus:ring-2 ${
                form.email && !emailValid
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
            {form.email && !emailValid && (
              <p className="text-red-500 text-sm">Not a valid input</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password *"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 pr-10 focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {/* {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
            </button>
          </div>

          <div className="text-right text-blue-600 text-sm cursor-pointer">
            Forgot Password?
          </div>

          <button
            type="submit"
            disabled={!loginValid}
            className={`w-full py-3 rounded-xl font-semibold ${
              loginValid ? "bg-blue-600 text-white" : "bg-gray-300 text-white"
            }`}
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <button className="w-full border border-blue-500 text-blue-600 py-3 rounded-xl font-medium">
            Login via Google
          </button>
        </div>
      </div>
    </div>
  </>
  );
}
