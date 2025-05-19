import { useTransition } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";

export function Back() {
  const navigate = useNavigate();
  
  const [pending, startTransition] = useTransition();

  if (pending) {
    return (
      <button className="btn">
        <span className="loading loading-dots" />
        Назад
      </button>
    );
  }

  return (
    <button onClick={() => startTransition(() => navigate(-1))} className="btn">
      <BiArrowBack />
      Назад
    </button>
  );
}