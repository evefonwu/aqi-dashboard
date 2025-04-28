"use client";

import { Button } from "../ui/button";
import { deleteLocation } from "@/app/lib/actions";
import { useTransition } from "react";
import { Loader2, MinusCircle } from "lucide-react";

export function DeleteForm({ id }: { id: string }) {
  // useTransition returns isPending state and startTransition fn
  const [isPending, startTransition] = useTransition();

  const deleteLocationWithId = deleteLocation.bind(null, id);

  const handleDelete = () => {
    // wrap startTransition around the async task
    startTransition(async () => {
      await deleteLocationWithId();
    });
  };
  return (
    <form action={handleDelete}>
      <Button
        type="submit"
        aria-label="delete location"
        disabled={isPending}
        variant="outline"
        size="icon"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="sr-only">Deleting...</span>
          </>
        ) : (
          <>
            <MinusCircle className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </>
        )}
      </Button>
    </form>
  );
}
