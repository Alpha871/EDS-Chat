import "./globals.css";
import { Outlet, useLocation } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import Footer from "./Footer";
import Leftsidebar from "./LeftSidebar";
import Dashbord from "@/features/Dashboard/Dashbord";
import { observer } from "mobx-react-lite";
import HeaderEDS from "./HeaderEDS";
import { useEffect } from "react";
import { useStore } from "../store/store";
import ConfirmEmail from "@/features/Dashboard/ConfirmEmail";

function App() {
  const location = useLocation();
  const { companyStore, informationStore, commonStore, userStore } = useStore();
  const { getCompanies, clearCompanies } = companyStore;
  const { getInformations, clearInformations } = informationStore;

  useEffect(() => {
    if (commonStore.token) {
      userStore.getCurrentUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }

    getCompanies();
    getInformations();

    return () => {
      clearCompanies();
      clearInformations();
    };
  }, [
    getCompanies,
    clearCompanies,
    getInformations,
    clearInformations,
    commonStore,
    userStore,
  ]);

  return (
    <>
      {location.pathname === "/" ? (
        <>
          <Dashbord />
        </>
      ) : location.pathname.startsWith("/emailVerification") ? (
        <>
          <ConfirmEmail />
        </>
      ) : (
        <>
          <div className="flex">
            <Leftsidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">
                <HeaderEDS />
                <div className=" mb-10">
                  <Outlet />
                </div>
              </div>
            </section>
            <RightSidebar />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
export default observer(App);
