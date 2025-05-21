import { agent, saveAuthCredentials } from "@/shared/api";
import { useActionState } from "react";
import { useNavigate } from "react-router";

export function LoginForm() {
  const navigate = useNavigate();

  const [{ error, identifier, password }, action, pending] = useActionState<{ identifier: string, password: string, error: boolean }, FormData>(async (_, payload) => {
    const identifier = payload.get('identifier') as string;
    const password = payload.get('password') as string;

    try {
      const res = await agent.post('/auth/local', { identifier, password }).then((res) => res.data);

      saveAuthCredentials(res);
      await navigate('/redirect-campaign/' + res.user.id);

      return { identifier, password, error: false };
    } catch (error) {
      return { identifier, password, error: true };
    }
  }, { password: '', identifier: '', error: false });

  return (
    <form className="flex flex-col" action={action}>
      {error && (
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Неправильная электронная почта или пароль
        </div>
      )}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Электронная почта</legend>
        <input name="identifier" type="email" defaultValue={identifier} autoFocus className="input" />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Пароль</legend>
        <input name="password" defaultValue={password} type="password" className="input" />
      </fieldset>
      <button type="submit" className="btn btn-primary mt-3">
        {pending ? <span className="loading loading-dots" /> : 'Войти'}
      </button>
    </form>
  );
}