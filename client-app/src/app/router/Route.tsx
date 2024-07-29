import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";

import Chat from "@/features/chat/Chat";
import Dashboard from "@/features/Dashboard/Dashbord";
import Company from "@/features/Company/Company";
import AddCompanyInformation from "@/features/CompanyInformation/AddCompanyInformation";
import UpdateCompanyInformation from "@/features/CompanyInformation/UpdateCompanyInformation";
import AddCustomPrompt from "@/features/CustomPrompt/AddCustomPrompt";
import UpdateCustomPrompt from "@/features/CustomPrompt/UpdateCustomPrompt";
import CompanyInformations from "@/features/CompanyInformation/CompanyInformations";
import CustomPrompts from "@/features/CustomPrompt/CustomPrompts";
import RequireAuth from "./RequireAuth";
import ServerError from "../error/ServerError";
// import NotFound from "../error/NotFound";
import ConfirmEmail from "@/features/Dashboard/ConfirmEmail";
import NotFound from "../error/NotFound";

const routes: RouteObject[] = [
  {
    element: <App />,
    path: "/",
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "emailVerification/:email",
        element: <ConfirmEmail />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "company",
            element: <Company />,
          },
          {
            path: "companyInformations",
            element: <CompanyInformations />,
          },

          {
            path: "updateInformation/:id", // Corrected path
            element: <UpdateCompanyInformation />,
          },

          {
            path: "addInformation",
            element: <AddCompanyInformation />,
          },

          {
            path: "customPrompts",
            element: <CustomPrompts />,
          },
          {
            path: "updateCustomPrompt/:id",
            element: <UpdateCustomPrompt />,
          },

          {
            path: "addCustomPrompt",
            element: <AddCustomPrompt />,
          },
        ],
      },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
