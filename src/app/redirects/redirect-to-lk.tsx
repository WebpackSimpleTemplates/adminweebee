import { Navigate, useLoaderData } from "react-router";

export const clientLoader = () => localStorage.getItem('userId') ? '/redirect-channel/' + localStorage.getItem('userId') : '/login';

export default () => <Navigate to={useLoaderData()} />;