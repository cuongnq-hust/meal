<template>
  <div class="w-full mt-4 sm:mt-8 bg-[#0e121a]/80 rounded-2xl border border-slate-800 p-3.5 sm:p-6">
    
    <!-- Title and Rarity Legend -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-800">
      <div>
        <h3 class="font-display font-bold text-sm sm:text-lg text-slate-100 tracking-wide flex items-center gap-2">
          <span>📦</span>
          <span>DANH SÁCH MÓN TRONG HÒM</span>
          <span class="text-xs font-mono font-normal text-slate-400">({{ filteredItems.length }} món)</span>
        </h3>
        <p class="text-[11px] sm:text-xs text-slate-400 mt-0.5">Chạm vào từng món để xem thông số chi tiết</p>
      </div>

      <!-- Rarity Filter Pills for quick filtering on mobile & desktop -->
      <div class="flex items-center gap-1 sm:gap-1.5 flex-wrap">
        <button
          @click="selectedRarity = 'all'"
          class="text-[10px] font-bold px-2 py-0.5 rounded border transition-colors cursor-pointer"
          :class="selectedRarity === 'all'
            ? 'bg-slate-200 text-black border-white'
            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'"
        >
          Tất cả
        </button>
        <button
          v-for="(info, key) in RARITIES"
          :key="key"
          @click="selectedRarity = selectedRarity === key ? 'all' : key"
          class="text-[10px] font-bold px-2 py-0.5 rounded border transition-all cursor-pointer"
          :style="{
            borderColor: selectedRarity === key ? info.color : info.borderColor,
            color: selectedRarity === key ? '#ffffff' : info.color,
            backgroundColor: selectedRarity === key ? info.color : info.bgColor,
            boxShadow: selectedRarity === key ? `0 0 10px ${info.color}60` : 'none'
          }"
        >
          {{ info.vnName.split(' ')[0] }}
        </button>
      </div>
    </div>

    <!-- Items Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3 mt-3.5 sm:mt-5">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        @click="$emit('inspect-item', item)"
        class="cursor-pointer transform hover:-translate-y-1 active:scale-[0.98] transition-all duration-200"
      >
        <ItemCard :item="item" size="normal" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ItemCard from './ItemCard.vue'
import { RARITIES } from '../data/defaultCases.js'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

defineEmits(['inspect-item'])

const selectedRarity = ref('all')

const rarityOrder = {
  gold: 7,
  covert: 6,
  classified: 5,
  restricted: 4,
  milspec: 3,
  industrial: 2,
  consumer: 1
}

const filteredItems = computed(() => {
  let list = [...props.items]
  if (selectedRarity.value !== 'all') {
    list = list.filter(i => i.rarity === selectedRarity.value)
  }
  return list.sort((a, b) => {
    const orderA = rarityOrder[a.rarity] || 0
    const orderB = rarityOrder[b.rarity] || 0
    return orderB - orderA
  })
})
</script>
