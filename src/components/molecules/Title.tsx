import { type FC } from "react";

type TitleProps = { title: string };
const Title: FC<TitleProps> = ({ title }) => {
  return <h3>{title}</h3>;
};

export default Title;
