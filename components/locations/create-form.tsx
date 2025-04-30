"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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
import { LocationAutocomplete } from "@/components/locations/autocomplete";
import { LocationSearchResult } from "@/app/lib/definitions";

const formSchema = z.object({
  nickname: z.string().min(2, {
    message: "Please enter a valid name.",
  }),
  location: z.string().min(1, {
    message: "Please select a valid location.",
  }),
  // store user selected location value
  locationData: z
    .object({
      label: z.string(),
      zip: z.string(),
    })
    .optional(),
});

export default function CreateForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      location: "",
      locationData: undefined,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const handleLocationSelect = (locationData: LocationSearchResult | null) => {
    // only if there's a valid selection in a location data object
    if (locationData) {
      // location.label is the full city, state zip display name
      form.setValue("location", locationData.label, {
        shouldValidate: true,
      });

      form.setValue("locationData", {
        label: locationData.label,
        zip: locationData.zip,
      });
    } else {
      // reset when selection is cleared
      form.setValue("location", "", { shouldValidate: true });
      form.setValue("locationData", undefined);
    }
  };

  return (
    <Form {...form}>
      <form
        action={async (formData) => {
          // validate entire form before submission
          const isValid = await form.trigger();
          if (!isValid) {
            return;
          }
          // add label and zip to formData before sending it to server action fn
          const validatedFields = form.getValues();
          if (validatedFields.locationData) {
            formData.set("location", validatedFields.locationData.label);
            formData.set("zip", validatedFields.locationData.zip);
          }
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
                <FormLabel htmlFor="location-autocomplete">Location</FormLabel>
                <FormControl>
                  <LocationAutocomplete
                    onLocationSelect={handleLocationSelect}
                    className="w-full"
                    placeholder={field.value || "Enter city, state or ZIP code"}
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
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="sr-only">Adding...</span>
                </>
              ) : (
                <>
                  Add <PlusCircle className="mr-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
