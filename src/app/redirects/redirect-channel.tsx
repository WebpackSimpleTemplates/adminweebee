import { agent } from "@/shared/api";
import { Navigate, useLoaderData } from "react-router";

export async function loader({ params: { userId } }: { params: { userId: string } }) {
  const { data: { channels } } = await agent.get(`/users/${userId}?populate=channels.logo`);

  if (channels.length === 0) {
    return '/new-channel';
  }

  return '/' + channels[0].id;
}

export default () => <Navigate to={useLoaderData()} />;