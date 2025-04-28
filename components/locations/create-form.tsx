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
import { useTransition } from "react";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  location: z
    .string({
      message: "Location is required.",
    })
    .min(5, {
      message: "Please enter a valid location.",
    }),
});

export default function CreateForm() {
  // loading state
  const [isPending, startTransition] = useTransition();

  // define a form object with location
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
    mode: "onBlur", // when field loses focus
    reValidateMode: "onChange", // when input changes after validation
  });

  return (
    <Form {...form}>
      <form
        action={async (formData) => {
          // before sending form to server action
          const isValid = await form.trigger();
          if (!isValid) {
            return;
          }
          const validatedFields = form.getValues();
          const result = formSchema.safeParse(validatedFields);
          if (!result.success) {
            return;
          }
          // wrap the async task
          startTransition(() => createLocation(formData));
        }}
        noValidate
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor={field.name} className="text-xl">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    placeholder="Enter city, state or zip code"
                    {...field}
                    aria-describedby={`${field.name}-error`}
                  />
                </FormControl>
                <FormDescription id={`${field.name}-description`}>
                  Add a new location (max 10)
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
                redirect("/locations");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              aria-label="Add new location"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="sr-only">Adding...</span>
                </>
              ) : (
                <>
                  <span>Submit</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
