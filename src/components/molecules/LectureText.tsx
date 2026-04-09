import useTypewriter from "../../hooks/useTypewriter";

const LectureText = ({ text, isOpen }: { text: string; isOpen: boolean }) => {
	const typedText = useTypewriter(text, isOpen, 100);
	return <p>{typedText}</p>;
};

export default LectureText;
