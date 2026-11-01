import { useState, type FormEvent } from "react";
import type { Job } from "@/shared/types/job";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export type CreateJobProps = {
  onCreate: (job: Job) => void;
};

export const CreateJob = ({ onCreate }: CreateJobProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const job: Job = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      checked: false,
    };

    onCreate(job);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Название задачи..."
      />

      <Button type="submit" disabled={!title.trim()}>
        Добавить
      </Button>
    </form>
  );
};
