import { store } from "@store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Container } from "reactstrap";
import { LoadingScreen } from "./components";
import { router } from "./router";

function App() {
  return (
    <Provider store={store}>
      <LoadingScreen />
      <Container className="App">
        <RouterProvider router={router} />
      </Container>
    </Provider>
  );
}

export default App;
