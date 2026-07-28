"use client";

import * as React from "react";

export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setMessage("Thank you. Garden Live will keep you updated.");
    setEmail("");
  }

  return (
    <form className="grid gap-2" onSubmit={submit} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="footer-newsletter">Email address</label>
        <input
          id="footer-newsletter"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 rounded-full border border-white/10 bg-white/10 px-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-botanical-lime"
        />
        <button className="h-11 rounded-full bg-botanical-lime px-5 text-sm font-semibold text-[#07130d]" type="submit">Subscribe</button>
      </div>
      {error ? <p className="text-xs font-medium text-[#ffb4ad]">{error}</p> : null}
      {message ? <p className="text-xs font-medium text-botanical-lime">{message}</p> : null}
    </form>
  );
}
