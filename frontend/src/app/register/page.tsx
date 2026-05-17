import RegisterForm from "@/app/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <RegisterForm />
    </div>
  );
}
