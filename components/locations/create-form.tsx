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
import { startTransition, useTransition } from "react";

const formSchema = z.object({
  location: z.string().min(5, {
    message: "Location is required.",
  }),
});

export default function CreateForm() {
  // Consider adding loading state handling for the submit button:
  const [isPending, startTransition] = useTransition();

  // define a form object with location
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
    mode: "onBlur", // Validate when field loses focus
    reValidateMode: "onChange", // Re-validate when input changes after validation
  });

  return (
    <Form {...form}>
      <form
        action={async (formData) => {
          // validate form before sending form to server action
          const isValid = await form.trigger();
          if (!isValid) {
            return;
          }
          const validatedFields = form.getValues();
          const result = formSchema.safeParse(validatedFields);
          if (!result.success) {
            return;
          }
          // createLocation is a server action fn
          startTransition(() => createLocation(formData));
        }}
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
                form.reset();
                form.clearErrors();
              }}
            >
              Clear
            </Button>
            <Button
              variant="default"
              aria-label="Add new location"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
