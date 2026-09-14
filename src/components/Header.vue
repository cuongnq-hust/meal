<template>
  <header class="border-b border-slate-800 bg-[#0d1117]/95 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3.5">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
      
      <!-- Brand / Logo -->
      <div class="flex items-center gap-2 sm:gap-3 min-w-0">
        <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-lg sm:text-2xl shadow-lg shadow-amber-500/20 border border-amber-300/40 shrink-0">
          🍜
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-1.5 sm:gap-2">
            <span class="font-display font-black text-base sm:text-xl lg:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 truncate">
              HÔM NAY ĂN GÌ?
            </span>
            <span class="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
              CS:GO
            </span>
          </div>
          <p class="text-[10px] sm:text-xs text-slate-400 truncate hidden xs:block sm:block">
            Vòng quay mở hòm quyết định bữa ăn
          </p>
        </div>
      </div>

      <!-- Actions & Controls -->
      <div class="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0">

        <!-- Probability Toggle (CS:GO Authentic vs Fair) -->
        <button
          @click="$emit('toggle-odds')"
          class="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer select-none"
          :class="isAuthenticOdds
            ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20' 
            : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'"
          :title="isAuthenticOdds ? 'Tỉ lệ CS:GO thực tế (Đồ hiếm khó ra)' : 'Tỉ lệ đều (Mọi món tỉ lệ ngang nhau)'"
        >
          <Sparkles class="w-3.5 h-3.5 text-amber-400" />
          <span class="hidden sm:inline">{{ isAuthenticOdds ? 'Tỉ Lệ CS:GO' : 'Tỉ Lệ Đều (Fair)' }}</span>
          <span class="sm:hidden">{{ isAuthenticOdds ? 'CS:GO' : 'Fair' }}</span>
        </button>

        <!-- Sound Toggle -->
        <button
          @click="toggleMute"
          class="p-1.5 sm:p-2 rounded-md border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
          :title="isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'"
        >
          <VolumeX v-if="isMuted" class="w-4 h-4 text-red-400" />
          <Volume2 v-else class="w-4 h-4 text-emerald-400" />
        </button>

        <!-- History Button -->
        <button
          @click="$emit('open-history')"
          class="relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-md border border-slate-700 bg-slate-800/80 text-[11px] sm:text-xs font-medium text-slate-200 hover:bg-slate-700 hover:border-slate-500 transition-colors cursor-pointer"
        >
          <History class="w-3.5 h-3.5 text-sky-400" />
          <span class="hidden sm:inline">Kho Đồ</span>
          <span
            v-if="historyCount > 0"
            class="px-1.5 py-0.2 text-[9px] sm:text-[10px] font-bold rounded-full bg-amber-500 text-black ml-0.5"
          >
            {{ historyCount }}
          </span>
        </button>

        <!-- Add Custom Dish Button -->
        <button
          @click="$emit('open-add-dish')"
          class="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-md border border-amber-500/50 bg-amber-600/20 text-amber-300 text-[11px] sm:text-xs font-semibold hover:bg-amber-600/30 transition-all shadow-xs cursor-pointer"
        >
          <PlusCircle class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">Thêm Món</span>
        </button>
      </div>

    </div>
  </header>
</template>

<script setup>
import { Volume2, VolumeX, History, PlusCircle, Sparkles } from 'lucide-vue-next'
import { useSound } from '../composables/useSound.js'

defineProps({
  historyCount: {
    type: Number,
    default: 0
  },
  isAuthenticOdds: {
    type: Boolean,
    default: true
  }
})

defineEmits(['open-history', 'open-add-dish', 'toggle-odds'])

const { isMuted, toggleMute } = useSound()
</script>
