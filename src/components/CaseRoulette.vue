<template>
  <div class="w-full flex flex-col items-center">
    
    <!-- Case Header / Key Status -->
    <div class="w-full flex items-center justify-between mb-2.5 px-1 sm:px-2">
      <div class="flex items-center gap-2">
        <span class="text-[11px] sm:text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
          KEY: MIỄN PHÍ
        </span>
        <span class="text-xs text-slate-400 hidden sm:inline">
          Bấm Mở Hòm để quyết định món ăn
        </span>
      </div>

      <!-- Quick Spin Mode Switch -->
      <label class="flex items-center gap-1.5 sm:gap-2 cursor-pointer text-xs text-slate-300 hover:text-white select-none">
        <input
          type="checkbox"
          v-model="isFastSpin"
          :disabled="isSpinning"
          class="w-3.5 h-3.5 rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
        />
        <span class="text-[11px] sm:text-xs">Quay nhanh (1.5s)</span>
      </label>
    </div>

    <!-- ROULETTE CONTAINER -->
    <div
      ref="rouletteContainer"
      class="relative w-full h-[205px] sm:h-[260px] bg-[#0c0f17] rounded-xl border border-slate-700/80 shadow-2xl overflow-hidden select-none"
    >
      <!-- Background Cyber / Grid pattern -->
      <div class="absolute inset-0 bg-csgo-stripes opacity-40 pointer-events-none"></div>

      <!-- Left & Right Shadow Gradient Vignette -->
      <div class="absolute inset-y-0 left-0 w-10 sm:w-36 bg-gradient-to-r from-[#0c0f17] via-[#0c0f17]/90 to-transparent z-20 pointer-events-none"></div>
      <div class="absolute inset-y-0 right-0 w-10 sm:w-36 bg-gradient-to-l from-[#0c0f17] via-[#0c0f17]/90 to-transparent z-20 pointer-events-none"></div>

      <!-- TOP NEEDLE (CS:GO Yellow/Red Arrow Pointer) -->
      <div
        ref="topNeedleEl"
        class="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
      >
        <div class="w-0 h-0 border-l-[10px] sm:border-l-[14px] border-l-transparent border-r-[10px] sm:border-r-[14px] border-r-transparent border-t-[15px] sm:border-t-[20px] border-t-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"></div>
        <div class="w-[2px] h-[175px] sm:h-[230px] bg-gradient-to-b from-amber-400 via-amber-400/40 to-transparent opacity-80"></div>
      </div>

      <!-- BOTTOM NEEDLE -->
      <div
        ref="bottomNeedleEl"
        class="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
      >
        <div class="w-0 h-0 border-l-[10px] sm:border-l-[14px] border-l-transparent border-r-[10px] sm:border-r-[14px] border-r-transparent border-b-[15px] sm:border-b-[20px] border-b-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"></div>
      </div>

      <!-- HORIZONTAL STRIP OF FOOD CARDS (GPU Accelerated Layer) -->
      <div
        ref="stripEl"
        class="absolute top-0 left-0 h-full flex items-center gap-[10px] sm:gap-[12px] px-[10px] sm:px-[12px] will-change-transform"
        style="transform-style: preserve-3d; backface-visibility: hidden; contain: layout paint;"
        :style="stripStyle"
      >
        <ItemCard
          v-for="(item, idx) in displayStrip"
          :key="item.uniqueKey || `item-${idx}`"
          :item="item"
          size="roulette"
          :isHighlighted="!isSpinning && winningItem && winningIndex === idx"
        />
      </div>

    </div>

    <!-- CONTROLS & UNBOX BUTTON -->
    <div class="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
      <button
        @click="startSpin"
        :disabled="isSpinning"
        class="w-full sm:w-auto min-w-[260px] py-3.5 sm:py-4 px-8 rounded-xl font-display text-base sm:text-lg tracking-wider uppercase font-bold text-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 shadow-lg select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        :class="isSpinning ? 'bg-slate-800 border-slate-700' : 'csgo-btn-primary'"
      >
        <span v-if="!isSpinning" class="text-xl">🔓</span>
        <span v-else class="animate-spin text-xl">⏳</span>
        <span>{{ isSpinning ? 'ĐANG MỞ HÒM...' : 'MỞ HÒM (OPEN CONTAINER)' }}</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import ItemCard from './ItemCard.vue'
