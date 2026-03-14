import { type FC } from "react";

type ExplanationProps = {
  explanation: string;
};
export const Explanation: FC<ExplanationProps> = ({ explanation }) => {
  return <div className="step-main">{explanation}</div>;
};
