import UserRegisterForm from "@/components/shared/UserRegisterForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Register() {
  // const { userStore } = useStore();
  // const { register } = userStore;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign up</DialogTitle>
          <DialogDescription>
            Enter your credentials to login to your account.
          </DialogDescription>
        </DialogHeader>
        <UserRegisterForm />
      </DialogContent>
    </Dialog>
  );
}
