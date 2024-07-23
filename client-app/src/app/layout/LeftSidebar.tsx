import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import { AvatarUser } from "@/components/shared/AvatarUser";
import { Button } from "@/components/ui/button";

function Leftsidebar() {
  const { userStore } = useStore();
  const { getCurrentUser, user, logout } = userStore;
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <section className="custom-scrollbar leftsidebar mt-5">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        <div className="leftsidebar_link text-light-1">
          {user !== null ? (
            <div className="flex flex-col justify-start">
              <div className="flex flex-wrap gap-5 items-center justify-center">
                <AvatarUser />
                <div className="flex flex-col">
                  <span>{user.firstname}</span>
                  <span className="text-gray-300">@{user.username}</span>
                </div>
                <Button type="button" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-5 items-center justify-center">
              <AvatarUser />
              <span>Guest</span>
            </div>
          )}
        </div>
        <Link to="/chat" className="leftsidebar_link  text-light-1">
          Chat
        </Link>
        <Link to="/company" className="leftsidebar_link  text-light-1">
          Update Company Information
        </Link>

        <Link
          to="/companyInformations"
          className="leftsidebar_link text-light-1"
        >
          Informations
        </Link>

        <Link to="/addInformation" className="leftsidebar_link text-light-1">
          Add New information
        </Link>

        <Link to="/customPrompts" className="leftsidebar_link text-light-1">
          Custom Prompts
        </Link>

        <Link to="/addCustomPrompt" className="leftsidebar_link text-light-1">
          Add New Prompt
        </Link>
      </div>
      {/* <div className="w-fit px-6">
        <PassPrompt />
      </div> */}
    </section>
  );
}

export default observer(Leftsidebar);
