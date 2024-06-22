import { createBrowserRouter } from "react-router-dom";
import QuizMarkerPage from "./pages/QuizMarkerPage";
import QuizResultPage from "./pages/QuizResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizMarkerPage />,
  },
  {
    path: "/result",
    element: <QuizResultPage />,
  },
]);
