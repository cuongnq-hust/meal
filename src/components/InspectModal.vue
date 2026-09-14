<template>
  <div
    v-if="isOpen && item"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
    @click.self="close"
  >
    <div
      class="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#11151f] border rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 transform scale-100"
      :style="{ borderColor: rarityInfo.borderColor }"
    >
      <!-- CS:GO Top Header Strip -->
      <div
        class="h-1.5 sm:h-2 w-full shrink-0"
        :style="{ backgroundColor: rarityInfo.color }"
      ></div>

      <!-- Close Button -->
      <button
        @click="close"
        class="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-1.5 sm:p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/60 cursor-pointer"
      >
        <X class="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <!-- Main Inspect Content (Scrollable if height exceeds screen) -->
      <div class="p-4 sm:p-8 flex flex-col items-center text-center relative overflow-y-auto">
        
        <!-- Ambient radial background glow based on rarity -->
        <div
          class="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full blur-3xl opacity-20 pointer-events-none -top-10"
          :style="{ backgroundColor: rarityInfo.color }"
        ></div>

        <!-- Rarity and Collection Subtitle -->
        <div class="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap justify-center">
          <span
            class="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full border"
            :style="{
              borderColor: rarityInfo.borderColor,
              color: rarityInfo.color,
              backgroundColor: rarityInfo.bgColor
            }"
          >
            {{ rarityInfo.vnName }}
          </span>
          <span v-if="caseName" class="text-[11px] sm:text-xs text-slate-400">
            từ {{ caseName }}
          </span>
        </div>

        <!-- Item Title -->
        <h2
          class="font-display font-black text-xl sm:text-3xl tracking-wide max-w-lg mt-0.5 drop-shadow-md px-4"
          :style="{ color: rarityInfo.color }"
        >
          {{ item.name }}
        </h2>

        <!-- StatTrak / Special Badge -->
        <div v-if="item.rarity === 'gold'" class="mt-1.5 text-[11px] sm:text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
          <span>★</span>
          <span>CỰC PHẨM SIÊU HIẾM ĐƯỢC KHAO</span>
          <span>★</span>
        </div>
        <div v-else class="mt-1.5 text-[10px] sm:text-xs font-mono text-orange-400">
          StatTrak™ Số lần đã ăn trong đời: <span class="font-bold text-orange-300">{{ statTrakNumber }} lần</span>
        </div>

        <!-- Giant Floating Food Icon / Showcase -->
        <div class="my-3 sm:my-6 relative py-2 sm:py-4 flex items-center justify-center">
          <div
            class="text-6xl sm:text-8xl filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.6)] transform hover:scale-110 hover:rotate-3 transition-transform duration-300 cursor-default select-none animate-bounce-subtle"
          >
            {{ item.emoji || '🍲' }}
          </div>
        </div>

        <!-- CS:GO Stats Panel: Wear & Float Value -->
        <div class="w-full bg-[#181d2a]/80 border border-slate-800 rounded-xl p-3 sm:p-4 text-left mb-3 sm:mb-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs">
          <div>
            <span class="text-slate-400 block text-[10px] sm:text-[11px]">Độ mới (Exterior):</span>
            <span class="font-semibold text-slate-200 text-[11px] sm:text-xs">{{ item.wear || 'Factory New' }}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] sm:text-[11px]">Float Value:</span>
            <span class="font-mono text-amber-400 text-[11px] sm:text-xs">{{ floatValue }}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] sm:text-[11px]">Ước tính calo:</span>
            <span class="font-semibold text-emerald-400 text-[11px] sm:text-xs">{{ item.calories ? `~${item.calories} kcal` : 'Vừa phải' }}</span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] sm:text-[11px]">Mức giá:</span>
            <span class="font-semibold text-sky-400 text-[11px] sm:text-xs">{{ item.price || 'Hợp lý' }}</span>
          </div>
        </div>

        <!-- Flavor Description Quote -->
        <div class="w-full bg-slate-900/60 border-l-4 border-slate-600 rounded-r-lg p-2.5 sm:p-3 text-left mb-3 sm:mb-4" :style="{ borderLeftColor: rarityInfo.color }">
          <p class="text-[11px] sm:text-sm italic text-slate-300">
            "{{ item.desc || 'Một lựa chọn tuyệt vời cho ngày hôm nay của bạn!' }}"
          </p>
        </div>

        <!-- GOOGLE MAPS & DELIVERY ACTION BAR (Feature) -->
        <div class="w-full bg-[#161b26]/90 border border-slate-700/60 rounded-xl p-3 mb-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div class="text-left flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Navigation class="w-4 h-4" />
            </div>
            <div>
              <p class="text-xs font-semibold text-slate-200">Tìm địa điểm thưởng thức</p>
              <p class="text-[10px] text-slate-400">Xem ngay các quán đang mở cửa gần vị trí của bạn</p>
            </div>
          </div>

          <div class="flex items-center gap-2 w-full sm:w-auto">
            <!-- Google Maps Button -->
            <a
              :href="googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 sm:flex-none px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer select-none"
              title="Mở Google Maps tìm quán quanh đây"
            >
              <MapPin class="w-3.5 h-3.5 shrink-0" />
              <span>Tìm trên Google Maps</span>
              <ExternalLink class="w-3 h-3 opacity-80 shrink-0" />
            </a>

            <!-- ShopeeFood Search Button -->
            <a
              :href="deliveryUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs font-semibold bg-orange-600/20 hover:bg-orange-600/30 text-orange-300 border border-orange-500/40 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer select-none"
              title="Tìm đặt món giao tận nơi"
            >
              <span>🛵 Đặt Ship</span>
              <ExternalLink class="w-3 h-3 opacity-80 shrink-0" />
            </a>
          </div>
        </div>

        <!-- Primary Decision Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full justify-center">
          <button
            @click="confirmDish"
            class="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm tracking-wide text-white uppercase csgo-btn-primary flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <Check class="w-4 h-4" />
            <span>Chốt Ăn Món Này Luôn!</span>
          </button>

          <button
            @click="spinAgain"
            class="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm tracking-wide text-amber-300 uppercase border border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <RotateCcw class="w-4 h-4" />
            <span>Mở Hòm Tiếp</span>
          </button>
        </div>

        <!-- Feedback alert when selected -->
        <div
          v-if="hasConfirmed"
          class="mt-3 sm:mt-4 w-full p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-semibold animate-pulse"
        >
          🎉 Đã chốt thực đơn! Bấm nút "Tìm trên Google Maps" phía trên để chỉ đường đến quán nhé!
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { X, Check, RotateCcw, MapPin, ExternalLink, Navigation } from 'lucide-vue-next'
import { RARITIES } from '../data/defaultCases.js'
import confetti from 'canvas-confetti'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  item: {
    type: Object,
    default: null
  },
  caseName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'spin-again'])

