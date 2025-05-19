import { Fallback } from '@/shared/ui/fallback';
import { useEffect, useState } from 'react';

export { Layout as default } from './Layout';

export const HydrateFallback = () => <Fallback />;

export function ErrorBoundary({ error }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setShow(true), 2000);

    return () => clearTimeout(id);
  }, [error.message]);

  if (!show) {
    return <></>;
  }

  return (
    <div className="error-container">
      <h1>Oops! Что-то пошло не так</h1>
      <p>Сообщение об ошибке: {error.message}</p>
    </div>
  );
}