import { useCaseSpinner } from '../composables/useCaseSpinner.js'
import { useSound } from '../composables/useSound.js'

const props = defineProps({
  currentCase: {
    type: Object,
    required: true
  },
  isAuthenticOdds: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['item-won'])

function getMetrics() {
  const isSmall = typeof window !== 'undefined' && window.innerWidth < 640
  const cardWidth = isSmall ? 138 : 190
  const gap = isSmall ? 10 : 12
  return { cardWidth, gap, stride: cardWidth + gap }
}

const rouletteContainer = ref(null)
const stripEl = ref(null)
const topNeedleEl = ref(null)
const bottomNeedleEl = ref(null)

const isSpinning = ref(false)
const isFastSpin = ref(false)

const currentTranslateX = ref(0)
const transitionDuration = ref(0)
const transitionTimingFunction = ref('cubic-bezier(0.1, 0.9, 0.2, 1.0)')

const displayStrip = ref([])
const winningItem = ref(null)
const winningIndex = ref(62)

const { playTick, playCrateOpen, playWinSound } = useSound()
const { pickRandomItem, generateStrip, triggerCelebration } = useCaseSpinner()

let animationFrameId = null
let lastTickIndex = -1

// Pure mathematical cubic bezier solver - zero layout thrashing or getComputedStyle
function createBezier(x1, y1, x2, y2) {
  const cx = 3.0 * x1
  const bx = 3.0 * (x2 - x1) - cx
  const ax = 1.0 - cx - bx

  const cy = 3.0 * y1
  const by = 3.0 * (y2 - y1) - cy
  const ay = 1.0 - cy - by

  function sampleCurveX(t) { return ((ax * t + bx) * t + cx) * t }
  function sampleCurveY(t) { return ((ay * t + by) * t + cy) * t }
  function sampleCurveDerivativeX(t) { return (3.0 * ax * t + 2.0 * bx) * t + cx }

  function solveCurveX(x) {
    let t0, t1, t2, x2Val, d2, i
    for (t2 = x, i = 0; i < 8; i++) {
      x2Val = sampleCurveX(t2) - x
      if (Math.abs(x2Val) < 1e-4) return t2
      d2 = sampleCurveDerivativeX(t2)
      if (Math.abs(d2) < 1e-5) break
      t2 = t2 - x2Val / d2
    }
    t0 = 0.0; t1 = 1.0; t2 = x
    if (t2 < t0) return t0
    if (t2 > t1) return t1
    while (t0 < t1) {
      x2Val = sampleCurveX(t2)
      if (Math.abs(x2Val - x) < 1e-4) return t2
      if (x > x2Val) t0 = t2
      else t1 = t2
      t2 = (t1 - t0) * 0.5 + t0
    }
    return t2
  }

  return function (x) {
    if (x <= 0) return 0
    if (x >= 1) return 1
    return sampleCurveY(solveCurveX(x))
  }
}

const csgoEaseOut = createBezier(0.1, 0.9, 0.2, 1.0)

// Direct DOM kick for needle without Vue re-renders
function triggerNeedleKick() {
  if (topNeedleEl.value) {
    topNeedleEl.value.classList.remove('needle-active')
    void topNeedleEl.value.offsetWidth // trigger DOM refresh for needle only
    topNeedleEl.value.classList.add('needle-active')
  }
}

// Haptic vibration feedback for mobile devices
function triggerVibrate(type = 'tick') {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'tick') {
        navigator.vibrate(8)
      } else if (type === 'win') {
        navigator.vibrate([40, 50, 60, 100])
      }
    } catch (e) {}
  }
}

