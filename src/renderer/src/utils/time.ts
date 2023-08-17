type GetTimeWithObject = (remainingTime: number) => Time;

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function getTimeWithObject(remainingTime: number): Time {
  return {
    hours: Math.floor(remainingTime / 3600000),
    minutes: Math.floor((remainingTime % 3600000) / 60000),
    seconds: Math.floor(((remainingTime % 3600000) % 60000) / 1000)
  };
}
