import { SignOutButton } from "@clerk/react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efe8] px-6">
      <SignOutButton redirectUrl="/login">
        <button className="rounded-3xl bg-orange-400 px-8 py-4 text-lg font-semibold text-black transition hover:bg-orange-500">
          LOG OUT
        </button>
      </SignOutButton>
    </div>
  );
}
