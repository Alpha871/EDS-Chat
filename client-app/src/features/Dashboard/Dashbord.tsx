import { Button } from "@/components/ui/button";
import { Login } from "../user/Login";
import { Link, useNavigate } from "react-router-dom";
import { Register } from "../user/Register";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <section className="bg-dashboard-1 h-screen flex flex-1 items-center justify-center gap-4">
      <div className="bg-white p-8  ">
        <div className="flex flex-1 mb-4 gap-3">
          <span className="w-fit">Logo</span>
          <span>EDS Global AI</span>
        </div>
        <div className="h-[100px] w-full bg-slate-400">
          <h1>Arka photo</h1>
        </div>
        <div className="flex gap-3 py-3 justify-start">
          <Login />
          <Register />
        </div>
        <div className="flex gap-3 py-3 justify-start">
          <Button>
            <Link to="chat">As a Guest</Link>
          </Button>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse!.credential!);
              console.log(decoded);
              navigate("/chat");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <div>
          <Button>Admin</Button>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
