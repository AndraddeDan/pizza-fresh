import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Router from "router";
import theme from "assets/styles/theme";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
