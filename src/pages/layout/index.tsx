import { agent } from '@/shared/api';
import { useEffect, useState } from 'react';
import { redirect } from 'react-router';

export { Layout as default } from './Layout';

export const loader = async ({ params: { channelId } }: { params: { channelId: string } }) => {
  if (isNaN(+channelId)) {
    return redirect('/');
  }

  const channel = await agent.get(`/channels/${channelId}?populate=owner,logo`).then((res) => res.data);

  if (channel.owner.id !== localStorage.getItem('userId')) {
    return redirect('/');
  }

  return channel;
}

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