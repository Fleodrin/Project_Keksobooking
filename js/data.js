export const MARKERS_COUNT = 10;

let data = [];

export const saveLocalData = (value) => {
  data = value;
};

export const getLocalDataMax = () => data.slice(0, MARKERS_COUNT);

export const getLocalData = () => data;
