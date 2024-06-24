import { TrashIcon } from '@heroicons/react/24/outline';
import { List } from '@/types';
import { useListOperations } from '@/hooks/useListOperations';
import { useClickOutside } from '@/hooks/useClickOutside';
import { TaskLayout } from '@/components/TaskLayout';
import { TaskForm } from './TaskForm';
import { ListForm } from './ListForm';
import { useCallback, useEffect, useState } from 'react';

type ListLayoutProps = {
  currentList: List;
};

export const ListLayout = ({ currentList }: ListLayoutProps) => {
  const { handleListEdit, handleListDelete } = useListOperations(currentList);
  const { ref, isVisible, setIsVisible } = useClickOutside(
    () => handleListEdit(currentList),
    currentList.name,
  );
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState('#4f46e5');

  const changeProgress = useCallback(() => {
    const allTasks = currentList.tasks.length;
    const finishedTasks = currentList.tasks.filter(
      (task) => task.status === true,
    ).length;
    let width = (finishedTasks / allTasks) * 100;
    if (width === Infinity || isNaN(width)) width = 0;
    setProgress(width);
  }, [currentList.tasks]);

  useEffect(() => {
    changeProgress();
  }, [currentList.tasks, changeProgress]);

  useEffect(() => {
    const colors = [
      '#4f46e5',
      '#2563eb',
      '#1BA39C',
      '#009FD4',
      '#7600A8',
      '#8B008B',
      '#4B6A88',
      '#E73C4E',
      '#f59e0b',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, []);

  return (
    <div className="dark:bg-night-gray-900 dark:border-night-gray-200 relative mt-4 flex flex-col gap-2 rounded-md border bg-white">
      {isVisible ? (
        <div
          className="w-full px-4 pt-3"
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          <ListForm currentList={currentList} setIsVisible={setIsVisible} />
        </div>
      ) : (
        <div className="flex justify-between px-4 pt-3">
          <h3
            className="w-3/4 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold"
            onClick={() => setIsVisible(!isVisible)}
          >
            {currentList.name}
          </h3>
          <button
            className="self-start pl-2"
            onClick={() => handleListDelete(currentList._id)}
            aria-label="Delete list"
          >
            <TrashIcon className="h-[20px] w-[20px]" />
          </button>
        </div>
      )}
      {currentList.tasks.length > 0 && (
        <>
          {currentList.tasks.map((task) => (
            <TaskLayout
              key={task._id}
              currentTask={task}
              currentList={currentList}
              changeProgress={changeProgress}
              color={color}
            />
          ))}
        </>
      )}
      <TaskForm currentList={currentList} color={color} />
      <div className="h-1 w-full bg-border dark:bg-night-border">
        <div
          className={`h-1 transition-all`}
          style={{ width: `${progress}%`, backgroundColor: `${color}` }}
        ></div>
      </div>
    </div>
  );
};
