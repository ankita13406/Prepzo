
import React from "react";

const DeleteAlertContent = ({ content, btnDelete }) => {
  return (
    <div className="p-5">
      <p className="text-[14px]" >{content}</p>
      <div className="flex justify-end mt-6">
        <button
          className="btn-small cursor-pointer"
          onClick={btnDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;

