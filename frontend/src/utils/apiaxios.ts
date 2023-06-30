import axios, { AxiosInstance } from 'axios';

export const AuthAPIAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_Base_URL,
});

const APIAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_Base_URL,
});

export const fetcher = (url: string) =>
  APIAxios.get(url).then((res) => res.data);

export const AuthFetcher = (url: string) =>
  AuthAPIAxios.get(url).then((res) => res.data);

// todo: add interceptors for 401 and 403 errors and request new access token

export default APIAxios;
