import { useQuery } from "react-query";
import { agent } from "./agent";

export type UserType = {
  id: number;
  documentId: string;
  username: string;
  displayName: string;
  avatar: {
    url: string;
  }
}

export type Campaign = {
  id: number,
  name: string,
  schedule: any,
  firstMessages: any,
  autoMessage: any,
  logo: {
    url: string,
  }
}

export function useSelfInfo() {
  return useQuery<UserType>('user-info', () => (
    agent.get('/users/me?populate=avatar').then((res) => res.data)
  ));
}