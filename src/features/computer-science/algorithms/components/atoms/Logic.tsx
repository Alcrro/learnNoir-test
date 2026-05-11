import { type FC } from "react";

type Props = {
  logic: string;
};
const Logic: FC<Props> = ({ logic }) => {
  return (
    <div className="step-logic">
      <span>🔎 Logică</span>
      {logic}
    </div>
  );
};

export default Logic;
