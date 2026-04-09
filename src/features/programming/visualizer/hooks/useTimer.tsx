import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useTimer = () => {
	const navigate = useNavigate();

	const [timer, setTimer] = useState<number>(0);
	useEffect(() => {
		if (timer <= 0) return;

		const interval = setInterval(() => {
			setTimer((t) => t - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timer, setTimer]);

	useEffect(() => {
		if (timer === 0) navigate("/");
	}, [timer, navigate]);

	return timer;
};

export default useTimer;
