import { color } from "framer-motion";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/16/solid";

const TopButtons = () => {
  return (
    <div className="p-3 xs:p-5 mx-auto max-w-[1200px]">
      <div className="flex jusity-center flex-col xs:flex-row xs:space-x-4 xl:space-x-10">
        <Link
          href="new"
          className="
            text-center font-semibold
            w-full xs:w-1/2 py-2   
            border rounded-md shadow-md 
            hover:bg-gray-200  transition-all duration-300 
            flex items-center justify-center space-x-1"
        >
          <PlusCircleIcon className="h-7"/>
          <div>単語を追加する</div>
          <div className="invisible w-7"></div>
        </Link>
        <Link
          href="review"
          className="
            text-center font-semibold 
            w-full xs:w-1/2 py-2 
            mt-2 xs:mt-0
            bg-blue-500 text-white
            rounded-md shadow-md 
            hover:bg-blue-400 transition-all duration-300
            flex items-center justify-center space-x-1"
        > 
          <PlayCircleIcon className="h-7"/>
          <div>ページを復習</div>
          <div className="invisible w-7"></div>
        </Link>
      </div>
    </div>
  );
};

export default TopButtons;
