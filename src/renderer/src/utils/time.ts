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
    seconds: Math.round((remainingTime % 3600000) / 1000) % 60000
  };
}

export function getTime(remainingTime: number): Time {
  return {
    hours: Math.floor(remainingTime / 3600000),
    minutes: Math.floor((remainingTime / (1000 * 60)) % 60),
    seconds: Math.round(remainingTime / 1000) % 60
  };
}

export function timeToUnix(time: Time): number {
  return time.hours * 3600000 + time.minutes * 60000 + time.seconds * 1000;
}

export function getTimeWithoutHours(remainingTime: number): Omit<Time, "hours"> {
  return {
    minutes: Math.floor(remainingTime / (1000 * 60)),
    seconds: Math.round(remainingTime / 1000) % 60
  };
}

export function getTimeLiteral(time: Time | Omit<Time, "hours"> | number): string {
  // when the time variable is number, it's only able to return HH:mm format.
  if (typeof time === "number") {
    return getTimeLiteral(getTimeWithoutHours(time));
  }

  if ((time as Time).hours) {
    return `${(time as Time).hours.toString().padStart(2, "0")}:${time.minutes
      .toString()
      .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
  }

  return `${time.minutes.toString().padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`;
}
