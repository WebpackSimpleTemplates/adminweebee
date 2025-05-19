import { Fallback } from "@/shared/ui/fallback";
import { LoginForm } from "@/widgets/login-form";

export function meta() {
  return [
    { title: "Вход" },
  ];
}

export const HydrateFallback = () => <Fallback />;

export default function Login() {
  return (
    <div className="w-full h-full flex justify-center items-center p-3">
      <div className="card p-3 shadow-2xl border-t-4 border-t-primary w-full max-w-[350px]">
        <div className="text-xl text-center font-semibold my-3">
          Вход
        </div>
        <LoginForm />
      </div>
    </div>
  );
}