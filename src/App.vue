<template>
  <div class="min-h-screen flex flex-col bg-[#0b0e14] text-slate-100 selection:bg-amber-500 selection:text-black">
    
    <!-- Top CS:GO Navigation Bar -->
    <Header
      :historyCount="rollHistory.length"
      :isAuthenticOdds="isAuthenticOdds"
      @open-history="showHistory = true"
      @open-add-dish="showAddDish = true"
      @toggle-odds="toggleOdds"
    />

    <!-- Main Game Area -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6">
      
      <!-- Case Selector Tabs -->
      <div id="cases-section">
        <CaseSelector
          :cases="cases"
          :activeCaseId="activeCaseId"
          @select-case="handleSelectCase"
        />
      </div>

      <!-- Active Case Banner Information -->
      <div
        class="rounded-2xl border border-slate-800/80 p-3.5 sm:p-6 bg-gradient-to-r relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-xl"
        :class="activeCase.bannerColor || 'from-slate-900 to-slate-950'"
      >
        <!-- Background Ambient Accent -->
        <div class="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none"></div>

        <div class="flex items-center gap-3 sm:gap-4 relative z-10 min-w-0">
          <div class="text-3xl sm:text-5xl p-2 sm:p-3 bg-black/40 border border-white/10 rounded-2xl shadow-inner backdrop-blur-xs shrink-0">
            {{ activeCase.icon }}
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-[10px] sm:text-xs uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {{ activeCase.badge }}
              </span>
              <span class="text-[11px] sm:text-xs text-slate-400">
                Gồm {{ activeCase.items.length }} món ăn
              </span>
            </div>
            <h1 class="font-display font-black text-lg sm:text-2xl lg:text-3xl text-white tracking-wide mt-1 truncate">
              {{ activeCase.name }}
            </h1>
            <p class="text-[11px] sm:text-sm text-slate-300 mt-0.5 sm:mt-1 truncate">
              {{ activeCase.tagline }}
            </p>
          </div>
        </div>

        <!-- Rarity Breakdown summary pills -->
        <div class="flex items-center gap-1 sm:gap-1.5 flex-wrap sm:justify-end relative z-10 w-full sm:w-auto">
          <div
            v-for="(count, rarityKey) in rarityCounts"
            :key="rarityKey"
            class="text-[10px] sm:text-[11px] font-mono font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black/50 border flex items-center gap-1"
            :style="{ borderColor: RARITIES[rarityKey].borderColor, color: RARITIES[rarityKey].color }"
            :title="RARITIES[rarityKey].vnName"
          >
            <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: RARITIES[rarityKey].color }"></span>
            <span>{{ count }}</span>
          </div>
        </div>
      </div>

      <!-- CS:GO Horizontal Case Roulette Spinner -->
      <section id="roulette-section" class="w-full">
        <CaseRoulette
          ref="rouletteRef"
          :key="activeCase.id"
          :currentCase="activeCase"
          :isAuthenticOdds="isAuthenticOdds"
          @item-won="handleItemWon"
        />
      </section>

      <!-- Case Items Showcase Grid -->
      <section class="w-full">
        <CaseItemList
          :items="activeCase.items"
          @inspect-item="handleInspectItem"
        />
      </section>

    </main>

    <!-- CS:GO Footer (Extra padding on mobile for sticky dock) -->
    <footer class="border-t border-slate-800 bg-[#080a0f] py-6 pb-24 sm:pb-6 px-4 text-center text-xs text-slate-500">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="flex items-center justify-center gap-2">
          <span class="text-base">🍳</span>
          <span class="font-display font-semibold text-slate-400">CS:GO Food Unboxing Simulator</span>
          <span class="hidden sm:inline">— Giải quyết nỗi lo "Hôm nay ăn gì?"</span>
        </div>
        <p class="text-slate-600 font-mono text-[11px]">
          100% Miễn Phí • Web Audio API • CS:GO Deceleration Physics
        </p>
      </div>
    </footer>

    <!-- MOBILE STICKY BOTTOM DOCK (Convenient thumb reach on smartphones) -->
    <div class="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1117]/95 border-t border-slate-800 px-3 py-2 backdrop-blur-md flex items-center justify-between gap-2 shadow-2xl">
      <!-- Quick Switch Case -->
      <button
        @click="scrollToCases"
        class="flex-1 py-2 px-2 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 active:bg-slate-700 cursor-pointer"
      >
        <span>📦</span>
        <span>Đổi Hòm</span>
      </button>

      <!-- Big Center Quick Open Button -->
      <button
        @click="triggerMobileOpen"
        :disabled="isRouletteSpinning"
        class="flex-[2] py-2.5 px-3 rounded-xl font-display font-black text-xs uppercase tracking-wider text-white csgo-btn-primary flex items-center justify-center gap-1.5 shadow-lg active:scale-95 disabled:opacity-50 cursor-pointer"
      >
        <span v-if="!isRouletteSpinning">🔓</span>
        <span v-else class="animate-spin">⏳</span>
        <span>{{ isRouletteSpinning ? 'ĐANG QUAY...' : 'MỞ HÒM NGAY' }}</span>
      </button>

      <!-- Quick Inventory / History -->
      <button
        @click="showHistory = true"
        class="flex-1 py-2 px-2 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 active:bg-slate-700 cursor-pointer relative"
      >
        <span>📜</span>
        <span>Kho</span>
        <span
          v-if="rollHistory.length > 0"
          class="px-1 text-[9px] font-bold rounded-full bg-amber-500 text-black ml-0.5"
        >
          {{ rollHistory.length }}
        </span>
      </button>
    </div>

    <!-- MODALS & DRAWERS -->
    <!-- 1. Inspect Winning or Selected Item Modal -->
    <InspectModal
      :isOpen="showInspect"
      :item="inspectedItem"
      :caseName="inspectedCaseName"
      @close="showInspect = false"
      @spin-again="handleSpinAgain"
    />

    <!-- 2. Custom Dish Form Modal -->
    <CustomDishModal
      :isOpen="showAddDish"
      @close="showAddDish = false"
      @add-dish="handleAddDish"
    />

    <!-- 3. Roll History Drawer -->
    <HistoryDrawer
      :isOpen="showHistory"
      :history="rollHistory"
      @close="showHistory = false"
      @clear-history="clearHistory"
      @inspect-item="handleInspectItem"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from './components/Header.vue'
