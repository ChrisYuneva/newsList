export const getTime = (time: number) => {
  const correctTime = new Date(time * 1000);
  
  return {
    date: correctTime.toISOString().slice(0, 10).split('-').reverse().join('.'),
    time: correctTime.toLocaleTimeString(),
  };
};
