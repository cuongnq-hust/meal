<template>
  <div class="w-full relative group/selector">
    <!-- Header with Section Title and Navigation Chevrons -->
    <div class="flex items-center justify-between mb-2 px-1">
      <div class="flex items-center gap-2">
        <span class="text-xs font-display font-bold uppercase tracking-wider text-amber-400">
          📦 BỘ SƯU TẬP HÒM ({{ cases.length }} HÒM)
        </span>
        <span class="text-[11px] text-slate-500 hidden sm:inline">
          (Cuộn ngang hoặc lăn chuột để xem hết)
        </span>
      </div>

      <!-- Left / Right Scroll Arrow Buttons -->
      <div class="flex items-center gap-1">
        <button
          @click="scrollLeft"
          class="p-1 sm:p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="isAtStart"
          title="Cuộn sang trái"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <button
          @click="scrollRight"
          class="p-1 sm:p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="isAtEnd"
          title="Cuộn sang phải"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Scrollable Cases Container -->
    <div
      ref="scrollContainer"
      @scroll="handleScroll"
      @wheel="handleWheel"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
      class="case-scroll flex items-center gap-3 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scroll-smooth select-none cursor-grab active:cursor-grabbing -mx-1 px-1"
      style="-webkit-overflow-scrolling: touch;"
    >
      <button
        v-for="c in cases"
        :key="c.id"
        :ref="el => setCaseRef(c.id, el)"
        @click="selectCase(c.id)"
        class="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border text-left transition-all shrink-0 cursor-pointer snap-start select-none min-w-[260px] sm:min-w-[285px] max-w-[320px] flex-1 relative overflow-hidden group"
        :class="activeCaseId === c.id
          ? 'bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border-amber-500 shadow-lg shadow-amber-500/15 ring-1 ring-amber-500/60'
          : 'bg-[#12161f]/90 border-slate-800 hover:border-slate-700 hover:bg-[#181d29] text-slate-400 hover:text-slate-200'"
      >
        <!-- Active Gold Top Glow Line -->
        <div
          v-if="activeCaseId === c.id"
          class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        ></div>

        <!-- Case Icon with Glow -->
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-105 border"
          :class="activeCaseId === c.id
            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-sm shadow-amber-500/20'
            : 'bg-black/40 border-white/5'"
        >
          {{ c.icon }}
        </div>

        <!-- Case Info -->
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-1.5 justify-between">
            <span
              class="font-display text-sm font-bold tracking-wide truncate"
              :class="activeCaseId === c.id ? 'text-amber-300' : 'text-slate-200 group-hover:text-white'"
            >
              {{ c.name }}
            </span>
            <span
              class="text-[10px] px-1.5 py-0.2 rounded font-mono shrink-0 font-semibold"
              :class="activeCaseId === c.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'"
            >
              {{ c.items.length }} món
            </span>
          </div>

          <p class="text-[11px] text-slate-400 truncate mt-0.5" :title="c.tagline">
            {{ c.tagline }}
          </p>

          <div class="flex items-center gap-1.5 mt-1.5">
            <span class="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-800/80 text-slate-400 border border-slate-750">
              {{ c.badge }}
            </span>
            <span v-if="activeCaseId === c.id" class="text-[9px] font-bold text-amber-400 flex items-center gap-0.5">
              ● ĐANG CHỌN
            </span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  cases: {
    type: Array,
    required: true
  },
  activeCaseId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['select-case'])

const scrollContainer = ref(null)
const isAtStart = ref(true)
const isAtEnd = ref(false)
const caseRefs = {}

// Drag to scroll variables
let isDown = false
let startX = 0
let scrollLeftPos = 0
let hasDragged = false

function setCaseRef(id, el) {
  if (el) {
    caseRefs[id] = el
  }
}

function handleScroll() {
  if (!scrollContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
  isAtStart.value = scrollLeft <= 10
  isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 10
}

function scrollLeft() {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: -280, behavior: 'smooth' })
}

function scrollRight() {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: 280, behavior: 'smooth' })
}

// Convert vertical wheel to horizontal scroll over the case selector
function handleWheel(e) {
  if (!scrollContainer.value) return
  if (e.deltaY !== 0) {
    e.preventDefault()
    scrollContainer.value.scrollLeft += e.deltaY * 0.9
  }
}

// Mouse drag to scroll
function startDrag(e) {
  if (!scrollContainer.value) return
  isDown = true
  hasDragged = false
  startX = e.pageX - scrollContainer.value.offsetLeft
  scrollLeftPos = scrollContainer.value.scrollLeft
}

function onDrag(e) {
  if (!isDown || !scrollContainer.value) return
  e.preventDefault()
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = (x - startX) * 1.5
  if (Math.abs(walk) > 5) {
    hasDragged = true
  }
  scrollContainer.value.scrollLeft = scrollLeftPos - walk
}

function stopDrag() {
  isDown = false
}

function selectCase(id) {
  if (hasDragged) return
  emit('select-case', id)
  nextTick(() => {
    const el = caseRefs[id]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  })
}

onMounted(() => {
  nextTick(() => {
    handleScroll()
    // Scroll active case into view initially if needed
    const el = caseRefs[props.activeCaseId]
    if (el) {
      el.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' })
    }
  })
})
</script>

<style scoped>
.case-scroll::-webkit-scrollbar {
  height: 5px;
}
.case-scroll::-webkit-scrollbar-track {
  background: rgba(15, 19, 26, 0.7);
  border-radius: 4px;
}
.case-scroll::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
}
.case-scroll::-webkit-scrollbar-thumb:hover {
  background: #f59e0b;
}
</style>
