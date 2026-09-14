// CS:GO Case Opening Roulette Logic & Physics
import { ref } from 'vue'
import { RARITIES } from '../data/defaultCases.js'
import { useSound } from './useSound.js'
import confetti from 'canvas-confetti'

export function useCaseSpinner() {
  const isSpinning = ref(false)
  const isFastSpin = ref(false)
  const isAuthenticOdds = ref(true) // Authentic CS:GO odds vs Equal Fair odds
  const spinStrip = ref([])
  const winningItem = ref(null)
  const currentTranslateX = ref(0)
  const isNeedleBouncing = ref(false)
  const showInspectModal = ref(false)

  const { playTick, playCrateOpen, playWinSound } = useSound()

  // History of rolled dishes
  const rollHistory = ref(JSON.parse(localStorage.getItem('csgo_food_history') || '[]'))

  function saveHistory(item, caseName) {
    const historyEntry = {
      ...item,
      rolledAt: new Date().toISOString(),
      caseName: caseName || 'Hòm Bí Ẩn',
      statTrakCount: Math.floor(Math.random() * 20) + 1,
      floatValue: (Math.random() * 0.08).toFixed(4)
    }
    rollHistory.value.unshift(historyEntry)
    if (rollHistory.value.length > 50) {
      rollHistory.value.pop()
    }
    localStorage.setItem('csgo_food_history', JSON.stringify(rollHistory.value))
  }

  function clearHistory() {
    rollHistory.value = []
    localStorage.removeItem('csgo_food_history')
  }

  // Pick an item based on weighted probability or equal probability
  function pickRandomItem(caseItems) {
    if (!caseItems || caseItems.length === 0) return null

    if (!isAuthenticOdds.value) {
      // Fair mode: equal chance for all food items
      const idx = Math.floor(Math.random() * caseItems.length)
      return { ...caseItems[idx] }
    }

    // Authentic CS:GO Odds Mode
    const itemsWithWeights = caseItems.map(item => {
      const rarityInfo = RARITIES[item.rarity] || RARITIES.consumer
      return { item, weight: rarityInfo.weight }
    })

    const totalWeight = itemsWithWeights.reduce((acc, curr) => acc + curr.weight, 0)
    let randomNum = Math.random() * totalWeight

    for (const entry of itemsWithWeights) {
      if (randomNum < entry.weight) {
        return { ...entry.item }
      }
      randomNum -= entry.weight
    }

    return { ...caseItems[caseItems.length - 1] }
  }

  // Generate roulette strip with 75 items, winning item at index 62
  function generateStrip(caseItems, targetItem = null) {
    const TOTAL_ITEMS = 75
    const WINNING_INDEX = 62
    const strip = []

    for (let i = 0; i < TOTAL_ITEMS; i++) {
      if (i === WINNING_INDEX && targetItem) {
        strip.push({ ...targetItem, uniqueKey: `strip-${i}-${targetItem.id}` })
      } else {
        const randomItem = pickRandomItem(caseItems)
        strip.push({ ...randomItem, uniqueKey: `strip-${i}-${randomItem.id}-${Math.random()}` })
      }
    }

    return { strip, winningIndex: WINNING_INDEX }
  }

  // Fire celebratory fireworks
  function triggerCelebration(rarity) {
    if (rarity === 'gold') {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ffae00', '#ffffff', '#ff7700']
      })
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.7 },
          colors: ['#ffd700', '#ffffff']
        })
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.7 },
          colors: ['#ffd700', '#ffffff']
        })
      }, 250)
    } else if (rarity === 'covert') {
      confetti({
        particleCount: 90,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#dc2626', '#fca5a5', '#ffffff']
      })
    } else if (rarity === 'classified') {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#f472b6', '#ffffff']
      })
    }
  }

  return {
    isSpinning,
    isFastSpin,
    isAuthenticOdds,
    spinStrip,
    winningItem,
    currentTranslateX,
    isNeedleBouncing,
    showInspectModal,
    rollHistory,
    saveHistory,
    clearHistory,
    pickRandomItem,
    generateStrip,
    triggerCelebration,
    playCrateOpen,
    playTick,
    playWinSound
  }
}