const hasConfirmed = ref(false)
const statTrakNumber = ref(Math.floor(Math.random() * 45) + 3)
const floatValue = ref((0.005 + Math.random() * 0.04).toFixed(5))

const rarityInfo = computed(() => {
  if (!props.item) return RARITIES.consumer
  return RARITIES[props.item.rarity] || RARITIES.consumer
})

// Clean dish name for search queries
const cleanDishName = computed(() => {
  if (!props.item?.name) return 'quán ăn ngon'
  let name = props.item.name.replace(/★/g, '').replace(/StatTrak™/g, '').trim()
  if (props.item.id === 'sep-bao-an') return 'nhà hàng ngon'
  if (props.item.id === 'crush-date') return 'quán ăn lãng mạn'
  if (props.item.id === 'di-ngu-giam-can') return 'quán nước ép hoa quả'
  if (props.item.id === 'ban-mua-cho') return 'quán trà sữa'
  return name
})

const googleMapsUrl = computed(() => {
  const query = `quán ${cleanDishName.value} gần đây`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
})

const deliveryUrl = computed(() => {
  return `https://shopeefood.vn/search?keyword=${encodeURIComponent(cleanDishName.value)}`
})

function close() {
  hasConfirmed.value = false
  emit('close')
}

function spinAgain() {
  hasConfirmed.value = false
  emit('spin-again')
}

function confirmDish() {
  hasConfirmed.value = true
  confetti({
    particleCount: 60,
    spread: 60,
    origin: { y: 0.7 }
  })
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes bounceSubtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}

.animate-bounce-subtle {
  animation: bounceSubtle 3s ease-in-out infinite;
}
</style>
