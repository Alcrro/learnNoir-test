import { type FC } from "react";
import DefaultButton from "./DefaultButton";
import { ChevronLeft } from "lucide-react";

type ExtendButtonProps = {
  active: boolean;
  toggle: () => void;
};
const ExtendButton: FC<ExtendButtonProps> = ({ active, toggle }) => {
  return (
    <DefaultButton
      variant="icon"
      size="icon"
      onClick={toggle}
      className={`xl:hidden ${active ? "rotate-180 " : "text-black rotate-0 bg-gray-400"} rounded-xl`}
    >
      <ChevronLeft
        className={`size-8 transition-transform duration-1000  ${active ? "rotate-0" : ""}`}
      />
    </DefaultButton>
  );
};

export default ExtendButton;
