// Shared pricing engine — mirrors Clearsale-Web/lib/buybacks.ts
// If you change the types/formula, update both.

export type ConditionGrade = 'like_new' | 'good' | 'fair' | 'damaged'
export type CarrierStatus = 'unlocked' | 'locked_big3' | 'locked_prepaid' | 'unknown'

export type FunctionAnswers = {
  powers_on?: boolean
  screen_ok?: boolean
  touch_ok?: boolean
  face_id_ok?: boolean
  battery_holds_charge?: boolean
  water_damage?: boolean
  activation_locked?: boolean
  cracks_or_dents?: boolean
}

export type DamageType = 'cracked_back' | 'cracked_screen' | 'water_damage' | 'other'

export type DamageDeduction = {
  damage_type: DamageType
  brand?: string
  model_pattern?: string
  amount_cents: number
  note?: string
}

export type BuybackSettings = {
  enabled: boolean
  default_rate_percent: number
  category_rates: Record<string, number>
  condition_modifiers: Record<ConditionGrade, number>
  carrier_modifiers: Record<CarrierStatus, number>
  battery_modifiers: { high: number; medium: number; low: number }
  accessory_bonus_cents: Record<string, number>
  store_credit_bonus_percent: number
  expiration_days: number
  max_auto_offer_cents: number
  min_offer_cents: number
  auto_reject_water_damage: boolean
  auto_reject_wont_power_on: boolean
  auto_reject_activation_locked: boolean
  accepted_categories: string[]
  reference_prices: Record<string, number>
  damage_deductions: DamageDeduction[]
  locations: { name: string; address?: string }[]
}

// Find the best-matching deduction (most specific wins).
export function findDeduction(
  deductions: DamageDeduction[],
  damage_type: DamageType,
  brand: string,
  model: string,
): DamageDeduction | null {
  const b = (brand || '').toLowerCase()
  const m = (model || '').toLowerCase()
  let best: DamageDeduction | null = null
  let bestScore = -1
  for (const d of deductions || []) {
    if (d.damage_type !== damage_type) continue
    const dBrand = (d.brand || '').toLowerCase()
    const dModel = (d.model_pattern || '').toLowerCase()
    if (dBrand && dBrand !== b) continue
    if (dModel && !m.includes(dModel)) continue
    const score = (dBrand ? 1 : 0) + (dModel ? 2 : 0)
    if (score > bestScore) { bestScore = score; best = d }
  }
  return best
}

export const DEFAULT_SETTINGS: BuybackSettings = {
  enabled: true,
  default_rate_percent: 30,
  category_rates: { Phone: 30, Tablet: 25, Laptop: 35, Console: 40 },
  condition_modifiers: { like_new: 1.0, good: 0.85, fair: 0.7, damaged: 0.4 },
  carrier_modifiers: { unlocked: 1.0, locked_big3: 0.9, locked_prepaid: 0.8, unknown: 0.85 },
  battery_modifiers: { high: 1.0, medium: 0.95, low: 0.9 },
  accessory_bonus_cents: { charger: 500, box: 1000, earbuds: 500, sealed: 2000 },
  store_credit_bonus_percent: 10,
  expiration_days: 7,
  max_auto_offer_cents: 50000,
  min_offer_cents: 500,
  auto_reject_water_damage: true,
  auto_reject_wont_power_on: true,
  auto_reject_activation_locked: true,
  accepted_categories: ['Phone', 'Tablet', 'Laptop', 'Console'],
  reference_prices: {},
  damage_deductions: [],
  locations: [],
}

export const CONDITION_LABELS: Record<ConditionGrade, { title: string; description: string }> = {
  like_new: { title: 'Like new', description: 'No visible wear. Battery 90%+. Everything works perfectly. Original box a plus.' },
  good: { title: 'Good', description: 'Minor scuffs or light scratches only visible up close. Fully functional.' },
  fair: { title: 'Fair', description: 'Visible scratches, dings, or wear. Device works normally but shows its age.' },
  damaged: { title: 'Damaged', description: 'Cracked screen, cracked back, dented frame, or missing parts. May still power on.' },
}

export const CARRIER_LABELS: Record<CarrierStatus, string> = {
  unlocked: 'Unlocked',
  locked_big3: 'Locked (Verizon / AT&T / T-Mobile)',
  locked_prepaid: 'Locked (Cricket / Metro / Boost / other prepaid)',
  unknown: 'Not sure',
}

