class Timer {
  constructor(duration, options = {}) {
    this.duration = duration;
    this.remainingTime = duration;
    this.isRunning = false;
    this.options = options;

    if (this.options.onStart) {
      this.onStart = this.options.onStart;
    }

    if (this.options.onTick) {
      this.onTick = this.options.onTick;
    }

    if (this.options.onComplete) {
      this.onComplete = this.options.onComplete;
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.timerId = setInterval(() => {
        this.remainingTime--;
        if (this.onTick) {
          this.onTick(this.remainingTime);
        }
        if (this.remainingTime <= 0) {
          this.stop();
        }
      }, 1000);

      if (this.onStart) {
        this.onStart(this.duration);
      }
    }
  }

  stop() {
    if (this.isRunning) {
      clearInterval(this.timerId);
      this.isRunning = false;

      if (this.onComplete) {
        this.onComplete();
      }
    }
  }

  reset() {
    this.remainingTime = this.duration;
    if (this.isRunning) {
      clearInterval(this.timerId);
      this.isRunning = false;
    }
  }
}
