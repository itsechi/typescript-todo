import { List } from '@/types';
import { TrashIcon } from '@heroicons/react/24/outline';

type Props = {
  lists: List[];
  deleteList: (id?: string) => void;
};

export const UserLists = ({ lists, deleteList }: Props) => {
  return lists.map((list, i) => (
    <div
      key={i}
      className="mt-4 flex flex-col gap-2 rounded-md border p-4 dark:border-night-border"
    >
      <div className="flex justify-between">
        <h3 className="font-semibold text-sm">{list.listTitle}</h3>
        <TrashIcon onClick={() => deleteList(list._id)} className="h-6 w-6" />
      </div>
    </div>
  ));
};
