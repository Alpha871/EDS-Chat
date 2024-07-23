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
import { Textarea } from "@/components/ui/textarea";
import companyInformationValidation from "@/lib/validations/companyInformation";
import { zodResolver } from "@hookform/resolvers/zod";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { z } from "zod";

function UpdateCompanyInformation() {
  const { informationStore } = useStore();
  const {
    updateInformation,
    getInformation,
    selectedInfnormation,
    clearInformation,
  } = informationStore;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    getInformation(id!);
    return () => clearInformation();
  }, [getInformation, id, clearInformation]);

  const form = useForm<z.infer<typeof companyInformationValidation>>({
    resolver: zodResolver(companyInformationValidation),
    defaultValues: {
      information: selectedInfnormation?.information,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof companyInformationValidation>
  ) => {
    await updateInformation({ id: id!, information: values.information });
    navigate("/chat");
  };

  return (
    <div className="text-xl text-[#C6C6C9] font-bold">
      <h1>Update information</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="information"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Information</FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 ">
                  <Textarea
                    rows={10}
                    placeholder="Enter new Information about the company"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Add New information</Button>
        </form>
      </Form>
    </div>
  );
}

export default observer(UpdateCompanyInformation);
