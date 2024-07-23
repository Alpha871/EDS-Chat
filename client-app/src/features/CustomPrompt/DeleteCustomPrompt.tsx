import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { useStore } from "@/app/store/store";

interface Props {
  id: string;
}

export default function DeleteCustomPrompt({ id }: Props) {
  const { customPromptStore } = useStore();
  const { deleteCustomPrompt, getCustomPrompt } = customPromptStore;

  useEffect(() => {
    if (id) getCustomPrompt(id);
  }, [getCustomPrompt, id]);

  const handleClick = () => {
    deleteCustomPrompt(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-2 py-1 bg-red-500  text-white">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            custom prompt and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
