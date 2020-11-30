import { getObs1, getObs2, getObs3 } from "../../lib/password";

const retPass = () => {
  return getObs3() ? getObs2() + getObs1() : getObs1() + getObs2();
};

export { retPass };
