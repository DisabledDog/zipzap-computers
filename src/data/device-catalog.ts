// Device catalog for the buyback wizard — covers iPhone + Samsung most precisely
// because that's what Atlas/Mercury smart pricing covers. Others fall back to text input.

export type CatalogModel = {
  id: string
  name: string
  year: number
  storages: string[]
  colorHint?: string // tailwind gradient class for the card
}

export type CatalogBrand = {
  id: string
  name: string
  models: CatalogModel[]
}

export const PHONE_BRANDS: CatalogBrand[] = [
  {
    id: 'apple',
    name: 'Apple',
    models: [
      { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', year: 2023, storages: ['256GB', '512GB', '1TB'], colorHint: 'from-slate-700 to-slate-900' },
      { id: 'iphone-15-pro',     name: 'iPhone 15 Pro',     year: 2023, storages: ['128GB', '256GB', '512GB', '1TB'], colorHint: 'from-slate-700 to-slate-900' },
      { id: 'iphone-15-plus',    name: 'iPhone 15 Plus',    year: 2023, storages: ['128GB', '256GB', '512GB'], colorHint: 'from-pink-400 to-pink-600' },
      { id: 'iphone-15',         name: 'iPhone 15',         year: 2023, storages: ['128GB', '256GB', '512GB'], colorHint: 'from-pink-400 to-pink-600' },
      { id: 'iphone-14-pro-max', name: 'iPhone 14 Pro Max', year: 2022, storages: ['128GB', '256GB', '512GB', '1TB'], colorHint: 'from-purple-500 to-purple-800' },
      { id: 'iphone-14-pro',     name: 'iPhone 14 Pro',     year: 2022, storages: ['128GB', '256GB', '512GB', '1TB'], colorHint: 'from-purple-500 to-purple-800' },
      { id: 'iphone-14-plus',    name: 'iPhone 14 Plus',    year: 2022, storages: ['128GB', '256GB', '512GB'], colorHint: 'from-red-400 to-red-600' },
      { id: 'iphone-14',         name: 'iPhone 14',         year: 2022, storages: ['128GB', '256GB', '512GB'], colorHint: 'from-red-400 to-red-600' },
      { id: 'iphone-13-pro-max', name: 'iPhone 13 Pro Max', year: 2021, storages: ['128GB', '256GB', '512GB', '1TB'], colorHint: 'from-emerald-500 to-emerald-700' },
      { id: 'iphone-13-pro',     name: 'iPhone 13 Pro',     year: 2021, storages: ['128GB', '256GB', '512GB', '1TB'], colorHint: 'from-emerald-500 to-emerald-700' },
      { id: 'iphone-13',         name: 'iPhone 13',         year: 2021, storages: ['128GB', '256GB', '512GB'], colorHint: 'from-blue-400 to-blue-600' },
      { id: 'iphone-13-mini',    name: 'iPhone 13 mini',    year: 2021, storages: ['128GB', '256GB', '512GB'], colorHint: 'from-blue-400 to-blue-600' },
      { id: 'iphone-12-pro-max', name: 'iPhone 12 Pro Max', year: 2020, storages: ['128GB', '256GB', '512GB'], colorHint: 'from-yellow-500 to-amber-700' },
      { id: 'iphone-12-pro',     name: 'iPhone 12 Pro',     year: 2020, storages: ['128GB', '256GB', '512GB'], colorHint: 'from-yellow-500 to-amber-700' },
      { id: 'iphone-12',         name: 'iPhone 12',         year: 2020, storages: ['64GB', '128GB', '256GB'], colorHint: 'from-indigo-400 to-indigo-600' },
      { id: 'iphone-12-mini',    name: 'iPhone 12 mini',    year: 2020, storages: ['64GB', '128GB', '256GB'], colorHint: 'from-indigo-400 to-indigo-600' },
      { id: 'iphone-11-pro-max', name: 'iPhone 11 Pro Max', year: 2019, storages: ['64GB', '256GB', '512GB'], colorHint: 'from-teal-500 to-teal-700' },
      { id: 'iphone-11-pro',     name: 'iPhone 11 Pro',     year: 2019, storages: ['64GB', '256GB', '512GB'], colorHint: 'from-teal-500 to-teal-700' },
      { id: 'iphone-11',         name: 'iPhone 11',         year: 2019, storages: ['64GB', '128GB', '256GB'], colorHint: 'from-cyan-500 to-cyan-700' },
      { id: 'iphone-xs-max',     name: 'iPhone XS Max',     year: 2018, storages: ['64GB', '256GB', '512GB'], colorHint: 'from-gray-500 to-gray-700' },
      { id: 'iphone-xs',         name: 'iPhone XS',         year: 2018, storages: ['64GB', '256GB', '512GB'], colorHint: 'from-gray-500 to-gray-700' },
      { id: 'iphone-xr',         name: 'iPhone XR',         year: 2018, storages: ['64GB', '128GB', '256GB'], colorHint: 'from-rose-400 to-rose-600' },
      { id: 'iphone-se-3',       name: 'iPhone SE (3rd gen)', year: 2022, storages: ['64GB', '128GB', '256GB'], colorHint: 'from-slate-500 to-slate-700' },
      { id: 'iphone-se-2',       name: 'iPhone SE (2nd gen)', year: 2020, storages: ['64GB', '128GB', '256GB'], colorHint: 'from-slate-500 to-slate-700' },
    ],
  },
  {
    id: 'samsung',
    name: 'Samsung',
    models: [
      { id: 'galaxy-s25-ultra', name: 'Galaxy S25 Ultra', year: 2025, storages: ['256GB', '512GB', '1TB'], colorHint: 'from-slate-700 to-slate-900' },
      { id: 'galaxy-s25-plus',  name: 'Galaxy S25+',      year: 2025, storages: ['256GB', '512GB'], colorHint: 'from-slate-700 to-slate-900' },
      { id: 'galaxy-s25',       name: 'Galaxy S25',       year: 2025, storages: ['128GB', '256GB'], colorHint: 'from-slate-700 to-slate-900' },
      { id: 'galaxy-s24-ultra', name: 'Galaxy S24 Ultra', year: 2024, storages: ['256GB', '512GB', '1TB'], colorHint: 'from-indigo-600 to-indigo-900' },
      { id: 'galaxy-s24-plus',  name: 'Galaxy S24+',      year: 2024, storages: ['256GB', '512GB'], colorHint: 'from-indigo-600 to-indigo-900' },
      { id: 'galaxy-s24',       name: 'Galaxy S24',       year: 2024, storages: ['128GB', '256GB'], colorHint: 'from-indigo-600 to-indigo-900' },
      { id: 'galaxy-s23-ultra', name: 'Galaxy S23 Ultra', year: 2023, storages: ['256GB', '512GB', '1TB'], colorHint: 'from-violet-600 to-violet-900' },
      { id: 'galaxy-s23-plus',  name: 'Galaxy S23+',      year: 2023, storages: ['256GB', '512GB'], colorHint: 'from-violet-600 to-violet-900' },
      { id: 'galaxy-s23',       name: 'Galaxy S23',       year: 2023, storages: ['128GB', '256GB'], colorHint: 'from-violet-600 to-violet-900' },
      { id: 'galaxy-z-fold-6',  name: 'Galaxy Z Fold 6',  year: 2024, storages: ['256GB', '512GB', '1TB'], colorHint: 'from-emerald-700 to-emerald-900' },
      { id: 'galaxy-z-flip-6',  name: 'Galaxy Z Flip 6',  year: 2024, storages: ['256GB', '512GB'], colorHint: 'from-pink-500 to-pink-700' },
      { id: 'galaxy-note-20-ultra', name: 'Galaxy Note 20 Ultra', year: 2020, storages: ['128GB', '256GB', '512GB'], colorHint: 'from-yellow-600 to-yellow-800' },
    ],
  },
  { id: 'google', name: 'Google', models: [] },
  { id: 'other', name: 'Other', models: [] },
]

export const TABLET_BRANDS: CatalogBrand[] = [
  { id: 'apple', name: 'Apple', models: [] },
  { id: 'samsung', name: 'Samsung', models: [] },
  { id: 'microsoft', name: 'Microsoft', models: [] },
  { id: 'other', name: 'Other', models: [] },
]

export const LAPTOP_BRANDS: CatalogBrand[] = [
  { id: 'apple', name: 'Apple', models: [] },
  { id: 'dell', name: 'Dell', models: [] },
  { id: 'hp', name: 'HP', models: [] },
  { id: 'lenovo', name: 'Lenovo', models: [] },
  { id: 'asus', name: 'ASUS', models: [] },
  { id: 'other', name: 'Other', models: [] },
]

export const CONSOLE_BRANDS: CatalogBrand[] = [
  {
    id: 'sony', name: 'Sony',
    models: [
      { id: 'playstation-5-pro', name: 'PlayStation 5 Pro', year: 2024, storages: ['2TB'], colorHint: 'from-blue-600 to-blue-900' },
      { id: 'playstation-5', name: 'PlayStation 5', year: 2020, storages: ['825GB', '1TB'], colorHint: 'from-blue-500 to-blue-800' },
      { id: 'playstation-5-slim', name: 'PlayStation 5 Slim', year: 2023, storages: ['1TB'], colorHint: 'from-blue-500 to-blue-800' },
      { id: 'playstation-5-digital', name: 'PlayStation 5 Digital', year: 2020, storages: ['825GB'], colorHint: 'from-blue-500 to-blue-800' },
      { id: 'playstation-4-pro', name: 'PlayStation 4 Pro', year: 2016, storages: ['1TB'], colorHint: 'from-indigo-500 to-indigo-800' },
      { id: 'playstation-4-slim', name: 'PlayStation 4 Slim', year: 2016, storages: ['500GB', '1TB'], colorHint: 'from-indigo-500 to-indigo-800' },
      { id: 'playstation-4', name: 'PlayStation 4', year: 2013, storages: ['500GB', '1TB'], colorHint: 'from-indigo-500 to-indigo-800' },
    ],
  },
  {
    id: 'microsoft', name: 'Microsoft',
    models: [
      { id: 'xbox-series-x', name: 'Xbox Series X', year: 2020, storages: ['1TB', '2TB'], colorHint: 'from-emerald-700 to-emerald-900' },
      { id: 'xbox-series-s', name: 'Xbox Series S', year: 2020, storages: ['512GB', '1TB'], colorHint: 'from-gray-300 to-gray-500' },
      { id: 'xbox-one-x', name: 'Xbox One X', year: 2017, storages: ['1TB'], colorHint: 'from-emerald-600 to-emerald-800' },
      { id: 'xbox-one-s', name: 'Xbox One S', year: 2016, storages: ['500GB', '1TB'], colorHint: 'from-gray-300 to-gray-500' },
      { id: 'xbox-one', name: 'Xbox One', year: 2013, storages: ['500GB', '1TB'], colorHint: 'from-gray-500 to-gray-700' },
    ],
  },
  {
    id: 'nintendo', name: 'Nintendo',
    models: [
      { id: 'switch-2', name: 'Switch 2', year: 2025, storages: ['256GB'], colorHint: 'from-red-500 to-red-700' },
      { id: 'switch-oled', name: 'Switch OLED', year: 2021, storages: ['64GB'], colorHint: 'from-red-500 to-red-700' },
      { id: 'switch', name: 'Switch', year: 2017, storages: ['32GB'], colorHint: 'from-red-500 to-red-700' },
      { id: 'switch-lite', name: 'Switch Lite', year: 2019, storages: ['32GB'], colorHint: 'from-yellow-500 to-yellow-700' },
    ],
  },
  { id: 'other', name: 'Other', models: [] },
]

export function brandsForCategory(category: string): CatalogBrand[] {
  switch (category) {
    case 'Phone': return PHONE_BRANDS
    case 'Tablet': return TABLET_BRANDS
    case 'Laptop': return LAPTOP_BRANDS
    case 'Console': return CONSOLE_BRANDS
    default: return []
  }
}
