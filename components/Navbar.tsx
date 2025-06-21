import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 p-4 bg-gray-100 shadow">
      <Link className="hover:underline" href={"/"}>
        Home
      </Link>
      <Link className="hover:underline" href={"/my-task"}>
        Mytask
      </Link>
      <Link className="hover:underline" href={"/add-task"}>
        AddTask
      </Link>
    </div>
  );
};

export default Navbar;