export function referencePriceKey(input: {
  device_brand: string
  device_model: string
  storage?: string | null
  carrier_status?: CarrierStatus | null
}): string {
  const parts = [
    input.device_brand,
    input.device_model,
    input.storage || '',
    input.carrier_status === 'unlocked' ? 'unlocked' : 'locked',
  ]
  return parts.join(' ').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function batteryTier(health: number | null | undefined): 'high' | 'medium' | 'low' {
  if (health == null) return 'medium'
  if (health >= 90) return 'high'
  if (health >= 80) return 'medium'
  return 'low'
}

export type PriceInput = {
  device_category: string
  device_brand: string
  device_model: string
  storage?: string | null
  carrier_status?: CarrierStatus | null
  condition_grade: ConditionGrade
  battery_health?: number | null
  function_answers?: FunctionAnswers
  accessories?: string[]
  market_price_cents?: number | null
}

export type PriceBreakdown = {
  market_price_cents: number
  shop_rate_percent: number
  base_offer_cents: number
  condition_multiplier: number
  carrier_multiplier: number
  battery_multiplier: number
  accessory_bonus_cents: number
  final_offer_cents: number
  store_credit_offer_cents: number
  auto_reject: { rejected: boolean; reasons: string[] }
  requires_review: boolean
  breakdown_lines: { label: string; amount_cents: number; kind: 'positive' | 'negative' | 'neutral' }[]
}

export function calculateOffer(input: PriceInput, settings: BuybackSettings): PriceBreakdown {
  const fn = input.function_answers || {}
  const reasons: string[] = []

  if (settings.auto_reject_water_damage && fn.water_damage) reasons.push('Water damage reported')
  if (settings.auto_reject_wont_power_on && fn.powers_on === false) reasons.push('Device will not power on')
  if (settings.auto_reject_activation_locked && fn.activation_locked) reasons.push('Activation Lock / FRP / MDM lock is on')
  if (!settings.accepted_categories.includes(input.device_category)) {
    reasons.push(`We don't buy ${input.device_category.toLowerCase()}s`)
  }

  let marketCents = input.market_price_cents ?? 0
  if (!marketCents) {
    const key = referencePriceKey(input)
    marketCents = settings.reference_prices[key] || 0
  }

  const rate = (settings.category_rates[input.device_category] ?? settings.default_rate_percent) / 100
  const baseOffer = Math.round(marketCents * rate)

  const conditionMult = settings.condition_modifiers[input.condition_grade] ?? 1
  const carrierMult = input.carrier_status ? settings.carrier_modifiers[input.carrier_status] ?? 1 : 1
  const batteryMult = settings.battery_modifiers[batteryTier(input.battery_health)]

  let accessoryBonus = 0
  for (const acc of input.accessories || []) accessoryBonus += settings.accessory_bonus_cents[acc] || 0

  const modifiedOffer = Math.round(baseOffer * conditionMult * carrierMult * batteryMult) + accessoryBonus

  const finalOffer = reasons.length > 0
    ? 0
    : Math.max(settings.min_offer_cents, Math.max(0, modifiedOffer))

  const storeCreditOffer = reasons.length > 0
    ? 0
    : Math.round(finalOffer * (1 + settings.store_credit_bonus_percent / 100))

  const requiresReview = finalOffer > settings.max_auto_offer_cents

  const lines: PriceBreakdown['breakdown_lines'] = [
    { label: 'Market price', amount_cents: marketCents, kind: 'neutral' },
    { label: `Shop rate (${Math.round(rate * 100)}% of market)`, amount_cents: baseOffer, kind: 'neutral' },
    { label: `Condition (${Math.round((conditionMult - 1) * 100)}%)`, amount_cents: Math.round(baseOffer * (conditionMult - 1)), kind: conditionMult >= 1 ? 'positive' : 'negative' },
  ]
  if (input.carrier_status && carrierMult !== 1) {
    lines.push({ label: `Carrier (${Math.round((carrierMult - 1) * 100)}%)`, amount_cents: Math.round(baseOffer * conditionMult * (carrierMult - 1)), kind: 'negative' })
  }
  if (batteryMult !== 1) {
    lines.push({ label: `Battery (${Math.round((batteryMult - 1) * 100)}%)`, amount_cents: Math.round(baseOffer * conditionMult * carrierMult * (batteryMult - 1)), kind: 'negative' })
  }
  if (accessoryBonus > 0) {
    lines.push({ label: 'Accessories included', amount_cents: accessoryBonus, kind: 'positive' })
  }

  return {
    market_price_cents: marketCents,
    shop_rate_percent: Math.round(rate * 100),
    base_offer_cents: baseOffer,
    condition_multiplier: conditionMult,
    carrier_multiplier: carrierMult,
    battery_multiplier: batteryMult,
    accessory_bonus_cents: accessoryBonus,
    final_offer_cents: finalOffer,
    store_credit_offer_cents: storeCreditOffer,
    auto_reject: { rejected: reasons.length > 0, reasons },
    requires_review: requiresReview,
    breakdown_lines: lines,
  }
}

export function formatCents(cents: number): string {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export const ACCESSORIES = [
  { id: 'charger', label: 'Original charger' },
  { id: 'box', label: 'Original box' },
  { id: 'earbuds', label: 'Earbuds / cable' },
  { id: 'sealed', label: 'Brand new / sealed' },
] as const

export const DEVICE_CATEGORIES = ['Phone', 'Tablet', 'Laptop', 'Console'] as const
