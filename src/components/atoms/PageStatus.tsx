import { statusBase, statusPadded, statusCenteredWrapper } from "../styles/statusVariants";

type Props = {
	message: string;
	padded?: boolean;
	centered?: boolean;
};

const PageStatus = ({ message, padded = true, centered = false }: Props) => {
	const text = (
		<p className={`${statusBase} ${!centered && padded ? statusPadded : ""}`.trim()}>
			{message}
		</p>
	);
	if (centered) return <div className={statusCenteredWrapper}>{text}</div>;
	return text;
};

export default PageStatus;
