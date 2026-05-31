export const CONTACT_ROUTE = "/contact";
export const CONTACT_EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
export const CONTACT_EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
export const CONTACT_EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
export const CONTACT_SUBJECT_PREFIX = "Solicitud Ingenia";
export const CONTACT_SUPPORT_SUBJECT_PREFIX = "Apoyo Ingenia";
export const CONTACT_FORM_LABEL = "Formulario de contacto";
export const CONTACT_SUPPORT_FORM_LABEL = "Formulario de apoyo";
export const CONTACT_RATE_LIMIT_STORAGE_KEY = "ingenia_contact_rate_limit";
export const CONTACT_RATE_LIMIT_MIN_INTERVAL_MS = 60_000;
export const CONTACT_RATE_LIMIT_BURST_WINDOW_MS = 10 * 60_000;
export const CONTACT_RATE_LIMIT_MAX_ATTEMPTS = 5;
export const CONTACT_RATE_LIMIT_RETENTION_MS = 24 * 60 * 60_000;

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  scenario: string;
  message: string;
};

export function buildContactPayload(submission: ContactSubmission) {
  return {
    source: CONTACT_FORM_LABEL,
    subject: `${CONTACT_SUBJECT_PREFIX} - ${submission.scenario}`,
    from_name: submission.name,
    from_email: submission.email,
    company: submission.company || "No indicada",
    interest: "",
    scenario: submission.scenario,
    message: submission.message || "No incluido",
    reply_to: submission.email,
    submitted_at: new Date().toISOString()
  };
}

export type SupportSubmission = {
  contactType: string;
  name: string;
  email: string;
  company: string;
  message: string;
};

export function buildSupportPayload(submission: SupportSubmission, interestLabel: string) {
  return {
    source: CONTACT_SUPPORT_FORM_LABEL,
    subject: `${CONTACT_SUPPORT_SUBJECT_PREFIX} - ${interestLabel}`,
    from_name: submission.name,
    from_email: submission.email,
    company: submission.company || "No indicada",
    interest: interestLabel,
    scenario: "",
    message: submission.message || "No incluido",
    reply_to: submission.email,
    submitted_at: new Date().toISOString()
  };
}

export type RateLimitState = {
  timestamps: number[];
  blockedUntil?: number;
};

export function getRateLimitState(now: number = Date.now()): RateLimitState {
  if (typeof window === "undefined") {
    return { timestamps: [] };
  }

  try {
    const raw = window.localStorage.getItem(CONTACT_RATE_LIMIT_STORAGE_KEY);
    if (!raw) {
      return { timestamps: [] };
    }

    const parsed = JSON.parse(raw) as RateLimitState;
    const timestamps = Array.isArray(parsed.timestamps) ? parsed.timestamps.filter((timestamp) => typeof timestamp === "number") : [];
    const recentWindow = now - CONTACT_RATE_LIMIT_RETENTION_MS;
    return {
      timestamps: timestamps.filter((timestamp) => timestamp >= recentWindow),
      blockedUntil: typeof parsed.blockedUntil === "number" ? parsed.blockedUntil : undefined
    };
  } catch {
    return { timestamps: [] };
  }
}

export function saveRateLimitState(state: RateLimitState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CONTACT_RATE_LIMIT_STORAGE_KEY, JSON.stringify(state));
}

export function getNextMidnightTimestamp(now: number = Date.now()) {
  const nextMidnight = new Date(now);
  nextMidnight.setDate(nextMidnight.getDate() + 1);
  nextMidnight.setHours(0, 0, 0, 0);
  return nextMidnight.getTime();
}
