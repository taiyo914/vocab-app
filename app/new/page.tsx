"use client";
import Link from "next/link";
import { useState, useEffect, FormEvent, ChangeEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import useUserIdStore from "@/store/userIdStore";
import { ArrowUturnLeftIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface FormData {
  word: string;
  meaning: string;
  example: string;
  example_translation: string;
  memo: string;
  index: number;
}

const initialValue = {
  word: "",
  meaning: "",
  example: "",
  example_translation: "",
  memo: "",
  index: 0,
};

export default function Form() {
  // const  userId  = useUserIdStore(state => state.userId)
  // もしかしてzustandでのグローバル管理は意味ない(しないほうが)...?
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState<FormData>(initialValue);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        alert(`ユーザー情報の取得に失敗しました: ${userError?.message}`);
        return;
      } else {
        setUserId(user.id);
      }
    };
    getUserId();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      index: Number(e.target.value),
    }));
  };

  const saveDataToDatabase = async (data: FormData) => {
    if (!userId) {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        alert(`ユーザー情報の取得に失敗しました: ${userError?.message}`);
        return "failed";
      } else{
        setUserId(user.id)
      }
    }

    const { error: insertError } = await supabase
      .from("words")
      .insert([{ ...data, user_id: userId }]);
    if (insertError) {
      alert("単語の追加に失敗しました...: " + insertError.message);
      return "failed"
    } else {
      return "succeeded"
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await saveDataToDatabase(formData);
    if (result === "succeeded") {
      router.push("/");
    }
  };

  const handleSubmitAndContinue = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await saveDataToDatabase(formData);
    if(result === "succeeded") {
      alert("単語の追加に成功しました。次の単語を入力してください")
      setFormData(initialValue);}
  };

  return (
    <>
      <div className="xs:px-5 px-3 pt-5 mx-auto max-w-lg">
        <div className="flex justify-between xs:items-end items-center mb-4 px-1">
          <Link
            href="/"
            className="
              text-gray-500 
              p-1 px-2 rounded-2xl
              hover:text-gray-700 hover:bg-gray-200 transition duration-200 
              flex items-center space-x-1"
          >
            <ArrowUturnLeftIcon className="h-4" />
            <div>戻る</div>
          </Link>
          <Link
            href="new/import"
            className="
              p-3 rounded-lg font-semibold
              bg-gray-900 text-white 
              shadow 
              hover:bg-gray-700 transition duration-300
              flex space-x-1"
          >
            <ArrowDownTrayIcon className="h-5" />
            <span className=""> {"CSV/TSV"}</span>からインポート
          </Link>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="xs:p-8 p-6 border bg-white rounded-lg shadow-lg">
            <div className="mb-5">
              <label className="block text-gray-700 font-bold ml-1" htmlFor="word">
                語句
              </label>
              <input
                type="text"
                name="word"
                id="word"
                value={formData.word}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
                autoComplete="off"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-bold ml-1" htmlFor="meaning">
                意味
              </label>
              <input
                type="text"
                name="meaning"
                id="meaning"
                value={formData.meaning}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-none focus:border-gray-700 focus:border-1 transition-colors"
                autoComplete="off"
              />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-bold ml-1" htmlFor="example">
                例文
              </label>
              <textarea
                name="example"
                id="example"
                value={formData.example}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-none focus:border-gray-700 focus:border-1 transition-colors
                  h-20"
                autoComplete="off"
              ></textarea>
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-bold ml-1" htmlFor="example_translation">
                例文訳
              </label>
              <textarea
                name="example_translation"
                id="example_translation"
                value={formData.example_translation}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-none focus:border-gray-700 focus:border-1 transition-colors
                  h-20"
                autoComplete="off"
              ></textarea>
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-bold ml-1" htmlFor="memo">
                メモ
              </label>
              <textarea
                name="memo"
                id="memo"
                value={formData.memo}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-none focus:border-gray-700 focus:border-1 transition-colors 
                  h-20"
                autoComplete="off"
              ></textarea>
            </div>

            <div className="mb-5">
              <div className="flex">
                <label className="block text-gray-700 font-bold mb-1 ml-1">優先度 </label>
                <div className="text-gray-500  pl-2">{formData.index}</div>
              </div>
              <div className="flex">
                <input
                  type="range"
                  name="index"
                  min="0"
                  max="10"
                  value={formData.index}
                  onChange={handleSliderChange}
                  className="
                    w-full bg-gray-200 rounded-lg  cursor-pointer transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 my-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded-full transition duration-300"
            >
              追 加
            </button>
            <button
              type="button"
              onClick={handleSubmitAndContinue}
              className="w-full py-3 px-4 bg-gray-300 hover:bg-gray-400 text-black font-bold rounded-full transition duration-300"
            >
              追加して新規作成
            </button>
          </div>
        </form>

        <div className="h-80"></div>

      </div>
    </>
  );
}
