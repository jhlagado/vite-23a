import { FC, useState } from "react";
import { FaUpload } from "react-icons/fa";

type Props = {
  handleSubmit: (value: string) => void;
};

export const AddTodo: FC<Props> = ({ handleSubmit }) => {
  const [text, setText] = useState("");
  return (
    <form
      className=""
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(text);
        setText("");
      }}
    >
      <label hidden htmlFor="add-todo">
        Enter a new todo item
      </label>
      <input
        type="text"
        className="w-full p-2 size-14 rounded-md border-solid border-2 border-slate-200"
        id="add-todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter new todo"
      />
      <label hidden htmlFor="add-todo-submit">
        Submit
      </label>
      <button
        id="add-todo-submit"
        disabled={!text}
        className="ml-4 min-w-12 min-h-12 border-2late-300 border-2 rounded-md cursor-pointer flex justify-center items-center bg-slate-100 text-slate-500 disabled:text-slate-400 focus:text-lime-500 hover:text-lime-500"
      >
        <FaUpload />
      </button>
    </form>
  );
};
