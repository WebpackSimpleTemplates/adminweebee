import { hookstate } from "@hookstate/core";
import axios from "axios";
import { QueryClient } from 'react-query';

export const userIdState = hookstate<string>('');

if (globalThis.localStorage) {
  userIdState.set(localStorage.getItem('userId'));
}

export const agent = axios.create();
export const client = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0
    }
  }
});

export const SERVER_URL = globalThis.window ? import.meta.env.VITE_SERVER_URL : process.env.VITE_SERVER_URL;

agent.interceptors.request.use(async (config) => {
  config.url = SERVER_URL + '/api' + (config.url as string); 

  if (globalThis.localStorage && localStorage.getItem('jwt')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('jwt'); 
  }
  
  return config;
});

agent.interceptors.response.use((r) => r, async (err) => {
  if (globalThis.localStorage && err?.response?.status === 403 && !err.config.url.startsWith(SERVER_URL + '/api/auth')) {
    client.invalidateQueries();
    clearAuthCredentials();
  }

  return Promise.reject(err);
});

export function saveAuthCredentials({ jwt, user }: any) {
  localStorage.setItem('jwt', jwt);
  localStorage.setItem('userId', user.id);
  userIdState.set(user.id + '');
}

export function clearAuthCredentials() {
  location.replace('/login');
  history.pushState(null, '', '/login');
  client.invalidateQueries();
  localStorage.removeItem('jwt');
  userIdState.set(null);
}