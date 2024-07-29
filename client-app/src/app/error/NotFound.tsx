import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col gap-5 ">
      <h1 className="text-center text-red-200">
        Not Oops - we've looked everywhere but could not find what you are
        looking for!Found
      </h1>

      <Button>
        <Link to="/chat">Go to chat</Link>
      </Button>
    </div>
  );
}

export default NotFound;
