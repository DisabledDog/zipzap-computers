'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowLeft, Check, Smartphone, Monitor, Tablet, Gamepad2, AlertTriangle, Phone, Search, Zap, Clock, ShieldCheck, MapPin, HelpCircle, X } from 'lucide-react'
import {
  DEFAULT_SETTINGS,
  type BuybackSettings, type ConditionGrade, type CarrierStatus, type DamageDeduction,
  formatCents, findDeduction,
} from '@/lib/buybacks'

/* ========= Config ========= */

type Substep =
  | 'category' | 'brand' | 'model' | 'storage' | 'carrier'
  | 'condition'
  | 'offer' | 'contact'
  | 'done'

const CATEGORIES = [
  { id: 'Phone',   label: 'Phone',   icon: Smartphone },
  { id: 'Tablet',  label: 'Tablet',  icon: Tablet },
  { id: 'Laptop',  label: 'Laptop',  icon: Monitor },
  { id: 'Console', label: 'Console', icon: Gamepad2 },
] as const

const BRANDS: Record<string, string[]> = {
  Phone:   ['Apple', 'Samsung', 'Google', 'OnePlus', 'Motorola', 'Other'],
  Tablet:  ['Apple', 'Samsung', 'Microsoft', 'Amazon', 'Other'],
  Laptop:  ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Microsoft', 'Other'],
  Console: ['Sony', 'Microsoft', 'Nintendo', 'Other'],
}

const LOCKED_CARRIER_NAMES = 'Verizon, AT&T, T-Mobile, Sprint, Cricket, Metro, Boost, Straight Talk'

const CONDITIONS: { id: string; title: string; description: string; grade: ConditionGrade }[] = [
  { id: 'like_new', title: 'Like New',         description: 'No visible wear. Basically indistinguishable from new.',                grade: 'like_new' },
  { id: 'used',     title: 'Used',             description: 'Light scratches from normal use. Everything works.',                    grade: 'good' },
  { id: 'rough',    title: 'Heavy Wear',       description: 'Visible scratches, scuffs, cracked glass, or dents. Still works.',     grade: 'fair' },
  { id: 'damaged',  title: 'Extremely Damaged', description: 'Dots or lines on screen, water damage, DOA, etc.',                    grade: 'damaged' },
]


type AtlasModel = { name: string; storages: string[]; unlocked: boolean; locked: boolean }
type AtlasCatalog = { brand: string; models: AtlasModel[] }[]

type Draft = {
  category: '' | 'Phone' | 'Tablet' | 'Laptop' | 'Console'
  brand: string
  model: string
  storage: string
  carrier_name: string
  carrier_status: CarrierStatus | ''
  condition_id: string
  condition_grade: ConditionGrade | ''
  name: string
  contact: string     // phone or email
  honeypot: string
}

const EMPTY: Draft = {
  category: '', brand: '', model: '', storage: '',
  carrier_name: '', carrier_status: '', condition_id: '', condition_grade: '',
  name: '', contact: '', honeypot: '',
}

/* ========= Component ========= */

