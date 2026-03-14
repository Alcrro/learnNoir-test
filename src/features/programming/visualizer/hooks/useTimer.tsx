import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

const useTimer = (
  timer: number,
  setTimer: Dispatch<SetStateAction<number>>,
) => {
  const navigate = useNavigate();
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
};

export default useTimer;
