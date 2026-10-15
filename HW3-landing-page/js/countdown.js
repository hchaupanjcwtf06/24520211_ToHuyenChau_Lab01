
export function getRemainingTime(targetTimestamp, now = Date.now()) {
    const target = Date.parse(targetTimestamp);
  
    if (!Number.isFinite(target)) {
      throw new TypeError("Invalid countdown timestamp.");
    }
  
    const remainingMs = Math.max(0, target - now);
    const totalSeconds = Math.floor(remainingMs / 1000);
  
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
      expired: remainingMs === 0
    };
  }
  
  export function startCountdown(targetTimestamp, onUpdate) {
    let timerId = null;
    let stopped = false;
  
    function tick() {
      if (stopped) return;
  
      const remaining = getRemainingTime(targetTimestamp);
      onUpdate(remaining);
  
      if (remaining.expired) {
        stop();
      }
    }
  
    function stop() {
      stopped = true;
  
      if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
      }
    }
  
    tick();
  
    if (!stopped) {
      timerId = setInterval(tick, 250);
    }
  
    return stop;
  }
  