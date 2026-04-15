import { SignInButton, UserButton, useUser } from "@clerk/react";

function App() {
  const { isSignedIn } = useUser();

  return (
    <div className="h-screen flex items-center justify-center">
      {isSignedIn ? <UserButton /> : <SignInButton />}
    </div>
  );
}

export default App;
