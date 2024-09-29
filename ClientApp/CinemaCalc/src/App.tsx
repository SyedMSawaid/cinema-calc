import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Expenses } from "./pages";
import "animate.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Expenses />
      </QueryClientProvider>
    </>
  );
}

export default App;
