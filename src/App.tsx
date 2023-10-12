import Router from "./router/router";

import { ThemeProvider } from "styled-components";
import { GlobalStyle, styledTheme } from "./theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={styledTheme}>
        <Router />
      </ThemeProvider>
      <GlobalStyle />
    </>
  );
};

export default App;
