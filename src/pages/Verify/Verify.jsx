import { useEffect, useState } from "react";
import { useUser } from "@clerk/react";
import { useSignUp } from "@clerk/react/legacy";
import { useNavigate, Link } from "react-router-dom";

import logo from "../../assets/images/Logo.png";

export default function Verify() {
  const { signUp, isLoaded, setActive } = useSignUp();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isSignedIn) {
      navigate("/", { replace: true });
    }
  }, [isSignedIn, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      setErrorMsg("Authentication is still loading. Please try again.");
      return;
    }

    setErrorMsg("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        // 🔥 THIS IS THE KEY STEP
        await setActive({
          session: result.createdSessionId,
        });

        navigate("/", { replace: true });
        return;
      }
      setErrorMsg("Verification is not complete yet. Please try again.");
    } catch (err) {
      setErrorMsg(err.errors?.[0]?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe8] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3 mb-6 justify-center hover:opacity-80 transition"
        >
          <img src={logo} alt="logo" className="h-10" />
          <span className="font-semibold text-xl tracking-tight leading-tight">
            Cooks <br /> Delight
          </span>
        </Link>

        <div className="bg-[#f5efe8] border border-gray-300 rounded-3xl p-10 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-4 text-center">
            VERIFY EMAIL
          </h1>

          <p className="text-gray-600 mb-6 text-center">
            Enter the verification code sent to your email.
          </p>

          <form onSubmit={handleVerify} className="w-full flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter code"
              className="w-full border border-black rounded-3xl p-4 text-lg text-center tracking-widest outline-none focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              disabled={!isLoaded}
              className="bg-orange-400 text-black py-3 rounded-3xl text-lg font-semibold hover:bg-orange-500 transition"
            >
              {isLoaded ? "VERIFY" : "LOADING..."}
            </button>

            {errorMsg && (
              <p className="text-red-500 text-sm text-center">{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
