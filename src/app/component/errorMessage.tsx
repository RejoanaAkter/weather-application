"use client";

import { MdErrorOutline, MdOutlineDoNotDisturb } from "react-icons/md";

interface Props {
  type: "city" | "network";
  message: string;
}

export const ErrorMessage = ({ type, message }: Props) => {

  if (type === "city") {
    return (
      <>
        <div className="mt-10 flex justify-center">
          <MdErrorOutline size={60} />
        </div>
        <div className="mt-6 flex justify-center">
          <p className="font-semibold text-sm sm:text-base">{message}</p>
        </div>
      </>
    );
  }

  if (type === "network") {
    return (
      <>
        <div className="mt-10 flex justify-center">
          <MdOutlineDoNotDisturb size={100} />
        </div>

        <div className="mt-4 flex justify-center">
          {" "}
          <p className="text-xl font-semibold">Something went wrong</p>
        </div>
        <div className="mt-4 flex justify-center">
          <p className="font-semibold text-sm sm:text-base">{message}</p>
        </div>
      </>
    );
  }

  return null;
};