// Initialize or reset strip for current case
function initializeStrip() {
  if (isSpinning.value) return

  const items = props.currentCase.items
  const idleItems = []
  for (let i = 0; i < 25; i++) {
    const it = items[i % items.length]
    idleItems.push({
      ...it,
      uniqueKey: `idle-${i}-${it.id}`
    })
  }
  displayStrip.value = idleItems
  transitionDuration.value = 0
  
  const { cardWidth, gap, stride } = getMetrics()
  const containerW = rouletteContainer.value ? rouletteContainer.value.clientWidth : (window.innerWidth < 640 ? 360 : 800)
  const center = containerW / 2
  currentTranslateX.value = - (2 * stride + (cardWidth / 2) + gap - center)
}

watch(() => props.currentCase.id, () => {
  if (!isSpinning.value) {
    initializeStrip()
  }
})

const stripStyle = computed(() => {
  return {
    transform: `translate3d(${currentTranslateX.value}px, 0, 0)`,
    transitionProperty: isSpinning.value ? 'transform' : 'none',
    transitionDuration: `${transitionDuration.value}s`,
    transitionTimingFunction: transitionTimingFunction.value
  }
})

// Mathematical tick loop using requestAnimationFrame - Zero reflow / 60-120fps smooth
function startTickLoop(startTime, durationMs, startX, endX, centerPoint, gap, stride) {
  function loop(now) {
    if (!isSpinning.value) return

    const elapsed = now - startTime
    const t = Math.min(1, Math.max(0, elapsed / durationMs))
    const progress = csgoEaseOut(t)
    const currentX = startX + (endX - startX) * progress

    const passedDistance = -currentX + centerPoint - gap
    const currentCardIdx = Math.floor(passedDistance / stride)

    if (currentCardIdx !== lastTickIndex && currentCardIdx >= 0) {
      lastTickIndex = currentCardIdx
      playTick()
      triggerVibrate('tick')
      triggerNeedleKick()
    }

    if (t < 1) {
      animationFrameId = requestAnimationFrame(loop)
    } else {
      finishSpin()
    }
  }

  animationFrameId = requestAnimationFrame(loop)
}

function startSpin() {
  if (isSpinning.value || !props.currentCase.items.length) return

  isSpinning.value = true
  playCrateOpen()

  const chosenWinningItem = pickRandomItem(props.currentCase.items)
  winningItem.value = chosenWinningItem

  const { strip, winningIndex: targetIndex } = generateStrip(props.currentCase.items, chosenWinningItem)
  winningIndex.value = targetIndex
  displayStrip.value = strip

  const { cardWidth, gap, stride } = getMetrics()
  const containerW = rouletteContainer.value ? rouletteContainer.value.clientWidth : (window.innerWidth < 640 ? 360 : 800)
  const centerPoint = containerW / 2

  // Start position (1st item centered)
  const startX = centerPoint - (cardWidth / 2) - gap
  transitionDuration.value = 0
  currentTranslateX.value = startX
  lastTickIndex = -1

  // Jitter calculation proportional to card width (lands realistically off-center within the winning card)
  const jitterRange = cardWidth * 0.65
  const randomJitter = (Math.random() - 0.5) * jitterRange
  const targetOffset = (targetIndex * stride) + (cardWidth / 2) + gap - centerPoint + randomJitter
  const endX = -targetOffset

  const duration = isFastSpin.value ? 1.5 : 5.5
  const durationMs = duration * 1000

  // Double requestAnimationFrame ensures the browser paints the reset position before starting the CSS transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      transitionDuration.value = duration
      transitionTimingFunction.value = 'cubic-bezier(0.1, 0.9, 0.2, 1.0)'
      currentTranslateX.value = endX

      const startTime = performance.now()
      startTickLoop(startTime, durationMs, startX, endX, centerPoint, gap, stride)
    })
  })
}

function finishSpin() {
  isSpinning.value = false
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  if (winningItem.value) {
    playWinSound(winningItem.value.rarity)
    triggerVibrate('win')
    triggerCelebration(winningItem.value.rarity)

    setTimeout(() => {
      emit('item-won', {
        item: winningItem.value,
        caseName: props.currentCase.name
      })
    }, 450)
  }
}

function handleResize() {
  if (!isSpinning.value) {
    initializeStrip()
  }
}

onMounted(() => {
  initializeStrip()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', handleResize)
})

defineExpose({
  startSpin,
  isSpinning
})
</script>
