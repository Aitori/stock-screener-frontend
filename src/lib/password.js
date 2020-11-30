const getObs1 = () => {
  const currDate = new Date();
  const obs1 = currDate.getMonth();
  return obs1;
}

const getObs2 = () => {
  const currDate = new Date();
  const obs2 = currDate.getDate() % 2 ? "avi" : "alb";
  return obs2;
}

const getObs3 = () => {
  const currDate = new Date();
  const obs2 = currDate.getHours() % 2 ? true : false;
  return obs2;
}

export { getObs1, getObs2, getObs3 };
