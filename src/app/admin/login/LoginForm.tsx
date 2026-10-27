"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <label className="label" htmlFor="pw">Password</label>
        <input className="field" id="pw" name="password" type="password" autoComplete="current-password" required />
      </div>
      {state?.error && <p role="alert" className="rounded-xl bg-[#FDECEA] px-4 py-3 text-[14px] font-semibold text-[#9B1C1C]">{state.error}</p>}
      <button className="btn bg-ink text-white" disabled={pending}>{pending ? "Checking…" : "Sign in"}</button>
    </form>
  );
}
