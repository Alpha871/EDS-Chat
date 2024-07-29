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
import { Textarea } from "@/components/ui/textarea";
import companyValidation from "@/lib/validations/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { z } from "zod";

function Company() {
  const { companyStore } = useStore();
  const { updateCompany, company, getCompanies, clearCompanies } = companyStore;
  const navigate = useNavigate();

  useEffect(() => {
    getCompanies();
    return () => clearCompanies();
  }, [getCompanies, clearCompanies]);

  console.log("called");

  const form = useForm<z.infer<typeof companyValidation>>({
    resolver: zodResolver(companyValidation),
    defaultValues: {
      name: company[0]?.name ?? "",
      description: company[0]?.description ?? "",
      instructions: company[0]?.instructions ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof companyValidation>) => {
    await updateCompany({
      id: company[0].id!,
      description: values.description,
      instructions: values.instructions,
    });
    navigate("/chat");
  };

  return (
    <div className="text-xl text-[#C6C6C9] font-bold">
      <h1>Update your company</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a name"
                    {...field}
                    className="no-focus  inputArea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 ">
                  <Textarea
                    rows={10}
                    placeholder="Enter description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>System Intructions</FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 ">
                  <Textarea
                    rows={10}
                    placeholder="Enter system instructions"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update a company</Button>
        </form>
      </Form>
    </div>
  );
}

export default observer(Company);
