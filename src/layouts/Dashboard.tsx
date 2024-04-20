import { TrashIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const tasks = [];

  return (
    <main className="h-[calc(100vh-60px)] p-4 text-black dark:bg-night-bg dark:text-white">
      <div className="mx-auto max-w-screen-md">
        <h1 className="mt-4 text-3xl font-bold">Dashboard</h1>
        <form className="mt-4 flex w-full gap-2">
          <input
            className="text-md flex-grow rounded-lg border bg-hover p-2 focus:outline-primary dark:border-night-border dark:bg-night-hover dark:focus:outline-none dark:focus:outline-primary"
            type="text"
            placeholder="Enter your task here"
          />
          <button className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-hover-primary dark:bg-primary">
            Add Task
          </button>
        </form>

        {tasks.length > 0 ? (
          <div className="mt-4 ">
            {tasks.map(task => (
              <div className="group mb-2 flex w-full items-center rounded-lg border px-4 py-3 dark:border-night-border">
                <input className="mr-2" type="checkbox" />
                <p>{task.task}</p>
                <button className="ml-auto opacity-0 group-hover:opacity-100">
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex flex-grow flex-col items-center justify-center rounded-lg border py-14 text-center dark:border-night-border">
            <h3 className="text-lg font-bold">Add tasks</h3>
            <p className="text-gray-text">
              You don't have any tasks yet. Enter your first task in the field
              above!
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
