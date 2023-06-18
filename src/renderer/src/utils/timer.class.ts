export class Timer {
  private remainingTime: number;
  private isRunnnig: boolean;

  constructor(time: number) {
    this.remainingTime = time;
    this.isRunnnig = false;
  }

  public getRemainingTime(): number {
    return this.remainingTime;
  }

  public setRemainingTime(time: number): void {
    this.remainingTime = time;
  }

  public getIsRunning(): boolean {
    return this.isRunnnig;
  }
  public setIsRunning(isRunning: boolean): void {
    this.isRunnnig = isRunning;
  }

  public countDown(): void {
    this.setIsRunning(true);
    const id = setInterval(() => {
      this.remainingTime -= 1000;
      // 0秒以下になったらタイマーを止める
      if (this.remainingTime <= 0) {
        clearInterval(id);
        this.setIsRunning(false);
      }
    }, 1000);
  }

  public countUp(): void {
    this.setIsRunning(true);
    const id = setInterval(() => {
      this.remainingTime += 1000;
    }, 1000);
  }

  public pause(): void {
    this.setIsRunning(false);
  }
}
