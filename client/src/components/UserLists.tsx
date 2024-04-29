import { List } from "@/types";

type Props = { lists: List[] };

export const UserLists = ({ lists }: Props) => {
  return lists.map((list, i) => (
    <div
      key={i}
      className="mt-4 flex flex-col gap-2 rounded-md border p-4 dark:border-night-border"
    >
      <h3 className="font-semibold text-sm">{list.listTitle}</h3>
    </div>
  ));
};