export default function BuybackWizard() {
  const [settings, setSettings] = useState<Pick<BuybackSettings, 'enabled' | 'accepted_categories' | 'expiration_days' | 'store_credit_bonus_percent' | 'damage_deductions'> | null>(null)
  const [catalog, setCatalog] = useState<AtlasCatalog>([])
  const [substep, setSubstep] = useState<Substep>('category')
  const [draft, setDraft] = useState<Draft>(EMPTY)
  const [serverOffer, setServerOffer] = useState<any>(null)
  const [smartSource, setSmartSource] = useState<string | null>(null)
  const [loadingOffer, setLoadingOffer] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    fetch('/api/buyback').then((r) => r.json()).then((d) => {
      if (d.success) setSettings(d)
    }).catch(() => setSettings({
      enabled: true,
      accepted_categories: [...DEFAULT_SETTINGS.accepted_categories],
      expiration_days: 7,
      store_credit_bonus_percent: 10,
      damage_deductions: [],
    }))
    fetch('/api/buyback/catalog').then((r) => r.json()).then((d) => {
      if (d.success) setCatalog(d.catalog || [])
    }).catch(() => {})
  }, [])

  const useAtlas = draft.category === 'Phone' && draft.brand === 'Apple'
  const atlasModels = catalog.find((b) => b.brand === 'Apple')?.models || []
  const selectedAtlasModel = atlasModels.find((m) => m.name === draft.model)

  // Progress step count
  const steps: Substep[] = useMemo(() => {
    const arr: Substep[] = ['category', 'brand', 'model']
    if (useAtlas || draft.category === 'Phone') arr.push('storage')
    if (draft.category === 'Phone') arr.push('carrier')
    arr.push('condition', 'offer', 'contact')
    return arr
  }, [draft.category, useAtlas])

  const stepIndex = steps.indexOf(substep)
  const progressPct = stepIndex >= 0 ? ((stepIndex + 1) / steps.length) * 100 : 100

  function goNext() {
    const idx = steps.indexOf(substep)
    if (idx < 0 || idx === steps.length - 1) return
    const next = steps[idx + 1]
    setSubstep(next)
    if (next === 'offer') fetchServerOffer()
  }
  function goBack() {
    const idx = steps.indexOf(substep)
    if (idx <= 0) return
    setSubstep(steps[idx - 1])
  }

  async function fetchServerOffer() {
    if (!draft.category || !draft.condition_grade) return
    setLoadingOffer(true)
    try {
      const res = await fetch('/api/buyback', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preview: true,
          device_category: draft.category,
          device_brand: draft.brand,
          device_model: draft.model,
          storage: draft.storage,
          carrier_status: draft.carrier_status || null,
          condition_grade: draft.condition_grade,
        }),
      })
      const d = await res.json()
      if (d.success) { setServerOffer(d.breakdown); setSmartSource(d.smart_pricing_source || null) }
    } finally { setLoadingOffer(false) }
  }

  async function submit() {
    setSubmitting(true)
    const looksLikeEmail = draft.contact.includes('@')
    try {
      const res = await fetch('/api/buyback', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          device_category: draft.category,
          device_brand: draft.brand,
          device_model: draft.model,
          storage: draft.storage || null,
          carrier_status: draft.carrier_status || null,
          condition_grade: draft.condition_grade,
          customer_name: draft.name,
          customer_phone: looksLikeEmail ? null : draft.contact || null,
          customer_email: looksLikeEmail ? draft.contact : null,
          website: draft.honeypot,
        }),
      })
      const d = await res.json()
      if (d.success && d.quote_id) { setResult({ quote_id: d.quote_id, ...d.offer }); setSubstep('done') }
      else alert(d.error || 'Submission failed')
    } catch { alert('Network error') } finally { setSubmitting(false) }
  }

  if (settings && !settings.enabled) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Buybacks paused</h3>
        <p className="text-sm text-gray-500">Please call (503) 400-9920.</p>
      </div>
    )
  }

  /* ========= Render ========= */

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress + back */}
      {substep !== 'done' && (
        <div className="flex items-center gap-3 mb-10">
          {stepIndex > 0 ? (
            <button onClick={goBack} className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : <div className="w-9" />}
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500 rounded-full" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="text-xs font-bold text-gray-400 min-w-[40px] text-right tabular-nums">{stepIndex + 1}/{steps.length}</div>
        </div>
      )}

      <div className="min-h-[400px]">
        {substep === 'category' && (
          <Screen heading="What are you selling?">
            <Grid cols={2}>
              {CATEGORIES.map((c) => {
                const Icon = c.icon
                const ok = (settings?.accepted_categories || CATEGORIES.map((x) => x.id)).includes(c.id as any)
                return (
                  <Tile
                    key={c.id}
                    disabled={!ok}
                    onClick={() => { setDraft({ ...EMPTY, category: c.id }); setSubstep('brand') }}
                    selected={draft.category === c.id}
                  >
                    <Icon className="h-8 w-8 mb-3" />
                    <div className="text-base font-semibold">{c.label}</div>
                  </Tile>
                )
              })}
            </Grid>
          </Screen>
        )}

        {substep === 'brand' && (
          <Screen heading={`Which brand of ${draft.category?.toLowerCase()}?`}>
            <Grid cols={2}>
              {(BRANDS[draft.category] || []).map((b) => (
                <Tile
                  key={b}
                  onClick={() => { setDraft({ ...draft, brand: b, model: '', storage: '', carrier_name: '', carrier_status: '' }); setSubstep('model') }}
                  selected={draft.brand === b}
                >
                  <div className="text-lg font-semibold">{b}</div>
                </Tile>
              ))}
            </Grid>
          </Screen>
        )}

        {substep === 'model' && useAtlas && atlasModels.length > 0 && (
          <ModelPickerAtlas
            models={atlasModels}
            selected={draft.model}
            onPick={(m) => { setDraft({ ...draft, model: m, storage: '' }); setSubstep('storage') }}
          />
        )}

        {substep === 'model' && (!useAtlas || atlasModels.length === 0) && (
          <Screen heading="Which model?">
            <ModelPickerFreeText
              value={draft.model}
              placeholder={modelPlaceholder(draft.category, draft.brand)}
              onChange={(v) => setDraft({ ...draft, model: v })}
              onNext={() => draft.model.trim().length > 1 && goNext()}
            />
          </Screen>
        )}

        {substep === 'storage' && (
          <Screen heading="Storage size?">
            <StoragePicker
              selected={draft.storage}
              options={selectedAtlasModel?.storages?.length ? selectedAtlasModel.storages : ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB']}
              onPick={(s) => { setDraft({ ...draft, storage: s }); goNext() }}
            />
          </Screen>
        )}

        {substep === 'carrier' && (
          <CarrierScreen
            selected={draft.carrier_name}
            onPick={(name, status) => { setDraft({ ...draft, carrier_name: name, carrier_status: status }); goNext() }}
          />
        )}

        {substep === 'condition' && (
          <Screen heading="What condition is it in?" subheading="Pick the closest match.">
            <div className="space-y-2.5">
              {CONDITIONS.map((c) => (
                <div key={c.id}>
                  <ConditionRow
                    condition={c}
                    selected={draft.condition_id === c.id}
                    onClick={() => { setDraft({ ...draft, condition_id: c.id, condition_grade: c.grade }); goNext() }}
                  />
                  {c.id === 'rough' && draft.brand && draft.model && (() => {
                    const ded = findDeduction(settings?.damage_deductions || [], 'cracked_back', draft.brand, draft.model)
                    if (!ded) return null
                    return (
                      <div className="mt-2 ml-1 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-[12px] text-amber-900 flex items-start gap-2">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>
                          An extra deduction may apply if the back glass is shattered or cracked.
                        </span>
                      </div>
                    )
                  })()}
                </div>
              ))}
            </div>
          </Screen>
        )}

        {substep === 'offer' && (
          <OfferScreen
            loading={loadingOffer}
            offer={serverOffer}
            smartSource={smartSource}
            onAccept={goNext}
          />
        )}

        {substep === 'contact' && (
          <Screen heading="Where should we send your offer?" subheading={serverOffer?.auto_reject?.rejected ? "We'll call to arrange a look in person." : "We'll text or email to confirm."}>
            <ContactForm
              draft={draft}
              setDraft={setDraft}
              submitting={submitting}
              onSubmit={submit}
            />

            {/* Before-you-submit notices */}
            <div className="space-y-2 pt-2">
              {/* Backglass — only when Heavy Wear was picked AND a matching deduction exists */}
              {draft.condition_id === 'rough' && draft.brand && draft.model && (() => {
                const ded = findDeduction(settings?.damage_deductions || [], 'cracked_back', draft.brand, draft.model)
                if (!ded) return null
                return (
                  <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-[13px] text-amber-900 leading-snug">
                      An extra deduction may apply if the back glass is shattered or cracked.
                    </div>
                  </div>
                )
              })()}

              {/* iCloud / passcode — phones only */}
              {draft.category === 'Phone' && (
                <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div className="text-[13px] text-rose-900 leading-snug">
                    <strong>Heads up:</strong> we don&apos;t purchase phones that are <strong>iCloud locked</strong> or <strong>passcode locked</strong>.
                    Please bring it <strong>reset</strong> with <strong>Find My iPhone removed</strong>.
                  </div>
                </div>
              )}
            </div>
          </Screen>
        )}

        {substep === 'done' && <DoneScreen result={result} expirationDays={settings?.expiration_days || 7} />}
      </div>
    </div>
  )
}

