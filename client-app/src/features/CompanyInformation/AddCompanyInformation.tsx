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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { z } from "zod";

function AddCompanyInformation() {
  const { informationStore } = useStore();
  const { addInformation } = informationStore;
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof companyInformationValidation>>({
    resolver: zodResolver(companyInformationValidation),
    defaultValues: {
      information: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof companyInformationValidation>
  ) => {
    addInformation(values.information);
    form.reset();
    navigate("/companyInformations");
  };

  return (
    <div className="text-xl text-[#C6C6C9] font-bold">
      <h1>Update your company</h1>

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

export default observer(AddCompanyInformation);
