"use client";

import { useRouter } from "next/navigation";

import AuthForm from "../components/auth/AuthForm";
import { EnvelopeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import SocialAuth from "../components/auth/SocialAuth";
import {
  AuthLayout,
  AuthLeft,
  AuthRight,
} from "../components/auth/AuthLayout";
import { FooterDetails } from "../components/auth/AuthForm";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Invalid email or password");
        return;
      }

      // Store JWT
      localStorage.setItem("token", data.token);

      // Redirect after successful login
      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <AuthLayout>
      {/* LEFT SIDE */}
      <AuthLeft>
        <AuthForm
          title="Welcome Back! 🚀"
          subtitle="Pick up right where you left your DSA journey"
          buttonText="Login"
          onSubmit={handleLogin}
          fields={[
            {
              name: "email",
              label: "Email Address",
              type: "email",
              placeholder: "Enter Email ID",
              icon: EnvelopeIcon,
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter Password",
              rightIcon: EyeSlashIcon,
              extra: (
              <span
                onClick={() => router.push("/forgot-password")}
                className="text-sm font-semibold cursor-pointer hover:underline hover:decoration-[var(--yellow-primary)] hover:decoration-2"
              >
                Forgot Password?
              </span>
              ),
            },
          ]}
        />

        <SocialAuth />

        <FooterDetails
        footerText="New here?"
        footerAction="Create an account"
        footerLink="/register"
        />
      </AuthLeft>

      {/* RIGHT SIDE */}
      <AuthRight>
        <div className="relative rotate-[-3deg]">
          <span className="absolute top-0 right-10 text-[var(--mid-brown)] text-7xl font-mono font-semibold select-none">
            {"<>"}
          </span>

          <div className="relative z-10 mt-16 bg-[var(--mid-brown)] rounded-2xl p-8 font-mono text-sm leading-relaxed shadow-lg max-w-md">
            <div className="flex gap-2 pb-3">
              <span className="w-3 h-3 bg-[var(--red-400)] rounded-full" />
              <span className="w-3 h-3 bg-[var(--yellow-400)] rounded-full" />
              <span className="w-3 h-3 bg-[var(--green-400)] rounded-full" />
            </div>

            <p>
              <span className="text-[var(--yellow-primary)]">while</span>{" "}
              (
              <span className="text-[var(--blue-400)]">!isSolved</span>
              ) {"{"}
            </p>

            <p className="pl-4 text-[var(--gray-300)]">
              <span className="text-[var(--yellow-primary)]">
                this.think();
              </span>
              <br />
              <span className="text-[var(--green-400)]">
                this.code();
              </span>
              <br />
              <span className="text-[var(--gray-400)]">
                // consistency is key
              </span>
            </p>

            <p>{"}"}</p>
          </div>
        </div>

        {/* TEXT */}
        <div className="pl-16 space-y-2">
          <p className="text-2xl font-bold">Welcome Back, Coder!</p>

          <p className="text-[var(--gray-400)]">
            Ready to tackle new algorithms? Your Dashboard is updated with
            today's top challenges tailored just for you.
          </p>
        </div>

        {/* FOOTER AVATARS */}
        <div className="space-y-1">
          <div className="flex -space-x-2 pl-42">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-[var(--gray-400)] border-2 border-[var(--navy-blue)]"
              />
            ))}
          </div>

          <p className="text-[var(--gray-300)] text-sm pl-26">
            Continue your progress with 2000+ others
          </p>
        </div>
      </AuthRight>
    </AuthLayout>
  );
}