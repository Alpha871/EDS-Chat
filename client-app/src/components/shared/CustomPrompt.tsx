import { CustomPromptInput } from "@/app/models/prompt";

function CustomPrompt({ prompt }: { prompt: CustomPromptInput }) {
  return (
    <div
      className="flex flex-col rounded-lg items-start justify-start cursor-pointer
       space-x-4 p-2 bg-slate-400 text-light-2 hover:bg-slate-300 hover:text-black"
    >
      <span className="text-md">{prompt.emoji}</span>
      <p>{prompt.prompt}</p>
    </div>
  );
}

export default CustomPrompt;
