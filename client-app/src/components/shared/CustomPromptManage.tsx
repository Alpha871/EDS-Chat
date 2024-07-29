import { CustomPromptInput } from "@/app/models/prompt";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/store/store";
import DeleteCustomPrompt from "@/features/CustomPrompt/DeleteCustomPrompt";

function CustomPromptManage({
  prompt,
  manage,
}: {
  prompt: CustomPromptInput;
  manage?: boolean;
}) {
  const { customPromptStore } = useStore();
  const { setSelectedCustomPrompt } = customPromptStore;

  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.pathname !== "/chat" && !manage) {
      navigate("/chat");
      setSelectedCustomPrompt(prompt);
    } else if (!manage) {
      setSelectedCustomPrompt(prompt);
    }
  };
  return (
    <div className="max-w-50 relative " onClick={handleClick}>
      <div
        className={`flex flex-col rounded-lg items-start justify-start 
       space-x-4 text-light-2 p-3  ${
         manage
           ? "bg-gem-AI-1 "
           : "bg-slate-400 text-light-2 hover:bg-slate-300 hover:text-black cursor-pointer"
       }`}
      >
        <div className="mb-5">
          <p className="text-md">{prompt.emoji}</p>
          <p>{prompt.prompt}</p>
        </div>

        {manage && (
          <div className="flex gap-2  text-small-regular w-full flex-wrap  justify-start ">
            <Button className="px-2 py-1 bg-green-400  text-white">
              <Link to={`/updateCustomPrompt/${prompt.id}`}>Update</Link>
            </Button>

            <DeleteCustomPrompt id={prompt.id!} />
          </div>
        )}
      </div>
    </div>
  );
}

export default observer(CustomPromptManage);
