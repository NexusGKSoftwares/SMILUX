/**
 * Shared Currency, Number & Date Formatter Utilities
 * Default Practice Currency: Kenyan Shilling (KES)
 */

export const CURRENCY_CODE = 'KES';
export const CURRENCY_LOCALE = 'en-KE';

/**
 * Formats a numeric value into standard currency string (e.g., "KES 1,485,000")
 * @param {number|string} amount
 * @param {object} options
 * @param {number} [options.decimals=0]
 * @param {boolean} [options.compact=false]
 * @param {boolean} [options.showSymbol=true]
 * @param {string} [options.currency=CURRENCY_CODE]
 * @returns {string}
 */
export function formatCurrency(
  amount,
  { decimals = 0, compact = false, showSymbol = true, currency = CURRENCY_CODE } = {}
) {
  const num = Number(amount) || 0;
  const prefix = showSymbol ? `${currency} ` : '';

  if (compact) {
    const abs = Math.abs(num);
    if (abs >= 1_000_000) {
      const m = (num / 1_000_000).toFixed(abs % 1_000_000 === 0 ? 0 : 1);
      return `${prefix}${m}M`;
    }
    if (abs >= 1_000) {
      const k = Math.round(num / 1_000);
      return `${prefix}${k}K`;
    }
    return `${prefix}${num.toLocaleString(CURRENCY_LOCALE)}`;
  }

  return `${prefix}${num.toLocaleString(CURRENCY_LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/**
 * Alias for Kenyan Shilling formatting
 */
export function formatKES(amount, options = {}) {
  return formatCurrency(amount, { ...options, currency: 'KES' });
}

/**
 * Formats a compact axis or badge currency value (e.g., "KES 163K" or "800K")
 */
export function formatCompactCurrency(amount, { showSymbol = true } = {}) {
  return formatCurrency(amount, { compact: true, showSymbol });
}

/**
 * Formats plain numbers with thousand separators (e.g., 1,420)
 */
export function formatNumber(value) {
  const num = Number(value) || 0;
  return num.toLocaleString(CURRENCY_LOCALE);
}

/**
 * Formats a date string or Date object (e.g., "7 Nov 2026")
 */
export function formatDate(date) {
  if (!date) return '—';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(CURRENCY_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formats a date and time string (e.g., "7 Nov 2026, 03:21 PM")
 */
export function formatDateTime(date) {
  if (!date) return '—';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString(CURRENCY_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const formatter = {
  CURRENCY_CODE,
  CURRENCY_LOCALE,
  formatCurrency,
  formatKES,
  formatCompactCurrency,
  formatNumber,
  formatDate,
  formatDateTime,
};

export default formatter;

