import Razorpay from 'razorpay'

// Lazily initialize Razorpay instance (server-side only)
let razorpayInstance: Razorpay | null = null

export function getRazorpay(): Razorpay {
  if (!razorpayInstance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay API keys are not configured')
    }
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  }
  return razorpayInstance
}

// For backwards compatibility
export const razorpay = {
  get orders() {
    return getRazorpay().orders
  },
  get payments() {
    return getRazorpay().payments
  },
}

export interface CreditPack {
  id: string
  name: string
  credits: number
  priceINR: number // in paise
  priceUSD: number // in cents
  priceDisplayINR: string
  priceDisplayUSD: string
  perCreditINR: string
  perCreditUSD: string
  popular: boolean
  description: string
  savingsINR?: string
  savingsUSD?: string
}

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: 'pack_5',
    name: '5 Credits',
    credits: 5,
    priceINR: 149900, // ₹1,499
    priceUSD: 1900, // $19
    priceDisplayINR: '₹1,499',
    priceDisplayUSD: '$19',
    perCreditINR: '₹299.80',
    perCreditUSD: '$3.80',
    popular: false,
    description: 'Perfect for trying out CIL',
  },
  {
    id: 'pack_15',
    name: '15 Credits',
    credits: 15,
    priceINR: 399900, // ₹3,999
    priceUSD: 4900, // $49
    priceDisplayINR: '₹3,999',
    priceDisplayUSD: '$49',
    perCreditINR: '₹266.60',
    perCreditUSD: '$3.27',
    popular: true,
    description: 'Best value for regular users',
    savingsINR: '11% savings',
    savingsUSD: '14% savings',
  },
  {
    id: 'pack_50',
    name: '50 Credits',
    credits: 50,
    priceINR: 999900, // ₹9,999
    priceUSD: 12900, // $129
    priceDisplayINR: '₹9,999',
    priceDisplayUSD: '$129',
    perCreditINR: '₹199.98',
    perCreditUSD: '$2.58',
    popular: false,
    description: 'For teams and organizations',
    savingsINR: '33% savings',
    savingsUSD: '32% savings',
  },
]

export type CreditPackId = 'pack_5' | 'pack_15' | 'pack_50'
export type Currency = 'INR' | 'USD'

export function getCreditPack(id: CreditPackId) {
  return CREDIT_PACKS.find(pack => pack.id === id)
}

export function getPackPrice(pack: CreditPack, currency: Currency): number {
  return currency === 'INR' ? pack.priceINR : pack.priceUSD
}

export function getPackPriceDisplay(pack: CreditPack, currency: Currency): string {
  return currency === 'INR' ? pack.priceDisplayINR : pack.priceDisplayUSD
}

export function getPackPerCredit(pack: CreditPack, currency: Currency): string {
  return currency === 'INR' ? pack.perCreditINR : pack.perCreditUSD
}

export function getPackSavings(pack: CreditPack, currency: Currency): string | undefined {
  return currency === 'INR' ? pack.savingsINR : pack.savingsUSD
}
