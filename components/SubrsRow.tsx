import { ChevronUpIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";
import Avatars from "./Avatars";

type Props = {
  topic: string;
  index: number;
};

function SubrsRow({ topic, index }: Props) {
  return (
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-green-400" />
      <Avatars seed={`/subrs/${topic}`} />

      <p className="flex-1 truncate">{topic.slice(0, 18)}</p>

      <Link href={`/subrs/${topic}`}>
        <div className="cursor-pointer rounded-full bg-red-500 px-3 text-white">
          View
        </div>
      </Link>
    </div>
  );
}

export default SubrsRow;
