const getObs1 = () => {
  const currDate = new Date();
  const obs1 = currDate.getMonth();
  return obs1;
};

const getObs2 = () => {
  const currDate = new Date();
  const obs2 = currDate.getDate() % 2 ? "avi" : "alb";
  return obs2;
};

const getObs3 = () => {
  const currDate = new Date();
  const obs2 = currDate.getHours() % 2 ? true : false;
  return obs2;
};
const getObs4 = () => {
  const currDate = new Date();
  const tt = currDate.getMinutes();
  const o = "3.14159265358979323846264338327950288419716939937510582097494";
  const p = o.charAt(tt);
  return p;
};

export { getObs1, getObs2, getObs3, getObs4 };
