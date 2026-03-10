"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";

const AuthButtons = () => {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="btn-signin text-sm font-semibold">
            Sign In
          </button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </>
  );
};

export default AuthButtons;