import { getObs1, getObs2, getObs3, getObs4 } from "../../lib/password";

const retPass = () => {
  return getObs3() ? getObs2() + getObs4() + getObs1() : getObs1() + getObs2() + getObs4();
};

export { retPass };
