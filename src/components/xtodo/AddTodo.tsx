import { FC, useState } from "react";
import { FaUpload } from "react-icons/fa";

type Props = {
  handleSubmit: (value: string) => void;
};

export const AddTodo: FC<Props> = ({ handleSubmit }) => {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(text);
        setText("");
      }}
    >
      <label htmlFor="add-todo">Enter a new todo item</label>
      <div className="add-todo">
        <input
          type="text"
          className="w-full p-2 rounded-sm border-solid border-2 border-slate-800"
          id="add-todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <label hidden htmlFor="add-todo-submit">
        Submit
      </label>
      <button
        id="add-todo-submit"
        className="min-w-12 min-h-12 border-2late-300 border-2 rounded-md cursor-pointer flex justify-center items-center bg-slate-100 text-slate-500 focus:text-lime-500 hover:text-lime-500"
      >
        <FaUpload />
      </button>
    </form>
  );
};
