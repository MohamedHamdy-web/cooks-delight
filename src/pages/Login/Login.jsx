import { useState } from "react";
import { useSignIn } from "@clerk/react";
import loginImg from "../../assets/images/login.jpg";

export default function Login() {
  const { signIn, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      await signIn.create({
        identifier: form.username,
        password: form.password,
      });

      window.location.href = "/";
    } catch (err) {
      console.log(err);
      alert(err.errors[0].message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe8] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden border">
        {/* LEFT IMAGE */}
        <div className="w-1/2 hidden md:block">
          <img
            src={loginImg}
            alt="cooking"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 bg-[#f5efe8] p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-3">LOG IN</h1>

          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Welcome back to your kitchen. Log in to access your saved recipes,
            favorite dishes, and personal cooking space.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* USERNAME */}
            <div>
              <label className="text-xs font-semibold">USERNAME</label>
              <input
                type="text"
                className="w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-orange-400"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs font-semibold">PASSWORD</label>
              <input
                type="password"
                className="w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-orange-400"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* BUTTON */}
            <button className="bg-orange-500 text-white py-2 rounded-md mt-2 hover:bg-orange-600 transition">
              SIGN IN
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-sm text-center">
            Don’t have an account?{" "}
            <span className="text-orange-500 cursor-pointer">
              Create one now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
