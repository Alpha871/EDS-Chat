import { Button } from "@/components/ui/button";
import { Login } from "../user/Login";
import { Link, useNavigate } from "react-router-dom";
import { Register } from "../user/Register";
import { GoogleLogin } from "@react-oauth/google";

import { useStore } from "@/app/store/store";
import { observer } from "mobx-react-lite";

function Dashboard() {
  const navigate = useNavigate();
  const { userStore } = useStore();
  const { isLoggedIn } = userStore;

  return (
    <section className="bg-dashboard-1 h-screen flex flex-1  items-center justify-center gap-4">
      <div className="bg-white p-8   ">
        <div className="flex flex-1 mb-4 gap-3">
          <span className="w-fit">Logo</span>
          <span>EDS Global AI</span>
        </div>
        <div className="h-[100px] w-full bg-slate-400">
          <h1>Arka photo</h1>
        </div>
        {isLoggedIn ? (
          <div className="flex justify-center items-center h-[100px]">
            <Button>
              <Link to="/chat">Continue Chating</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex gap-3 py-3 justify-start">
              <Login label="Login" />
              <Register />
            </div>
            <div className="flex gap-3 py-3 justify-start">
              <Button>
                <Link to="chat">As a Guest</Link>
              </Button>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  userStore.GoogleLogin(credentialResponse!.credential!);
                  // const decoded = jwtDecode(credentialResponse!.credential!);
                  // console.log(decoded);
                  navigate("/chat");
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default observer(Dashboard);
