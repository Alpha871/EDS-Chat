import promptValidation from "@/lib/validations/prompt";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

import { z } from "zod";
import { Button } from "../../components/ui/button";
import { useStore } from "@/app/store/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function AddCustomPrompt() {
  const { customPromptStore } = useStore();
  const { createCustomPrompt } = customPromptStore;

  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(promptValidation),
    defaultValues: {
      prompt: "",
      emoji: "", // Default emoji value
    },
  });

  const onSubmit = async (values: z.infer<typeof promptValidation>) => {
    createCustomPrompt(values);
    navigate("/customPrompts");
  };

  return (
    <div className="text-xl text-[#C6C6C9] font-bold">
      <h1>Add a new Prompt</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a prompt"
                    {...field}
                    className="no-focus inputArea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emoji</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter an Emoji"
                    {...field}
                    className="no-focus inputArea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create a prompt</Button>
        </form>
      </Form>
    </div>
  );
}

export default observer(AddCustomPrompt);
