"use client";
import { WordType } from "@/types/Types";
import TableItem from "./TableItem";
import { motion } from "framer-motion";

const TableDisplay = ({ words }: { words: WordType[] }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      <div className="px-1 xs:px-4 pb-4 bg-white overflow-x-auto">
        <div className="xs:min-w-[1100px] min-w-[1750px]">
          <div className="flex items-center mb-1 ">
            <div className="flex-1 grid grid-cols-5">
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">語句 </div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">意味 </div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">例文</div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">例文訳</div>
              <div className="col-span-1 font-bold text-gray-400 text-sm text-center">メモ</div>
            </div>
          </div>
          <div className="space-y-1">
            {words.map((word) => (
              <TableItem key={word.id} word={word} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TableDisplay;
