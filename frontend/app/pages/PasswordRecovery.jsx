"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

import AuthForm from "../components/auth/AuthForm";
import { FooterDetails } from "../components/auth/AuthForm";

import {
  AuthLayout,
  AuthLeft,
  AuthRight,
} from "../components/auth/AuthLayout";

export default function PasswordRecovery({ mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (formData) => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Unable to process request");
        return;
      }

      alert(
        "If an account exists with this email, a reset token has been generated."
      );
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (formData) => {
    if (!token) {
      alert("Invalid or missing reset token");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            new_password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Password reset failed");
        return;
      }

      alert("Password reset successful!");

      router.replace("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      alert("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const isForgot = mode === "forgot";

  return (
    <AuthLayout>
      {/* LEFT SIDE */}
      <AuthLeft>
        {isForgot ? (
          <>
            <AuthForm
              title="Forgot Password? 🔐"
              subtitle="Enter your email and we'll help you get back into your account."
              buttonText={loading ? "Sending..." : "Send Reset Request"}
              onSubmit={handleForgotPassword}
              fields={[
                {
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "Enter Email ID",
                  icon: EnvelopeIcon,
                },
              ]}
            />

            <FooterDetails
              footerText="Remember your password?"
              footerAction="Log in"
              footerLink="/login"
            />
          </>
        ) : (
          <>
            <AuthForm
              title="Reset Password 🔑"
              subtitle="Create a new password for your AlgoLogic account."
              buttonText={loading ? "Resetting..." : "Reset Password"}
              onSubmit={handleResetPassword}
              fields={[
                {
                  name: "password",
                  label: "New Password",
                  type: "password",
                  placeholder: "Enter new password",
                  rightIcon: EyeSlashIcon,
                },
                {
                  name: "confirmPassword",
                  label: "Confirm Password",
                  type: "password",
                  placeholder: "Confirm new password",
                  rightIcon: LockClosedIcon,
                },
              ]}
            />

            <FooterDetails
              footerText="Remember your password?"
              footerAction="Log in"
              footerLink="/login"
            />
          </>
        )}
      </AuthLeft>

      {/* RIGHT SIDE */}
      <AuthRight>
        {isForgot ? (
          <>
            {/* CODE BLOCK */}
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
                  <span className="text-[var(--yellow-primary)]">
                    if
                  </span>{" "}
                  (
                  <span className="text-[var(--blue-400)]">
                    passwordForgotten
                  </span>
                  ) {"{"}
                </p>

                <p className="pl-4 text-[var(--gray-300)]">
                  <span className="text-[var(--yellow-primary)]">
                    sendResetLink();
                  </span>
                  <br />

                  <span className="text-[var(--green-400)]">
                    secureAccount();
                  </span>
                  <br />

                  <span className="text-[var(--gray-400)]">
                    // get back to coding
                  </span>
                </p>

                <p>{"}"}</p>
              </div>
            </div>

            {/* TEXT */}
            <div className="pl-16 space-y-2">
              <p className="text-2xl font-bold">
                Don't Give Up, Coder! 💪
              </p>

              <p className="text-[var(--gray-400)]">
                Forgot your password? No worries. Secure your account
                and get back to solving algorithms.
              </p>
            </div>

            {/* FOOTER */}
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
                Keep learning. Keep solving. Keep growing.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* CODE BLOCK */}
            <div className="relative rotate-[3deg]">
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
                  <span className="text-[var(--yellow-primary)]">
                    const
                  </span>{" "}
                  password ={" "}
                  <span className="text-[var(--green-300)]">
                    "newPassword"
                  </span>
                  ;
                </p>

                <p className="pl-4 text-[var(--gray-300)]">
                  <span className="text-[var(--yellow-primary)]">
                    validate
                  </span>
                  (password);
                  <br />

                  <span className="text-[var(--green-400)]">
                    secureAccount();
                  </span>
                  <br />

                  <span className="text-[var(--gray-400)]">
                    // ready to solve again
                  </span>
                </p>
              </div>
            </div>

            {/* TEXT */}
            <div className="pl-16">
              <p className="text-2xl font-bold pb-2">
                Back to Solving! 🚀
              </p>

              <p className="text-[var(--gray-400)] pr-10">
                Set a new password and continue your journey through
                Data Structures and Algorithms.
              </p>
            </div>

            {/* FOOTER */}
            <div>
              <div className="flex -space-x-2 pl-42">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-[var(--gray-400)] border-2 border-[var(--navy-blue)]"
                  />
                ))}
              </div>

              <p className="text-[var(--gray-300)] text-sm pl-26">
                Your next algorithm challenge awaits.
              </p>
            </div>
          </>
        )}
      </AuthRight>
    </AuthLayout>
  );
}