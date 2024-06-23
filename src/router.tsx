import { ROUTES } from "@constants/route-settings";
import { createBrowserRouter } from "react-router-dom";
import QuizMarkerPage from "./pages/QuizMarkerPage";
import QuizResultPage from "./pages/QuizResultPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT_PAGE,
    element: <QuizMarkerPage />,
  },
  {
    path: ROUTES.RESULT_PAGE,
    element: <QuizResultPage />,
  },
]);