/* ========= Screens & building blocks ========= */

function CarrierScreen({ selected, onPick }: {
  selected: string
  onPick: (name: string, status: CarrierStatus) => void
}) {
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <Screen heading="Who's your carrier?">
      {/* Unlocked */}
      <button
        onClick={() => onPick('Unlocked', 'unlocked')}
        className={`relative w-full p-6 rounded-3xl border-2 transition-all duration-200 text-left ${
          selected === 'Unlocked'
            ? 'border-yellow-500 bg-yellow-50 shadow-lg shadow-yellow-500/20 scale-[1.01]'
            : 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:border-emerald-500 hover:shadow-md'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">Unlocked</div>
            <div className="text-xs text-emerald-700 font-bold tracking-wider uppercase mt-1">✨ Highest offer</div>
            <div className="text-xs text-gray-500 mt-1">Works with any SIM</div>
          </div>
        </div>
        {selected === 'Unlocked' && (
          <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center shadow">
            <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
          </div>
        )}
      </button>

      {/* Carrier Locked */}
      <button
        onClick={() => onPick('Carrier Locked', 'locked_big3')}
        className={`relative w-full p-6 rounded-3xl border-2 transition-all duration-200 text-left ${
          selected === 'Carrier Locked'
            ? 'border-yellow-500 bg-yellow-50 shadow-md scale-[1.01]'
            : 'border-gray-200 bg-white hover:border-gray-900 hover:shadow-md'
        }`}
      >
        <div className="text-xl font-bold text-gray-900">Carrier Locked</div>
        <div className="text-xs text-gray-500 mt-1">{LOCKED_CARRIER_NAMES}</div>
        {selected === 'Carrier Locked' && (
          <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center shadow">
            <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
          </div>
        )}
      </button>

      {/* Not sure + help icon */}
      <div className="flex items-stretch gap-2">
        <button
          onClick={() => onPick('Not sure', 'unknown')}
          className={`relative flex-1 p-4 rounded-2xl border-2 text-left transition-all duration-150 ${
            selected === 'Not sure'
              ? 'border-yellow-500 bg-yellow-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-400'
          }`}
        >
          <div className="text-base font-semibold text-gray-900">Not sure</div>
          <div className="text-xs text-gray-500 mt-0.5">We&apos;ll quote the locked rate and verify in-store</div>
          {selected === 'Not sure' && (
            <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center">
              <Check className="h-3 w-3 text-black" strokeWidth={3} />
            </div>
          )}
        </button>
        <button
          type="button"
          onClick={() => setHelpOpen(true)}
          className="flex-shrink-0 w-14 rounded-2xl border-2 border-gray-200 bg-white hover:border-gray-900 hover:bg-gray-50 text-gray-500 hover:text-gray-900 inline-flex flex-col items-center justify-center gap-0.5"
          aria-label="How to check carrier status"
        >
          <HelpCircle className="h-5 w-5" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Help</span>
        </button>
      </div>

      {/* Centered modal — escapes any parent overflow / z-index */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setHelpOpen(false)}>
          <div
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-bold text-gray-900 text-base">How to check your carrier status</h4>
              <button onClick={() => setHelpOpen(false)} className="text-gray-400 hover:text-gray-700 -mt-1 -mr-1 p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <div className="font-semibold text-gray-900 mb-1.5 text-sm">On iPhone</div>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Open <strong>Settings</strong></li>
                  <li>Tap <strong>General</strong> → <strong>About</strong></li>
                  <li>Scroll to the bottom</li>
                  <li>Find the <strong>Carrier Lock</strong> row</li>
                </ol>
                <ul className="mt-2 ml-1 space-y-1 text-xs bg-gray-50 rounded-lg p-3">
                  <li>• &ldquo;<strong>No SIM restrictions</strong>&rdquo; → Unlocked</li>
                  <li>• &ldquo;<strong>SIM locked</strong>&rdquo; → Carrier Locked</li>
                </ul>
              </div>

              <div>
                <div className="font-semibold text-gray-900 mb-1.5 text-sm">On Android</div>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Open <strong>Settings</strong></li>
                  <li>Tap <strong>About phone</strong> → <strong>SIM status</strong></li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => setHelpOpen(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </Screen>
  )
}

function Screen({ heading, subheading, children }: { heading: string; subheading?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{heading}</h2>
        {subheading && <p className="text-gray-500">{subheading}</p>}
      </div>
      {children}
    </div>
  )
}

function Grid({ cols, children }: { cols: 2 | 3; children: React.ReactNode }) {
  return <div className={`grid gap-2.5 ${cols === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>{children}</div>
}

function Tile({ children, onClick, selected, disabled, emphasis }: {
  children: React.ReactNode; onClick?: () => void; selected?: boolean; disabled?: boolean; emphasis?: 'best';
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative p-6 rounded-3xl border-2 text-left transition-all duration-200
        ${disabled ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed' :
          selected ? 'border-yellow-500 bg-yellow-50 text-gray-900 shadow-lg shadow-yellow-500/20 scale-[1.02]' :
          emphasis === 'best' ? 'border-emerald-200 bg-emerald-50/60 hover:border-emerald-400 hover:shadow-md text-gray-900' :
          'border-gray-200 bg-white hover:border-gray-900 hover:shadow-md text-gray-900'}
      `}
    >
      {children}
      {selected && (
        <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center shadow">
          <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
        </div>
      )}
    </button>
  )
}

function ModelPickerAtlas({ models, selected, onPick }: { models: AtlasModel[]; selected: string; onPick: (m: string) => void }) {
  const [q, setQ] = useState('')
  const filtered = q ? models.filter((m) => m.name.toLowerCase().includes(q.toLowerCase())) : models

  return (
    <Screen heading="Which iPhone?">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search — e.g. 15 Pro"
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:bg-white text-gray-900 outline-none focus:border-gray-900 text-base transition-colors"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[55vh] overflow-y-auto pr-1 -mr-1">
        {filtered.map((m) => {
          const on = selected === m.name
          return (
            <button
              key={m.name}
              onClick={() => onPick(m.name)}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-150 ${
                on ? 'border-yellow-500 bg-yellow-50 shadow-md shadow-yellow-500/20' :
                'border-gray-200 bg-white hover:border-gray-900 hover:shadow-sm'
              }`}
            >
              <div className="text-[14px] font-bold text-gray-900 leading-snug">{m.name}</div>
              {on && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center shadow">
                  <Check className="h-3 w-3 text-black" strokeWidth={3} />
                </div>
              )}
            </button>
          )
        })}
        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-gray-400 italic p-6 text-center">No matches — try a different search.</p>
        )}
      </div>
    </Screen>
  )
}

