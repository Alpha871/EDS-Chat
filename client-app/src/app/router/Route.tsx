import { RouteObject, createBrowserRouter } from "react-router-dom";
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

const routes: RouteObject[] = [
  {
    element: <App />,
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
];

export const router = createBrowserRouter(routes);
