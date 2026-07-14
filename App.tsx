import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BottomTabs from "./src/navigation/BottomTabs";
// TODO: add an auth stack (SignIn/SignUp/ForgotPassword) that renders
// before BottomTabs when there's no active session.

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