import CaseSelector from './components/CaseSelector.vue'
import CaseRoulette from './components/CaseRoulette.vue'
import CaseItemList from './components/CaseItemList.vue'
import InspectModal from './components/InspectModal.vue'
import CustomDishModal from './components/CustomDishModal.vue'
import HistoryDrawer from './components/HistoryDrawer.vue'

import { DEFAULT_CASES, RARITIES } from './data/defaultCases.js'
import { useCaseSpinner } from './composables/useCaseSpinner.js'

const { rollHistory, saveHistory, clearHistory } = useCaseSpinner()

// Template ref for roulette
const rouletteRef = ref(null)

// State
const cases = ref(JSON.parse(JSON.stringify(DEFAULT_CASES)))
const activeCaseId = ref('office-lunch')
const isAuthenticOdds = ref(true)

// Modals state
const showInspect = ref(false)
const inspectedItem = ref(null)
const inspectedCaseName = ref('')
const showHistory = ref(false)
const showAddDish = ref(false)

// Active case
const activeCase = computed(() => {
  return cases.value.find(c => c.id === activeCaseId.value) || cases.value[0]
})

const isRouletteSpinning = computed(() => {
  return rouletteRef.value?.isSpinning || false
})

// Rarity counts for active case
const rarityCounts = computed(() => {
  const counts = {}
  activeCase.value.items.forEach(item => {
    counts[item.rarity] = (counts[item.rarity] || 0) + 1
  })
  return counts
})

function handleSelectCase(id) {
  activeCaseId.value = id
}

function toggleOdds() {
  isAuthenticOdds.value = !isAuthenticOdds.value
}

// Mobile bottom dock actions
function scrollToCases() {
  const el = document.getElementById('cases-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function triggerMobileOpen() {
  const el = document.getElementById('roulette-section')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  setTimeout(() => {
    rouletteRef.value?.startSpin()
  }, 200)
}

// When item is won from the roulette
function handleItemWon({ item, caseName }) {
  saveHistory(item, caseName)
  inspectedItem.value = item
  inspectedCaseName.value = caseName
  showInspect.value = true
}

// Manual inspection from list or history
function handleInspectItem(item) {
  inspectedItem.value = item
  inspectedCaseName.value = activeCase.value.name
  showInspect.value = true
}

function handleSpinAgain() {
  showInspect.value = false
  const el = document.getElementById('roulette-section')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

// Adding custom dish
function handleAddDish(dish) {
  const current = cases.value.find(c => c.id === activeCaseId.value)
  if (current) {
    current.items.unshift(dish)
    const customList = JSON.parse(localStorage.getItem('csgo_food_custom_dishes') || '[]')
    customList.push({ ...dish, caseId: activeCaseId.value })
    localStorage.setItem('csgo_food_custom_dishes', JSON.stringify(customList))
  }
}

// Load custom items on startup
function loadCustomDishes() {
  const customList = JSON.parse(localStorage.getItem('csgo_food_custom_dishes') || '[]')
  customList.forEach(dish => {
    const targetCase = cases.value.find(c => c.id === dish.caseId)
    if (targetCase && !targetCase.items.some(i => i.id === dish.id)) {
      targetCase.items.unshift(dish)
    }
  })
}

onMounted(() => {
  loadCustomDishes()
})
</script>
