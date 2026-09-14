<template>
  <div
    class="relative rounded-lg overflow-hidden border transition-all select-none flex flex-col group"
    style="transform: translateZ(0); backface-visibility: hidden;"
    :class="[
      cardSizeClasses,
      rarityBorderClass,
      rarityBgClass,
      isHighlighted ? 'ring-2 ring-amber-400 scale-[1.03] sm:scale-105 z-10' : 'hover:border-slate-400'
    ]"
  >
    <!-- Top StatTrak or Gold Tag -->
    <div class="absolute top-1 sm:top-1.5 left-1.5 sm:left-2 right-1.5 sm:right-2 flex justify-between items-center z-10 pointer-events-none">
      <span
        v-if="item.rarity === 'gold'"
        class="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest px-1 sm:px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40"
      >
        ★ RARE
      </span>
      <span
        v-else-if="item.statTrak || Math.random() < 0.15"
        class="text-[8px] sm:text-[9px] uppercase font-mono font-semibold tracking-wider text-orange-400"
      >
        StatTrak™
      </span>
      <span v-else></span>

      <span class="text-[9px] sm:text-[10px] font-mono opacity-60 text-slate-300">
        {{ wearBadge }}
      </span>
    </div>

    <!-- Center Food Visual & Glow -->
    <div class="relative flex-1 flex items-center justify-center p-2 sm:p-3 overflow-hidden">
      <!-- Glow behind emoji/food -->
      <div
        class="absolute w-12 sm:w-20 h-12 sm:h-20 rounded-full blur-lg sm:blur-xl opacity-30 transition-opacity group-hover:opacity-60 pointer-events-none"
        :style="{ backgroundColor: rarityInfo.color }"
      ></div>

      <div
        class="relative transform group-hover:scale-110 transition-transform duration-300"
        :class="emojiSizeClass"
      >
        {{ item.emoji || '🍲' }}
      </div>
    </div>

    <!-- Info Block -->
    <div class="p-1.5 sm:p-2.5 bg-[#141822] flex flex-col justify-between border-t border-white/5">
      <div>
        <p
          class="font-semibold text-[11px] sm:text-xs truncate transition-colors leading-tight"
          :class="rarityInfo.textColor"
          :title="item.name"
        >
          {{ item.name }}
        </p>
        <p class="text-[10px] sm:text-[11px] text-slate-400 truncate mt-0.5" :title="item.price || item.wear">
          {{ item.price || 'Giá bình dân' }}
        </p>
      </div>
    </div>

    <!-- CS:GO Characteristic Bottom Rarity Bar -->
    <div
      class="h-1 sm:h-1.5 w-full"
      :style="{ backgroundColor: rarityInfo.color }"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RARITIES } from '../data/defaultCases.js'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    default: 'normal' // 'roulette', 'normal', 'compact'
  },
  isHighlighted: {
    type: Boolean,
    default: false
  }
})

const rarityInfo = computed(() => {
  return RARITIES[props.item?.rarity] || RARITIES.consumer
})

const wearBadge = computed(() => {
  if (props.item.rarity === 'gold') return '★'
  return 'FN'
})

const cardSizeClasses = computed(() => {
  switch (props.size) {
    case 'roulette':
      return 'w-[138px] h-[180px] sm:w-[190px] sm:h-[225px] shrink-0'
    case 'compact':
      return 'w-[120px] h-[148px] sm:w-[140px] sm:h-[165px] shrink-0'
    case 'normal':
    default:
      return 'w-full h-[155px] sm:h-[180px]'
  }
})

const emojiSizeClass = computed(() => {
  switch (props.size) {
    case 'roulette':
      return 'text-4xl sm:text-6xl drop-shadow-md'
    case 'compact':
      return 'text-3xl sm:text-4xl drop-shadow-sm'
    case 'normal':
    default:
      return 'text-4xl sm:text-5xl drop-shadow-md'
  }
})

const rarityBorderClass = computed(() => {
  switch (props.item?.rarity) {
    case 'gold': return 'border-amber-500/80 bg-gradient-to-b from-amber-950/40 to-slate-900/90 shadow-lg shadow-amber-500/10'
    case 'covert': return 'border-red-600/70 bg-gradient-to-b from-red-950/40 to-slate-900/90 shadow-md shadow-red-600/10'
    case 'classified': return 'border-pink-600/70 bg-gradient-to-b from-pink-950/40 to-slate-900/90'
    case 'restricted': return 'border-purple-600/70 bg-gradient-to-b from-purple-950/40 to-slate-900/90'
    case 'milspec': return 'border-blue-600/70 bg-gradient-to-b from-blue-950/40 to-slate-900/90'
    case 'industrial': return 'border-sky-600/60 bg-gradient-to-b from-sky-950/30 to-slate-900/90'
    case 'consumer':
    default:
      return 'border-slate-700 bg-gradient-to-b from-slate-800/40 to-slate-900/90'
  }
})

const rarityBgClass = computed(() => {
  return ''
})
</script>
