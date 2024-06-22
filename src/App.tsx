import { RouterProvider } from "react-router-dom";
import { Container } from "reactstrap";
import "./App.css";
import { router } from "./router";

function App() {
  return (
    <Container className="App">
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
