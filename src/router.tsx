import { createBrowserRouter } from "react-router";
import { HomeScreen, OnBoardingScreen } from "./screens";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/onboarding",
    element: <OnBoardingScreen />,
  },
]);