type IphoneSpec = { tier: string | null; year: string; bg: string }

function iphoneSpec(name: string): IphoneSpec {
  const n = name.toLowerCase()
  if (n.includes('17 pro')) return { tier: 'Pro', year: '25', bg: 'from-stone-600 to-stone-800' }
  if (n.includes('17')) return { tier: null, year: '25', bg: 'from-blue-500 to-blue-700' }
  if (n.includes('16 pro')) return { tier: 'Pro', year: '24', bg: 'from-neutral-600 to-neutral-800' }
  if (n.includes('16')) return { tier: null, year: '24', bg: 'from-rose-400 to-rose-600' }
  if (n.includes('15 pro')) return { tier: 'Pro', year: '23', bg: 'from-stone-500 to-stone-700' }
  if (n.includes('15')) return { tier: null, year: '23', bg: 'from-pink-400 to-pink-600' }
  if (n.includes('14 pro')) return { tier: 'Pro', year: '22', bg: 'from-purple-600 to-purple-800' }
  if (n.includes('14')) return { tier: null, year: '22', bg: 'from-red-400 to-red-600' }
  if (n.includes('13 pro')) return { tier: 'Pro', year: '21', bg: 'from-emerald-600 to-emerald-800' }
  if (n.includes('13')) return { tier: null, year: '21', bg: 'from-blue-400 to-blue-600' }
  if (n.includes('12 pro')) return { tier: 'Pro', year: '20', bg: 'from-amber-500 to-amber-700' }
  if (n.includes('12')) return { tier: null, year: '20', bg: 'from-indigo-400 to-indigo-600' }
  if (n.includes('11 pro')) return { tier: 'Pro', year: '19', bg: 'from-teal-500 to-teal-700' }
  if (n.includes('11')) return { tier: null, year: '19', bg: 'from-cyan-500 to-cyan-700' }
  if (n.includes('se')) return { tier: 'SE', year: 'SE', bg: 'from-slate-400 to-slate-600' }
  if (n.includes('xs')) return { tier: null, year: 'XS', bg: 'from-gray-500 to-gray-700' }
  if (n.includes('xr')) return { tier: null, year: 'XR', bg: 'from-rose-300 to-rose-500' }
  if (n.includes('x')) return { tier: null, year: 'X', bg: 'from-gray-500 to-gray-700' }
  return { tier: null, year: '', bg: 'from-gray-400 to-gray-600' }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _IphoneIconDeprecated({ variant, cameras, tint }: { variant: any; cameras: 1 | 2 | 3; tint: string }) {
  // Back view — what really distinguishes iPhones is the camera layout.
  // Drawn at 80×164 viewBox, rendered ~100px tall.
  const isSquareModule = cameras >= 2 && variant !== 'home'
  return (
    <svg viewBox="0 0 80 164" className="h-[100px] w-auto" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))' }}>
      <defs>
        <linearGradient id={`body-${tint}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tint} stopOpacity="1" />
          <stop offset="100%" stopColor={tint} stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id={`lens-${tint}`} cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="70%" stopColor="#0f0f0f" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
      </defs>

      {/* Body */}
      <rect x="3" y="3" width="74" height="158" rx="14" ry="14" fill={`url(#body-${tint})`} stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />

      {/* Side buttons (subtle) */}
      <rect x="2.5" y="34" width="1.5" height="14" rx="0.75" fill="rgba(0,0,0,0.12)" />
      <rect x="2.5" y="55" width="1.5" height="8" rx="0.75" fill="rgba(0,0,0,0.12)" />
      <rect x="2.5" y="67" width="1.5" height="8" rx="0.75" fill="rgba(0,0,0,0.12)" />
      <rect x="76" y="44" width="1.5" height="14" rx="0.75" fill="rgba(0,0,0,0.12)" />

      {/* Camera module — distinguishing feature */}
      {variant === 'home' && (
        // SE: small centered lens at top back
        <g transform="translate(13, 14)">
          <rect x="0" y="0" width="14" height="14" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(0,0,0,0.1)" strokeWidth="0.4" />
          <circle cx="7" cy="7" r="4" fill={`url(#lens-${tint})`} />
          <circle cx="7" cy="7" r="1.2" fill="#6b7280" opacity="0.6" />
        </g>
      )}

      {variant === 'notch' && cameras === 1 && (
        // iPhone XR style — single lens in rounded square
        <g transform="translate(13, 14)">
          <rect x="0" y="0" width="20" height="20" rx="5" fill="rgba(255,255,255,0.10)" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
          <circle cx="10" cy="10" r="6" fill={`url(#lens-${tint})`} />
          <circle cx="10" cy="10" r="2" fill="#374151" opacity="0.7" />
        </g>
      )}

      {/* Square camera module — 2 or 3 lens diagonal layout (11, 12, 13, 14 style) */}
      {(variant === 'notch') && cameras >= 2 && (
        <g transform="translate(10, 12)">
          <rect x="0" y="0" width="26" height="26" rx="6" fill="rgba(255,255,255,0.12)" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
          {cameras === 2 ? (
            <>
              <circle cx="8" cy="8" r="4.5" fill={`url(#lens-${tint})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
              <circle cx="18" cy="18" r="4.5" fill={`url(#lens-${tint})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
              {/* flash */}
              <circle cx="18" cy="8" r="1.6" fill="#fef9c3" />
            </>
          ) : (
            <>
              <circle cx="7" cy="7" r="4" fill={`url(#lens-${tint})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
              <circle cx="19" cy="7" r="4" fill={`url(#lens-${tint})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
              <circle cx="7" cy="19" r="4" fill={`url(#lens-${tint})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
              {/* flash + LiDAR */}
              <circle cx="19" cy="15.5" r="1.4" fill="#fef9c3" />
              <circle cx="19" cy="20.5" r="1.4" fill="rgba(255,255,255,0.2)" stroke="#1f2937" strokeWidth="0.3" />
            </>
          )}
        </g>
      )}

      {/* Dynamic Island era — same square module but slightly larger */}
      {variant === 'dynamic-island' && (
        <g transform="translate(8, 10)">
          <rect x="0" y="0" width="30" height="30" rx="7" fill="rgba(255,255,255,0.12)" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
          {cameras === 2 ? (
            <>
              <circle cx="9" cy="9" r="5.2" fill={`url(#lens-${tint})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
              <circle cx="21" cy="21" r="5.2" fill={`url(#lens-${tint})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
              <circle cx="21" cy="9" r="1.8" fill="#fef9c3" />
            </>
          ) : (
            <>
              <circle cx="8" cy="8" r="4.8" fill={`url(#lens-${tint})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
              <circle cx="22" cy="8" r="4.8" fill={`url(#lens-${tint})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
              <circle cx="8" cy="22" r="4.8" fill={`url(#lens-${tint})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
              <circle cx="22" cy="17" r="1.6" fill="#fef9c3" />
              <circle cx="22" cy="23.5" r="1.6" fill="rgba(255,255,255,0.25)" stroke="#1f2937" strokeWidth="0.3" />
            </>
          )}
          {/* lens center highlight */}
          {cameras >= 2 && <circle cx="9" cy="9" r="1.5" fill="#374151" opacity="0.5" />}
        </g>
      )}

      {/* Subtle Apple-logo-sized dimple in center of back (not the logo itself) */}
      <circle cx="40" cy="82" r="5" fill="rgba(255,255,255,0.06)" />

      {/* Bottom speaker grill hint */}
      <rect x="32" y="157" width="16" height="0.8" rx="0.4" fill="rgba(0,0,0,0.2)" />
    </svg>
  )
}

function ModelPickerFreeText({ value, placeholder, onChange, onNext }: {
  value: string; placeholder: string; onChange: (v: string) => void; onNext: () => void;
}) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') onNext() }}
        autoFocus
        placeholder={placeholder}
        className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-gray-900 text-lg outline-none focus:border-gray-900"
      />
      <button
        onClick={onNext}
        disabled={value.trim().length < 2}
        className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl transition-colors inline-flex items-center justify-center gap-2"
      >
        Continue <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}

function StoragePicker({ selected, options, onPick }: { selected: string; options: string[]; onPick: (s: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {options.map((s) => (
        <button
          key={s}
          onClick={() => onPick(s)}
          className={`relative py-5 rounded-2xl border-2 font-bold transition-all text-xl ${
            selected === s ? 'border-yellow-500 bg-yellow-50 text-gray-900 shadow-md shadow-yellow-500/20' : 'border-gray-200 bg-white hover:border-gray-900 text-gray-900'
          }`}
        >
          {s}
          {selected === s && (
            <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center">
              <Check className="h-3 w-3 text-black" strokeWidth={3} />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

function ConditionRow({ condition, selected, onClick }: {
  condition: typeof CONDITIONS[0]; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-150 ${
        selected ? 'border-yellow-500 bg-yellow-50 shadow-lg shadow-yellow-500/20' : 'border-gray-200 bg-white hover:border-gray-900 hover:shadow-sm'
      }`}
    >
      <div className="flex-1">
        <div className="font-bold text-[16px] text-gray-900">{condition.title}</div>
        <div className="text-sm mt-1 text-gray-500 leading-relaxed">{condition.description}</div>
      </div>
      <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
        selected ? 'bg-yellow-500 scale-100' : 'bg-gray-100 scale-90'
      }`}>
        {selected && <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />}
      </div>
    </button>
  )
}

function OfferScreen({ loading, offer, smartSource, onAccept }: {
  loading: boolean; offer: any; smartSource: string | null; onAccept: () => void;
}) {
  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4" />
        <p className="text-gray-500">Pulling live market prices…</p>
      </div>
    )
  }

  const rejected = offer?.auto_reject?.rejected
  const finalCents = offer?.final_offer_cents || 0
  const creditCents = offer?.store_credit_offer_cents || 0

  if (rejected) {
    return (
      <Screen heading="We need to see it in person">
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <AlertTriangle className="h-6 w-6 text-orange-500 mb-3" />
          <p className="text-sm text-gray-700 mb-4">Drop your info below — we&apos;ll give you a real number once we take a look.</p>
        </div>
        <button onClick={onAccept} className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 rounded-2xl transition-colors inline-flex items-center justify-center gap-2 text-base">
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </Screen>
    )
  }

  if (finalCents === 0) {
    return (
      <Screen heading="Custom quote needed">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-700">We don&apos;t have a live price for this exact device — submit your info and a technician will send a custom offer within one business day.</p>
        </div>
        <button onClick={onAccept} className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 rounded-2xl transition-colors inline-flex items-center justify-center gap-2 text-base">
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      </Screen>
    )
  }

  return (
    <div className="space-y-6">
      {smartSource && smartSource !== 'none' && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            <Zap className="h-3 w-3" /> Live market price
          </div>
        </div>
      )}
      <div className="text-center py-6">
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Your offer</div>
        <div className="text-7xl font-bold text-gray-900 tracking-tight">{formatCents(finalCents)}</div>
        <div className="text-gray-500 mt-2 text-sm">
          in cash, or <span className="font-semibold text-gray-900">{formatCents(creditCents)} store credit</span>
        </div>
      </div>
      <details className="text-xs text-gray-500 group">
        <summary className="cursor-pointer text-center hover:text-gray-900 font-medium">How we got this number</summary>
        <div className="mt-3 space-y-1 bg-gray-50 rounded-xl p-4">
          {(offer.breakdown_lines || []).map((line: any, i: number) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span>{line.label}</span>
              <span className="font-semibold text-gray-900">{line.amount_cents >= 0 ? '+' : ''}{formatCents(line.amount_cents)}</span>
            </div>
          ))}
        </div>
      </details>
      <button onClick={onAccept} className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-4 rounded-2xl transition-colors inline-flex items-center justify-center gap-2 text-base">
        Lock in my offer <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}

function ContactForm({ draft, setDraft, submitting, onSubmit }: {
  draft: Draft; setDraft: (d: Draft) => void; submitting: boolean; onSubmit: () => void;
}) {
  const ready = draft.name.trim().length >= 2 && draft.contact.trim().length >= 5
  return (
    <div className="space-y-3">
      <input
        type="text"
        value={draft.name}
        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
        placeholder="Your name"
        autoFocus
        className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-gray-900 text-lg outline-none focus:border-gray-900"
      />
      <input
        type="text"
        value={draft.contact}
        onChange={(e) => setDraft({ ...draft, contact: e.target.value })}
        placeholder="Phone or email"
        className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-gray-900 text-lg outline-none focus:border-gray-900"
      />
      <input
        type="text" value={draft.honeypot} onChange={(e) => setDraft({ ...draft, honeypot: e.target.value })}
        className="hidden" tabIndex={-1} autoComplete="off"
      />
      <button
        onClick={onSubmit}
        disabled={!ready || submitting}
        className="w-full bg-gray-900 hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl transition-colors inline-flex items-center justify-center gap-2 text-base"
      >
        {submitting ? 'Submitting…' : 'Submit'} {!submitting && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="text-xs text-gray-400 text-center pt-2">
        Bring a photo ID when you come in — required by Oregon law.
      </p>
    </div>
  )
}

function DoneScreen({ result, expirationDays }: { result: any; expirationDays: number }) {
  if (!result) return null
  const rejected = result.auto_reject?.rejected
  const finalCents = result.final_offer_cents || 0

  return (
    <div className="text-center py-10 space-y-6">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="h-8 w-8 text-emerald-600" strokeWidth={3} />
      </div>
      {rejected ? (
        <>
          <h2 className="text-3xl font-bold text-gray-900">Thanks — we got it</h2>
          <p className="text-gray-500 max-w-sm mx-auto">We&apos;ll reach out within one business day.</p>
        </>
      ) : finalCents > 0 ? (
        <>
          <h2 className="text-3xl font-bold text-gray-900">You&apos;re locked in</h2>
          <div className="text-6xl font-bold text-gray-900">{formatCents(finalCents)}</div>
          <p className="text-sm text-gray-500">or {formatCents(result.store_credit_offer_cents)} store credit</p>
          <div className="max-w-md mx-auto text-sm text-gray-600 space-y-2 pt-4 text-left">
            <div className="flex items-start gap-2"><Clock className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" /><span>Good for <strong className="text-gray-900">{expirationDays} days</strong></span></div>
            <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" /><span>Bring to our Salem or Brooks shop</span></div>
            <div className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" /><span>Photo ID required</span></div>
          </div>
          <div className="max-w-md mx-auto mt-2 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-left">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="text-[13px] text-rose-900 leading-snug">
                <strong>Before you come in:</strong> reset the phone and remove <strong>Find My iPhone</strong>.
                We can&apos;t purchase iCloud-locked or passcode-locked devices.
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-900">Request submitted</h2>
          <p className="text-gray-500 max-w-sm mx-auto">We&apos;ll send a custom offer within one business day.</p>
        </>
      )}
      <a href="tel:5034009920" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold px-6 py-3 rounded-2xl">
        <Phone className="h-4 w-4" /> (503) 400-9920
      </a>
    </div>
  )
}

function modelPlaceholder(category: string, brand: string): string {
  if (category === 'Phone') {
    if (brand === 'Samsung') return 'Galaxy S24 Ultra'
    if (brand === 'Google') return 'Pixel 8 Pro'
    if (brand === 'OnePlus') return 'OnePlus 12'
    return 'Model name'
  }
  if (category === 'Tablet') return brand === 'Apple' ? 'iPad Pro 12.9"' : 'Galaxy Tab S9'
  if (category === 'Laptop') return brand === 'Apple' ? 'MacBook Pro 14" M3' : 'XPS 15, ThinkPad X1'
  if (category === 'Console') return 'PlayStation 5 Slim, Xbox Series X, Switch OLED'
  return 'Model name'
}
