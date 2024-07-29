import { useStore } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { observer } from "mobx-react-lite";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { z } from "zod";

function ConfirmEmail() {
  const {
    userStore: { emailVerification, emailRes, emailResError },
  } = useStore();

  const { email } = useParams<{ email: string }>();

  const codeValidation = z.object({
    code: z
      .string()
      .min(6, { message: "code must be at least 6 characters long" }),
  });

  const form = useForm<z.infer<typeof codeValidation>>({
    resolver: zodResolver(codeValidation),
    defaultValues: {
      code: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof codeValidation>) => {
    await emailVerification(email!, values.code);
  };

  return (
    <section className="bg-dashboard-1 h-screen flex flex-1  items-center justify-center gap-4">
      <div className="bg-white p-8   ">
        <div className="flex flex-1 mb-4 gap-3">
          <span className="w-fit">Logo</span>
          <span>EDS Global AI</span>
        </div>
        <div className="h-[100px] w-full bg-slate-400">
          <h1>Arka photo</h1>
        </div>
        {emailRes ? (
          <div>
            <h1 className="text-2xl font-bold">Email confirmation</h1>
            <p>{emailRes}</p>
            <Button onClick={() => navigate("/")}>Please Go and login</Button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mt-3">Confirm your email</h1>
            {emailResError && (
              <p className="text-red-500">
                {emailResError} please check your email again
              </p>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter the code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a code"
                          {...field}
                          className="no-focus  inputArea"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Confirm</Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </section>
  );
}

export default observer(ConfirmEmail);
