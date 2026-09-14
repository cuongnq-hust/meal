<template>
  <div class="w-full bg-[#10141e]/90 border border-slate-800/90 rounded-2xl p-3.5 sm:p-4 shadow-lg backdrop-blur-xs">
    
    <!-- Title & Current Budget Display -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg shrink-0">
          💰
        </div>
        <div>
          <h3 class="font-display font-bold text-xs sm:text-sm text-slate-100 flex items-center gap-2">
            <span>BỘ LỌC NGÂN SÁCH (HÔM NAY CÓ BAO NHIÊU TIỀN?)</span>
          </h3>
          <p class="text-[11px] text-slate-400">
            Hòm chỉ quay các món ăn phù hợp với túi tiền của bạn
          </p>
        </div>
      </div>

      <!-- Live Budget Tag -->
      <div class="flex items-center gap-2 self-start sm:self-auto">
        <span
          class="px-2.5 py-1 rounded-lg font-mono font-bold text-xs border"
          :class="isUnlimited
            ? 'bg-purple-500/15 border-purple-500/40 text-purple-300'
            : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'"
        >
          {{ isUnlimited ? '♾️ Không Giới Hạn' : `Tối đa: ${formatCurrency(budgetLimit)}` }}
        </span>
        <span class="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
          {{ matchingCount }}/{{ totalCount }} món
        </span>
      </div>
    </div>

    <!-- Quick Preset Buttons -->
    <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-3">
      <button
        v-for="preset in presets"
        :key="preset.id"
        @click="setPreset(preset)"
        class="px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer select-none flex items-center gap-1.5 active:scale-95"
        :class="activePresetId === preset.id
          ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-md shadow-amber-500/20'
          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white hover:border-slate-600'"
      >
        <span>{{ preset.icon }}</span>
        <span>{{ preset.label }}</span>
        <span class="text-[10px] opacity-70 font-mono">({{ preset.badge }})</span>
      </button>
    </div>

    <!-- Interactive Slider -->
    <div class="mt-3.5 pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <div class="flex-1 flex items-center gap-3">
        <span class="text-[11px] font-mono text-slate-400 shrink-0">15.000đ</span>
        <input
          type="range"
          min="20000"
          max="300000"
          step="5000"
          v-model.number="internalSliderValue"
          @input="onSliderInput"
          :disabled="isUnlimited"
          class="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-30 disabled:cursor-not-allowed"
        />
        <span class="text-[11px] font-mono text-slate-400 shrink-0">300.000đ+</span>
      </div>

      <!-- Toggle Unlimited Checkbox -->
      <label class="flex items-center gap-2 cursor-pointer text-xs text-slate-300 select-none shrink-0 hover:text-white">
        <input
          type="checkbox"
          v-model="isUnlimited"
          @change="onToggleUnlimited"
          class="w-4 h-4 rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
        />
        <span class="font-medium">Ăn Xõa (Tất cả mức giá)</span>
      </label>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  matchingCount: {
    type: Number,
    default: 0
  },
  totalCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update-budget'])

const presets = [
  { id: 'all', label: 'Tất Cả', icon: '♾️', badge: 'Mọi giá', limit: null },
  { id: 'student', label: 'Cháy Túi / Sinh Viên', icon: '🪙', badge: '≤ 35k', limit: 35000 },
  { id: 'office', label: 'Cơm Văn Phòng', icon: '🍱', badge: '≤ 65k', limit: 65000 },
  { id: 'comfort', label: 'Ăn Ngon Đủ Chất', icon: '🍕', badge: '≤ 120k', limit: 120000 },
  { id: 'luxury', label: 'Đại Gia Cuối Tuần', icon: '🥩', badge: '≤ 300k', limit: 300000 },
]

const activePresetId = ref('all')
const isUnlimited = ref(true)
const budgetLimit = ref(65000)
const internalSliderValue = ref(65000)

function formatCurrency(val) {
  if (!val) return '0đ'
  return new Intl.NumberFormat('vi-VN').format(val) + 'đ'
}

function setPreset(preset) {
  activePresetId.value = preset.id
  if (preset.limit === null) {
    isUnlimited.value = true
    emit('update-budget', null)
  } else {
    isUnlimited.value = false
    budgetLimit.value = preset.limit
    internalSliderValue.value = preset.limit
    emit('update-budget', preset.limit)
  }
}

function onSliderInput() {
  isUnlimited.value = false
  activePresetId.value = 'custom'
  budgetLimit.value = internalSliderValue.value
  emit('update-budget', internalSliderValue.value)
}

function onToggleUnlimited() {
  if (isUnlimited.value) {
    activePresetId.value = 'all'
    emit('update-budget', null)
  } else {
    activePresetId.value = 'custom'
    budgetLimit.value = internalSliderValue.value
    emit('update-budget', internalSliderValue.value)
  }
}
</script>
