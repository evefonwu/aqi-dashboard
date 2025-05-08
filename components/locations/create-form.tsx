"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { redirect } from "next/navigation";
import { createLocation } from "@/app/lib/actions";

// user selected location is of type LocationSearchResult
import { LocationSearchResult } from "@/app/lib/definitions";
import { LocationAutocomplete } from "@/components/locations/autocomplete";

// client-side user input validations
const FormSchema = z.object({
  nickname: z.string().min(2, {
    message: "Please enter a valid name.",
  }),
  location: z.string().min(1, {
    message: "Please select a valid location.",
  }),
  data: z
    .object({
      city: z.string(),
      state: z.string(),
      zipcode: z.string(),
    })
    .optional(),
  // optional because these can be reset to null when no selection
});

export default function CreateForm() {
  // marking a state update as a Transition
  const [isPending, startTransition] = useTransition();

  // accessible type-safe form with client-side validations for nickname and location
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nickname: "",
      location: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // validate user input, set into formData
  const handleLocationSelect = (
    selectedLocation: LocationSearchResult | null
  ) => {
    // if user selected a location
    if (selectedLocation) {
      form.setValue("location", selectedLocation.label, {
        shouldValidate: true,
      });

      form.setValue("data", {
        city: selectedLocation.city,
        state: selectedLocation.state,
        zipcode: selectedLocation.zip,
      });
    } else {
      // reset when selection is cleared
      form.setValue("location", "", { shouldValidate: true });
      form.setValue("data", undefined);
    }
  };

  return (
    <Form {...form}>
      <form
        action={async (formData) => {
          // validate form before invoking server action
          const isValid = await form.trigger();
          if (!isValid) return;

          // populate formData object with validated input
          const validated = form.getValues();
          if (validated.data) {
            formData.set("city", validated.data.city);
            formData.set("state", validated.data.state);
            formData.set("zipcode", validated.data.zipcode);
          }

          // transition
          startTransition(() => createLocation(formData));
        }}
        noValidate
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor={field.name}>Nickname</FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    placeholder=""
                    {...field}
                    aria-describedby={`${field.name}-error`}
                  />
                </FormControl>
                <FormDescription id={`${field.name}-description`}>
                  Enter a nickname for your location
                </FormDescription>
                <div id={`${field.name}-error`} aria-live="polite">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor={field.name}>Nickname</FormLabel>
                <FormControl>
                  <LocationAutocomplete
                    onLocationSelect={handleLocationSelect}
                  />
                </FormControl>
                <FormDescription id="location-description">
                  Search and select your location
                </FormDescription>
                <div id="location-error" aria-live="polite">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-[80px]"
              aria-label="Cancel and return to locations list"
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
              aria-label="Add a new location"
              type="submit"
              className="w-[80px]"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="sr-only">Adding...</span>
                </>
              ) : (
                <>
                  <span>Add</span>
                  <PlusCircle className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
