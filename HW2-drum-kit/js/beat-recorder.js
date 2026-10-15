
export class BeatRecorder {
    constructor() {
      this.events = [];
      this.isRecording = false;
      this.recordingStartTime = 0;
      this.nextSequence = 0;
  
      this.replayTimers = [];
      this.isReplaying = false;
      this.replayToken = 0;
    }
  
    startRecording() {
      this.stopReplay();
  
      this.events = [];
      this.nextSequence = 0;
      this.recordingStartTime = performance.now();
      this.isRecording = true;
    }
  
    record(padKey) {
      if (!this.isRecording || this.isReplaying) {
        return;
      }
  
      this.events.push({
        key: padKey,
        timestamp: performance.now() - this.recordingStartTime,
        sequence: this.nextSequence++
      });
    }
  
    stopRecording() {
      this.isRecording = false;
  
      return this.getRecording();
    }
  
    getRecording() {
      return this.events.map((event) => ({ ...event }));
    }
  
    stopReplay() {
      // Invalidate callbacks from any previous replay.
      this.replayToken++;
  
      for (const timer of this.replayTimers) {
        clearTimeout(timer);
      }
  
      this.replayTimers = [];
      this.isReplaying = false;
    }
  
    replay(onBeat) {
      this.stopReplay();
  
      if (this.events.length === 0) {
        return;
      }
  
      this.isReplaying = true;
      const token = this.replayToken;
  
      const orderedEvents = [...this.events].sort(
        (a, b) =>
          a.timestamp - b.timestamp ||
          a.sequence - b.sequence
      );
  
      const lastTimestamp =
        orderedEvents[orderedEvents.length - 1].timestamp;
  
      for (const event of orderedEvents) {
        const timer = setTimeout(() => {
          if (token !== this.replayToken) {
            return;
          }
  
          onBeat(event.key);
        }, event.timestamp);
  
        this.replayTimers.push(timer);
      }
  
      const finishTimer = setTimeout(() => {
        if (token === this.replayToken) {
          this.replayTimers = [];
          this.isReplaying = false;
        }
      }, lastTimestamp + 10);
  
      this.replayTimers.push(finishTimer);
    }
  }
  