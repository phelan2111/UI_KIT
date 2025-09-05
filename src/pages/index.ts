import { lazy } from "react";

const UI_KIT = lazy(() => import("@/pages/ui"));
const Landing = lazy(() => import("@/pages/landing"));

export const Page = {
  UI_KIT,
  Landing,
};
