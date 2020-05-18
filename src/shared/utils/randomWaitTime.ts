export const randomWaitTimeFactory = (maxTime: number = 1000) => () => Math.ceil(Math.random() * maxTime);
