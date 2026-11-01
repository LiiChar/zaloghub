
import type { Job } from "./shared/types/job";

import { List } from "./shared/component/List";
import { ListItem } from "./shared/component/ListItem";

import { useLocalStorage } from "./shared/hooks/useLocalStorage";
import { useMemo, useState } from "react";
import { CreateJob } from "./shared/component/form/CreateJob";
import { CheckBox } from "./shared/ui/check-box";
import { Button } from "./shared/ui/button";
import { SelectItem } from "./shared/ui/select-item";
import { Select } from "./shared/ui/select";

export type Filter = "all" | "finished" | "completed";

export const App = () => {
  const { value: jobs, set } = useLocalStorage<Job[]>("jobs", []);
  const [filter, setFilter] = useState<Filter>("all");

  const jobList = jobs ?? [];

  // Создание задачи
  const handleAddJob = (job: Job) => {
    set((prev) => [...prev, job]);
  };

  // Изменение статуса
  const handleToggleJob = (id: string) => {
    set((prev) =>
      prev.map((job) =>
        job.id === id
          ? { ...job, checked: !job.checked }
          : job
      )
    );
  };

  // Удаление задачи
  const handleRemoveJob = (id: string) => {
    set((prev) => prev.filter((job) => job.id !== id));
  };

  // Фильтрация
  const filteredJobs = useMemo(() => {
    switch (filter) {
      case "finished":
        return jobList.filter((job) => job.checked);

      case "completed":
        return jobList.filter((job) => !job.checked);

      default:
        return jobList;
    }
  }, [jobList, filter]);

  return (
    <main className="min-h-screen flex justify-center items-center p-4">
      <section className="w-full max-w-lg flex flex-col gap-4">

        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Задачи</h1>

          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as Filter)}
            placeholder="Фильтр задач"
            className="w-min"
          >
            <SelectItem value="all">Все задачи</SelectItem>
            <SelectItem value="completed">Активные</SelectItem>
            <SelectItem value="finished">Выполненные</SelectItem>
          </Select>
        </header>

        <CreateJob onCreate={handleAddJob} />

        <List
          isEmpty={filteredJobs.length === 0}
          emptyMessage={
            jobList.length === 0
              ? "Пока нет задач"
              : "Задачи не найдены"
          }
        >
          {
            filteredJobs.map((job) => (
              <ListItem key={job.id}>
                <div className="flex items-center justify-between gap-3 w-full">

                  <label className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer">
                    <CheckBox
                      checked={job.checked}
                      onChange={() => handleToggleJob(job.id)}
                    />

                    <span
                      className={
                        job.checked
                          ? "line-through opacity-50 truncate"
                          : "truncate"
                      }
                    >
                      {job.title}
                    </span>
                  </label>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveJob(job.id)}
                  >
                    Удалить
                  </Button>

                </div>
              </ListItem>
            ))
          }
        </List>

      </section>
    </main>
  );
};
