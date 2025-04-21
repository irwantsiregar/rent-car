import { Tooltip } from "@heroui/react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { FiEye, FiPlus } from "react-icons/fi";

interface IButtonsActionPropTypes {
  onPressButtonAdd: () => void;
  onPressButtonDetail: () => void;
  onPressButtonUpdate: () => void;
  onPressButtonDelete: () => void;
}

const ButtonsAction = (props: IButtonsActionPropTypes) => {
  const {
    onPressButtonAdd,
    onPressButtonDelete,
    onPressButtonUpdate,
    onPressButtonDetail,
  } = props;

  return (
    <div className="relative flex items-center justify-center gap-2">
      <Tooltip content="Add" color="secondary">
        <span
          onClick={onPressButtonAdd}
          className="cursor-pointer text-lg text-default-400 active:opacity-50"
        >
          <FiPlus />
        </span>
      </Tooltip>
      <Tooltip color="primary" content="Edit">
        <span
          onClick={onPressButtonUpdate}
          className="cursor-pointer text-lg text-default-400 active:opacity-50"
        >
          <CiEdit className="text-xl" />
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Delete">
        <span
          onClick={onPressButtonDelete}
          className="cursor-pointer text-lg text-danger active:opacity-50"
        >
          <CiTrash />
        </span>
      </Tooltip>
    </div>
  );
};

export default ButtonsAction;
