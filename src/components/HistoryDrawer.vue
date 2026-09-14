<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex flex-col justify-end sm:flex-row sm:justify-end animate-fadeIn"
    @click.self="close"
  >
    <div
      class="w-full sm:max-w-md bg-[#11151f] max-h-[88vh] sm:max-h-full sm:h-full border-t sm:border-t-0 sm:border-l border-slate-800 rounded-t-2xl sm:rounded-none shadow-2xl flex flex-col transform transition-transform duration-300"
    >
      <!-- Mobile Pull Indicator Bar -->
      <div class="w-10 h-1 bg-slate-700 rounded-full mx-auto my-2.5 block sm:hidden shrink-0"></div>

      <!-- Drawer Header -->
      <div class="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
            <History class="w-4 h-4" />
          </div>
          <div>
            <h3 class="font-display font-bold text-sm sm:text-base text-slate-100">Kho Đồ / Lịch Sử Quay</h3>
            <p class="text-[11px] sm:text-xs text-slate-400">{{ history.length }} món ăn đã mở</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-if="history.length > 0"
            @click="$emit('clear-history')"
            class="text-[11px] text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded transition-colors cursor-pointer"
            title="Xóa toàn bộ lịch sử"
          >
            Xóa hết
          </button>
          <button
            @click="close"
            class="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- History List -->
      <div class="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2">
        <div
          v-if="history.length === 0"
          class="h-full min-h-[220px] flex flex-col items-center justify-center text-center p-6 text-slate-500"
        >
          <div class="text-4xl sm:text-5xl mb-3 opacity-40">🍽️</div>
          <p class="font-display font-bold text-sm sm:text-base text-slate-300">Chưa có món ăn nào trong kho</p>
          <p class="text-[11px] sm:text-xs text-slate-500 mt-1">Hãy mở một chiếc hòm để quyết định bữa ăn hôm nay!</p>
        </div>

        <div
          v-for="(entry, index) in history"
          :key="`${entry.id}-${index}`"
          @click="$emit('inspect-item', entry)"
          class="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border bg-[#161a25]/90 hover:bg-[#1c2230] cursor-pointer transition-all border-l-4 active:scale-[0.99] group"
          :style="{ borderLeftColor: getRarity(entry.rarity).color }"
        >
          <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span class="text-xl sm:text-2xl shrink-0 group-hover:scale-110 transition-transform">
              {{ entry.emoji || '🍲' }}
            </span>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5 sm:gap-2">
                <p
                  class="font-semibold text-xs truncate"
                  :style="{ color: getRarity(entry.rarity).color }"
                >
                  {{ entry.name }}
                </p>
                <span
                  v-if="entry.rarity === 'gold'"
                  class="text-[8px] sm:text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-bold shrink-0"
                >
                  ★ RARE
                </span>
              </div>
              <div class="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                <span class="truncate max-w-[110px] sm:max-w-[140px]">{{ entry.caseName || 'Hòm' }}</span>
                <span>•</span>
                <span>{{ formatTime(entry.rolledAt) }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 shrink-0 pl-2">
            <div class="text-right text-[11px] sm:text-xs font-mono text-slate-300">
              {{ entry.price || '—' }}
            </div>
            <!-- Quick Google Maps icon button -->
            <a
              :href="getMapUrl(entry)"
              target="_blank"
              rel="noopener noreferrer"
              @click.stop
              class="p-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer"
              title="Tìm quán này trên Google Maps"
            >
              <MapPin class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Drawer Footer -->
      <div class="p-3 sm:p-4 border-t border-slate-800 bg-slate-900/40 text-center shrink-0">
        <p class="text-[10px] sm:text-[11px] text-slate-500">
          Chạm vào biểu tượng 📍 để mở nhanh Google Maps chỉ đường đến quán!
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { X, History, MapPin } from 'lucide-vue-next'
import { RARITIES } from '../data/defaultCases.js'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  history: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'clear-history', 'inspect-item'])

function close() {
  emit('close')
}

function getRarity(rarityKey) {
  return RARITIES[rarityKey] || RARITIES.consumer
}

function formatTime(isoString) {
  if (!isoString) return 'Vừa xong'
  const d = new Date(isoString)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function getMapUrl(entry) {
  let name = (entry.name || 'quán ăn').replace(/★/g, '').replace(/StatTrak™/g, '').trim()
  if (entry.id === 'sep-bao-an') name = 'nhà hàng ngon'
  if (entry.id === 'crush-date') name = 'quán ăn lãng mạn'
  if (entry.id === 'di-ngu-giam-can') name = 'quán nước ép hoa quả'
  if (entry.id === 'ban-mua-cho') name = 'quán trà sữa'
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('quán ' + name + ' gần đây')}`
}
</script>
