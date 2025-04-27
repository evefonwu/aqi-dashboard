// https://ui.shadcn.com/docs/components/form

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createLocation } from "@/app/lib/actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  location: z.string().min(5, {
    message: "Location is required.",
  }),
});

export default function CreateForm() {
  // define a form object with location
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });

  // x function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  // }

  return (
    <Form {...form}>
      <form
        // using React Server Actions fullstack app with db
        action={createLocation}
        // x onSubmit={form.handleSubmit(onSubmit)}
        aria-labelledby="contact-form-heading"
        noValidate
      >
        <div className="flex flex-col">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor={field.name}>Location:</FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    placeholder="Enter city, state or zip code"
                    {...field}
                    aria-describedby={`${field.name}-error`}
                    autoComplete="street-address" //?
                  />
                </FormControl>
                <FormDescription id={`${field.name}-description`}>
                  Add a new location (max 10 locations).
                </FormDescription>
                <div id={`${field.name}-error`} aria-live="polite">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                // form.reset() clear user inputs:
                form.reset();
                // clear validation errors:
                form.clearErrors();
              }}
            >
              Clear
            </Button>
            <Button
              variant="default"
              aria-label="Add new location"
              type="submit"
            >
              Add
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
