const DONATION_KEY = 'flightmetrics_donation_last_shown'

export function shouldShowDonationDialog(): boolean {
  if (typeof window === 'undefined') return false

  const lastShown = localStorage.getItem(DONATION_KEY)
  if (!lastShown) return true

  const lastShownDate = new Date(lastShown)
  const now = new Date()
  const oneWeek = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

  return now.getTime() - lastShownDate.getTime() >= oneWeek
}

export function updateDonationDialogShown(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(DONATION_KEY, new Date().toISOString())
} 