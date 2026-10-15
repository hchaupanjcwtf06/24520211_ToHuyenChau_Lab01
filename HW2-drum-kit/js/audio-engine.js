
/**
 * Audio Engine
 * Responsibilities:
 * - Load and manage drum sound sources.
 * - Play sounds independently of the DOM.
 * - Allow overlapping sounds (polyphonic playback).
 * - Handle missing sources and playback errors.
 */

export class AudioEngine {
    constructor(soundPaths = {}) {
      this.soundPaths = new Map(Object.entries(soundPaths));
      this.activeAudios = new Set();
    }
  
    /**
     * Play a sound by its identifier.
     * Each call creates a new Audio instance so sounds can overlap.
     */
    play(soundId) {
      const source = this.soundPaths.get(soundId);
  
      if (!source) {
        console.warn(`AudioEngine: unknown sound "${soundId}".`);
        return null;
      }
  
      const audio = new Audio(source);
      this.activeAudios.add(audio);
  
      const cleanup = () => {
        this.activeAudios.delete(audio);
        audio.removeEventListener("ended", cleanup);
        audio.removeEventListener("error", cleanup);
      };
  
      audio.addEventListener("ended", cleanup);
      audio.addEventListener("error", cleanup);
  
      const playback = audio.play();
  
      if (playback && typeof playback.catch === "function") {
        playback.catch((error) => {
          cleanup();
          console.warn(`AudioEngine: could not play "${soundId}".`, error);
        });
      }
  
      return audio;
    }
  
    /**
     * Stop all currently playing sounds.
     */
    stopAll() {
      for (const audio of this.activeAudios) {
        audio.pause();
        audio.currentTime = 0;
      }
  
      this.activeAudios.clear();
    }
  }
  