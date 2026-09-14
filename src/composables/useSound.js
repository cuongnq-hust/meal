// Web Audio API Synthesizer for CS:GO Case Opening Sound Effects
import { ref } from 'vue'

const isMuted = ref(localStorage.getItem('csgo_food_muted') === 'true')

export function useSound() {
  let audioCtx = null

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (AudioContextClass) {
        audioCtx = new AudioContextClass()
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    return audioCtx
  }

  function toggleMute() {
    isMuted.value = !isMuted.value
    localStorage.setItem('csgo_food_muted', isMuted.value.toString())
  }

  // CS:GO Case item passing needle tick
  function playTick(speedMultiplier = 1) {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      // CS:GO mechanical clicking frequency
      const freq = 1200 + Math.min(speedMultiplier * 200, 800)
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.025)

      gain.gain.setValueAtTime(0.28, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.03)
    } catch (e) {
      console.warn('Audio tick error', e)
    }
  }

  // Heavy mechanical crate unlock sound
  function playCrateOpen() {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime

      // 1. Low mechanical thud
      const bassOsc = ctx.createOscillator()
      const bassGain = ctx.createGain()
      bassOsc.type = 'sine'
      bassOsc.frequency.setValueAtTime(140, now)
      bassOsc.frequency.exponentialRampToValueAtTime(35, now + 0.3)

      bassGain.gain.setValueAtTime(0.6, now)
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

      bassOsc.connect(bassGain)
      bassGain.connect(ctx.destination)
      bassOsc.start(now)
      bassOsc.stop(now + 0.36)

      // 2. Metallic latch click
      const latchOsc = ctx.createOscillator()
      const latchGain = ctx.createGain()
      latchOsc.type = 'sawtooth'
      latchOsc.frequency.setValueAtTime(800, now + 0.05)
      latchOsc.frequency.exponentialRampToValueAtTime(200, now + 0.15)

      latchGain.gain.setValueAtTime(0.25, now + 0.05)
      latchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)

      latchOsc.connect(latchGain)
      latchGain.connect(ctx.destination)
      latchOsc.start(now + 0.05)
      latchOsc.stop(now + 0.22)
    } catch (e) {
      console.warn('Audio crate open error', e)
    }
  }

  // Winning item reveal sound tailored to rarity
  function playWinSound(rarity = 'consumer') {
    if (isMuted.value) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime

      if (rarity === 'gold' || rarity === 'covert') {
        // Legendary triumphant CS:GO fanfare chord
        const notes = rarity === 'gold' 
          ? [523.25, 659.25, 783.99, 1046.50, 1318.51] // C5, E5, G5, C6, E6
          : [440, 554.37, 659.25, 880]                 // A4, C#5, E5, A5

        notes.forEach((freq, index) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = rarity === 'gold' ? 'sawtooth' : 'sine'
          osc.frequency.setValueAtTime(freq, now + index * 0.08)

          const startTime = now + index * 0.08
          gain.gain.setValueAtTime(0.001, startTime)
          gain.gain.linearRampToValueAtTime(0.25, startTime + 0.05)
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2)

          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(startTime)
          osc.stop(startTime + 1.3)
        })
      } else if (rarity === 'classified' || rarity === 'restricted') {
        // High quality chord
        const notes = [440, 554.37, 659.25]
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(freq, now + idx * 0.06)

          const startTime = now + idx * 0.06
          gain.gain.setValueAtTime(0.2, startTime)
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6)

          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(startTime)
          osc.stop(startTime + 0.7)
        })
      } else {
        // Standard item reveal chime
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(587.33, now) // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15) // A5

        gain.gain.setValueAtTime(0.2, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 0.45)
      }
    } catch (e) {
      console.warn('Audio win error', e)
    }
  }

  return {
    isMuted,
    toggleMute,
    playTick,
    playCrateOpen,
    playWinSound
  }
}
