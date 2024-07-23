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

export default function DeleteCompanyInformation({ id }: Props) {
  const { informationStore } = useStore();
  const { deleteInformation, getInformation } = informationStore;

  useEffect(() => {
    if (id) getInformation(id);
  }, [getInformation, id]);

  const handleClick = () => {
    deleteInformation(id);
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
            information and remove your data from our servers.
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
