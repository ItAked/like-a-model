/**
 * Public website API helper (Like A Model ↔ model_api).
 * Base URL comes only from VITE_API_BASE_URL — never hardcode hosts or secrets.
 */

export class PublicApiError extends Error {
  /**
   * @param {string} message
   * @param {{ status?: number, errors?: Record<string, string[]>, code?: string }} [meta]
   */
  constructor(message, meta = {}) {
    super(message);
    this.name = 'PublicApiError';
    this.status = meta.status ?? 0;
    this.errors = meta.errors ?? null;
    this.code = meta.code ?? 'api_error';
  }
}

export function getApiBaseUrl() {
  const raw = String(import.meta.env.VITE_API_BASE_URL || '').trim();
  return raw.replace(/\/+$/, '');
}

function joinUrl(base, path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

/**
 * @param {unknown} payload
 * @param {number} status
 */
export function messageFromApiPayload(payload, status) {
  if (payload && typeof payload === 'object') {
    const body = /** @type {Record<string, unknown>} */ (payload);
    if (typeof body.message === 'string' && body.message.trim()) {
      return body.message.trim();
    }
    const errors = body.errors;
    if (errors && typeof errors === 'object') {
      for (const value of Object.values(/** @type {Record<string, unknown>} */ (errors))) {
        if (Array.isArray(value) && typeof value[0] === 'string' && value[0].trim()) {
          return value[0].trim();
        }
        if (typeof value === 'string' && value.trim()) return value.trim();
      }
    }
  }
  if (status === 422) return 'تحقق من الحقول المطلوبة ثم أعيدي المحاولة.';
  return 'تعذّر إتمام الطلب حاليًا. حاولِي مرة أخرى بعد قليل.';
}

/**
 * @param {string} path
 * @param {RequestInit & { json?: unknown }} [options]
 */
export async function apiRequest(path, options = {}) {
  const base = getApiBaseUrl();
  if (!base) {
    throw new PublicApiError('خدمة الإرسال غير مهيأة حاليًا. حاولِي لاحقًا.', {
      status: 0,
      code: 'missing_base_url',
    });
  }

  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');

  /** @type {RequestInit} */
  const init = {
    method: options.method || 'GET',
    signal: options.signal,
    headers,
  };

  if (options.json !== undefined) {
    headers.set('Content-Type', 'application/json');
    init.body = JSON.stringify(options.json);
  }

  let res;
  try {
    res = await fetch(joinUrl(base, path), init);
  } catch (err) {
    if (err && /** @type {Error} */ (err).name === 'AbortError') throw err;
    throw new PublicApiError('تعذّر الاتصال بالخادم. تحققي من الاتصال ثم أعيدي المحاولة.', {
      status: 0,
      code: 'network_error',
    });
  }

  let payload = null;
  const text = await res.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }
  }

  if (!res.ok) {
    throw new PublicApiError(messageFromApiPayload(payload, res.status), {
      status: res.status,
      errors: payload && typeof payload === 'object' ? /** @type {any} */ (payload).errors || null : null,
      code: res.status === 422 ? 'validation_error' : 'http_error',
    });
  }

  return payload;
}

/**
 * @param {unknown} raw
 * @returns {string}
 */
export function normalizeIsoDate(raw) {
  const value = String(raw || '').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';
}

/**
 * @param {{ location: string, date: string, signal?: AbortSignal }} params
 * @returns {Promise<string[]>}
 */
export async function getEvaluationSlots({ location, date, signal }) {
  const isoDate = normalizeIsoDate(date);
  if (!isoDate) return [];

  const qs = new URLSearchParams({
    location: String(location || '').trim(),
    date: isoDate,
  });
  const payload = await apiRequest(`/api/public/evaluation-slots?${qs.toString()}`, {
    method: 'GET',
    signal,
  });
  const slots = payload && typeof payload === 'object'
    ? /** @type {any} */ (payload).data?.slots
    : null;
  if (!Array.isArray(slots)) return [];
  return slots.map((s) => String(s)).filter(Boolean);
}

/**
 * @param {Record<string, unknown>} body
 */
export async function createEvaluationBooking(body) {
  return apiRequest('/api/public/evaluation-bookings', {
    method: 'POST',
    json: body,
  });
}

/**
 * @param {Record<string, unknown>} body
 */
export async function createContactRequest(body) {
  return apiRequest('/api/public/contact-requests', {
    method: 'POST',
    json: body,
  });
}
