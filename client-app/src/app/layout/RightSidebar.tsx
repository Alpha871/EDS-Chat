import { observer } from "mobx-react-lite";
import CustomPrompts from "@/features/CustomPrompt/CustomPrompts";

function RightSidebar() {
  return (
    <section className=" custom-scrollbar rightsidebar">
      <div className="mt-4">
        <CustomPrompts manage={false} />
      </div>
    </section>
  );
}

export default observer(RightSidebar);
