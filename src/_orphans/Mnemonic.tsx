import { type FC } from "react";

type MnemonicProps = {
  mnemonic: string;
};
const Mnemonic: FC<MnemonicProps> = ({ mnemonic }) => {
  return <div className="step-mnemonic">💡 {mnemonic}</div>;
};

export default Mnemonic;
