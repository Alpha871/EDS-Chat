import { useStore } from "@/app/store/store";

import CustomPromptManage from "@/components/shared/CustomPromptManage";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function CustomPrompts({ manage = true }: { manage?: boolean }) {
  const { customPromptStore, userStore } = useStore();
  const { getCustomPrompts, customPrompts } = customPromptStore;

  useEffect(() => {
    getCustomPrompts();
  }, [getCustomPrompts]);

  return (
    <div>
      {customPrompts.length > 0 ? (
        <div className={` flex ${manage ? "flex-row" : "flex-col"}  gap-4`}>
          {customPrompts.map((prompt) => (
            <CustomPromptManage
              key={prompt.id}
              prompt={prompt}
              manage={manage}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-4">
          <p className="text-white">No Custom Prompt yet </p>
          {userStore.user?.role.toLowerCase() === "admin" && (
            <Button className="px-3 py-2 text-white bg-blue">
              <Link to="/addCustomPrompt">Add CustomPrompt</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default observer(CustomPrompts);
