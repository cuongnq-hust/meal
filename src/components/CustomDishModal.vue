<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
    @click.self="close"
  >
    <div class="w-full sm:max-w-lg bg-[#11151f] border-t sm:border border-slate-700 rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
      
      <!-- Mobile Pull Indicator Bar -->
      <div class="w-10 h-1 bg-slate-700 rounded-full mx-auto my-2 block sm:hidden shrink-0"></div>

      <!-- Modal Header -->
      <div class="px-5 py-3 sm:py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 shrink-0">
        <div class="flex items-center gap-2.5">
          <span class="text-xl">🍳</span>
          <div>
            <h3 class="font-display font-bold text-base sm:text-lg text-slate-100">Thêm Món Ăn Tùy Chọn</h3>
            <p class="text-[11px] sm:text-xs text-slate-400">Thêm món ăn riêng vào hòm hiện tại</p>
          </div>
        </div>
        <button
          @click="close"
          class="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="handleSubmit" class="p-4 sm:p-6 space-y-3.5 sm:space-y-4">
        
        <!-- Dish Name -->
        <div>
          <label class="block text-[11px] sm:text-xs font-semibold uppercase text-slate-300 mb-1">
            Tên Món Ăn <span class="text-red-400">*</span>
          </label>
          <input
            v-model.trim="form.name"
            type="text"
            required
            placeholder="Ví dụ: Bún riêu cua ốc, Bánh xèo miền Tây..."
            class="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-[#181d2a] border border-slate-700 text-slate-100 text-xs sm:text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>

        <!-- Emoji and Rarity Selection Row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <!-- Emoji Picker / Input -->
          <div>
            <label class="block text-[11px] sm:text-xs font-semibold uppercase text-slate-300 mb-1">
              Icon / Emoji <span class="text-red-400">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input
                v-model="form.emoji"
                type="text"
                maxlength="4"
                class="w-14 text-center text-xl sm:text-2xl py-1.5 sm:py-2 rounded-lg bg-[#181d2a] border border-slate-700 text-slate-100 focus:border-amber-500 focus:outline-none shrink-0"
              />
              <!-- Quick Emoji Selectors -->
              <div class="flex items-center gap-1 flex-wrap">
                <button
                  type="button"
                  v-for="em in quickEmojis"
                  :key="em"
                  @click="form.emoji = em"
                  class="text-base sm:text-lg p-1 rounded hover:bg-slate-800 transition-colors"
                >
                  {{ em }}
                </button>
              </div>
            </div>
          </div>

          <!-- Rarity Tier -->
          <div>
            <label class="block text-[11px] sm:text-xs font-semibold uppercase text-slate-300 mb-1">
              Phẩm Cấp (Rarity Tier)
            </label>
            <select
              v-model="form.rarity"
              class="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-[#181d2a] border border-slate-700 text-slate-100 text-xs font-semibold focus:border-amber-500 focus:outline-none cursor-pointer"
              :style="{ color: RARITIES[form.rarity]?.color }"
            >
              <option
                v-for="(info, key) in RARITIES"
                :key="key"
                :value="key"
                class="bg-[#181d2a] text-slate-200"
              >
                {{ info.vnName }}
              </option>
            </select>
          </div>
        </div>

        <!-- Price & Calories -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label class="block text-[11px] sm:text-xs font-semibold uppercase text-slate-300 mb-1">
              Mức Giá Dự Kiến
            </label>
            <input
              v-model.trim="form.price"
              type="text"
              placeholder="35.000 - 50.000đ"
              class="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-[#181d2a] border border-slate-700 text-slate-100 text-xs sm:text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-[11px] sm:text-xs font-semibold uppercase text-slate-300 mb-1">
              Lượng Calo Ước Tính
            </label>
            <input
              v-model.number="form.calories"
              type="number"
              placeholder="550"
              class="w-full px-3 py-2 sm:py-2.5 rounded-lg bg-[#181d2a] border border-slate-700 text-slate-100 text-xs sm:text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <!-- Description / Quip -->
        <div>
          <label class="block text-[11px] sm:text-xs font-semibold uppercase text-slate-300 mb-1">
            Mô Tả Hài Hước (Flavor Text)
          </label>
          <textarea
            v-model.trim="form.desc"
            rows="2"
            placeholder="Viết một câu cảm nghĩ vui vẻ về món này..."
            class="w-full px-3 py-2 rounded-lg bg-[#181d2a] border border-slate-700 text-slate-100 text-xs sm:text-sm focus:border-amber-500 focus:outline-none resize-none"
          ></textarea>
        </div>

        <!-- Submit Buttons -->
        <div class="pt-2 pb-1 sm:pb-0 flex items-center justify-end gap-2.5">
          <button
            type="button"
            @click="close"
            class="w-1/2 sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Hủy Bỏ
          </button>
          <button
            type="submit"
            class="w-1/2 sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold text-white uppercase csgo-btn-primary cursor-pointer"
          >
            Lưu Món Vào Hòm
          </button>
        </div>

      </form>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { X } from 'lucide-vue-next'
import { RARITIES } from '../data/defaultCases.js'

defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'add-dish'])

const quickEmojis = ['🍜', '🍲', '🍛', '🍱', '🍔', '🍕', '🍣', '🥩', '🧋']

const form = reactive({
  name: '',
  emoji: '🍲',
  rarity: 'milspec',
  price: '40.000 - 60.000đ',
  calories: 500,
  desc: ''
})

function close() {
  emit('close')
}

function handleSubmit() {
  if (!form.name) return

  const newDish = {
    id: `custom-${Date.now()}`,
    name: form.name,
    emoji: form.emoji || '🍲',
    rarity: form.rarity,
    price: form.price || 'Thương lượng',
    calories: form.calories || 500,
    desc: form.desc || 'Món ăn do chính bạn thêm vào thực đơn cá nhân.',
    wear: 'Factory New',
    isCustom: true
  }

  emit('add-dish', newDish)

  // Reset form
  form.name = ''
  form.desc = ''
  form.emoji = '🍲'
  form.rarity = 'milspec'
  form.price = '40.000 - 60.000đ'
  form.calories = 500

  close()
}
</script>
