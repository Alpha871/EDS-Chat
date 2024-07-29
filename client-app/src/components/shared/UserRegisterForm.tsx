import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import registerValidation from "@/lib/validations/register";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useStore } from "@/app/store/store";
import { useNavigate } from "react-router-dom";

function UserRegisterForm() {
  // const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const { userStore } = useStore();
  const { register } = userStore;

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerValidation>) => {
    try {
      await register(values);
      setErrors([]);
      navigate(`/emailVerification/${values.email}`);
    } catch (error) {
      console.log("error", error);
      if (Array.isArray(error)) {
        setErrors(error);
      } else {
        setErrors([
          "An unexpected error occurred  please check your email," +
            " password and username again try again",
        ]);
      }
    }
  };

  return (
    <div>
      {/* {message ? <h2 className="text-2xl">{message}</h2> : null} */}

      {errors.length > 0 && (
        <div className="mb-10 text-red-500">
          {errors.map((error: string, index: number) => (
            <p key={index} className="text-red-400">
              {error}
            </p>
          ))}
        </div>
      )}

      <Form {...form}>
        <div className="flex flex-1 gap-4">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="flex flex-wrap gap-3 mb-3">
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your firstname"
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
              name="lastname"
              render={({ field }) => (
                <FormItem className="flex flex-wrap gap-3 mb-3">
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your lastname"
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
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-wrap gap-3 mb-3">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
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
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-wrap gap-3 mb-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
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
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-wrap gap-3">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="no-focus inputArea"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4">
              {" "}
              Sign up
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
}

export default UserRegisterForm;
