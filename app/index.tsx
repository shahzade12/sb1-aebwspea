import { Redirect } from 'expo-router';

export default function Home() {
  // TODO: Check authentication status
  const isAuthenticated = false;
  
  return <Redirect href={isAuthenticated ? "/customers" : "/auth/login"} />;
}