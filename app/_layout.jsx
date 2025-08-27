import { Stack } from 'expo-router';

export default function PrimerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }}
    />
  );
}
