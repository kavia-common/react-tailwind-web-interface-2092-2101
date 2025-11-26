/**
 * PUBLIC_INTERFACE
 * Safe environment accessors for CRA (Create React App) builds.
 * Only REACT_APP_* variables are exposed to the client. This module
 * provides typed getters with sensible fallbacks and feature flag helpers.
 *
 * Usage:
 *   import { env, featureFlags, EnvBadge } from '../utils/env';
 *   const base = env.API_BASE(); // string
 *   if (featureFlags.has('showEnvBadge')) { ... }
 */

// Internal helpers

/**
 * Coerce a string to boolean. Accepts: "1","true","yes","on" => true
 * "0","false","no","off" => false. Case-insensitive. Other values => defaultVal.
 */
function toBool(value, defaultVal = false) {
  if (typeof value !== 'string') return defaultVal;
  const v = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(v)) return true;
  if (['0', 'false', 'no', 'off'].includes(v)) return false;
  return defaultVal;
}

/**
 * Try to parse JSON safely. Returns defaultVal on failure.
 */
function toJSON(value, defaultVal = null) {
  if (typeof value !== 'string' || value.trim() === '') return defaultVal;
  try {
    return JSON.parse(value);
  } catch {
    return defaultVal;
  }
}

/**
 * Parse comma-separated list into a Set of lowercased tokens.
 * If a JSON array string is provided, it will also be parsed.
 */
function toFlags(value) {
  if (Array.isArray(value)) {
    return new Set(value.map((v) => String(v).trim().toLowerCase()).filter(Boolean));
  }
  if (typeof value === 'string') {
    // Allow JSON array or comma-separated
    const asJson = toJSON(value, undefined);
    if (Array.isArray(asJson)) {
      return new Set(asJson.map((v) => String(v).trim().toLowerCase()).filter(Boolean));
    }
    return new Set(
      value
        .split(',')
        .map((v) => v.trim().toLowerCase())
        .filter(Boolean)
    );
  }
  return new Set();
}

/**
 * Select the first non-empty string from the provided candidates.
 */
function coalesce(...vals) {
  for (const v of vals) {
    if (typeof v === 'string' && v.trim() !== '') return v;
  }
  return '';
}

/**
 * Try to infer a WebSocket URL from a base HTTP(S) URL.
 */
function inferWsUrl(fromUrl) {
  try {
    if (!fromUrl) return '';
    const u = new URL(fromUrl, window.location.origin);
    u.protocol = u.protocol === 'https:' ? 'wss:' : 'ws:';
    return u.toString();
  } catch {
    return '';
  }
}

/**
 * Try to infer an API base by appending /api to BACKEND_URL or FRONTEND_URL.
 */
function inferApiBase(backendUrl, frontendUrl) {
  const base = coalesce(backendUrl, frontendUrl, window.location.origin);
  try {
    const url = new URL(base);
    url.pathname = (url.pathname.replace(/\/+$/, '') || '') + '/api';
    return url.toString();
  } catch {
    return '/api';
  }
}

/**
 * PUBLIC_INTERFACE
 * Returns safe getters for environment variables with fallbacks.
 */
export const env = {
  // PUBLIC_INTERFACE
  API_BASE() {
    const val = process.env.REACT_APP_API_BASE;
    const backend = process.env.REACT_APP_BACKEND_URL;
    const frontend = process.env.REACT_APP_FRONTEND_URL;
    return coalesce(val, inferApiBase(backend, frontend), '/api');
  },

  // PUBLIC_INTERFACE
  BACKEND_URL() {
    return coalesce(process.env.REACT_APP_BACKEND_URL, '');
  },

  // PUBLIC_INTERFACE
  FRONTEND_URL() {
    return coalesce(process.env.REACT_APP_FRONTEND_URL, window.location.origin);
  },

  // PUBLIC_INTERFACE
  WS_URL() {
    const explicit = process.env.REACT_APP_WS_URL;
    const inferred = inferWsUrl(this.BACKEND_URL() || this.FRONTEND_URL());
    return coalesce(explicit, inferred, '');
  },

  // PUBLIC_INTERFACE
  NODE_ENV() {
    return coalesce(process.env.REACT_APP_NODE_ENV, process.env.NODE_ENV, 'development');
  },

  // PUBLIC_INTERFACE
  LOG_LEVEL() {
    return coalesce(process.env.REACT_APP_LOG_LEVEL, 'info');
  },

  // PUBLIC_INTERFACE
  HEALTHCHECK_PATH() {
    return coalesce(process.env.REACT_APP_HEALTHCHECK_PATH, '/health');
  },

  // PUBLIC_INTERFACE
  ENABLE_SOURCE_MAPS() {
    return toBool(process.env.REACT_APP_ENABLE_SOURCE_MAPS, this.NODE_ENV() !== 'production');
  },

  // PUBLIC_INTERFACE
  PORT() {
    const p = parseInt(process.env.REACT_APP_PORT, 10);
    return Number.isFinite(p) ? p : 3000;
  },

  // PUBLIC_INTERFACE
  TRUST_PROXY() {
    return toBool(process.env.REACT_APP_TRUST_PROXY, false);
  },

  // PUBLIC_INTERFACE
  FEATURE_FLAGS_RAW() {
    return process.env.REACT_APP_FEATURE_FLAGS || '';
  },

  // PUBLIC_INTERFACE
  FEATURE_FLAGS() {
    return toFlags(this.FEATURE_FLAGS_RAW());
  },

  // PUBLIC_INTERFACE
  EXPERIMENTS_ENABLED() {
    // Either a boolean-like env or a 'experiments' flag in FEATURE_FLAGS
    const direct = toBool(process.env.REACT_APP_EXPERIMENTS_ENABLED, false);
    if (direct) return true;
    const flags = this.FEATURE_FLAGS();
    return flags.has('experiments') || flags.has('exp') || flags.has('beta');
  }
};

/**
 * PUBLIC_INTERFACE
 * Utilities to query feature flags in a convenient way.
 */
export const featureFlags = {
  // PUBLIC_INTERFACE
  has(flag) {
    return env.FEATURE_FLAGS().has(String(flag).trim().toLowerCase());
  },
  // PUBLIC_INTERFACE
  list() {
    return Array.from(env.FEATURE_FLAGS().values());
  }
};

/**
 * PUBLIC_INTERFACE
 * Optional tiny badge component to visualize the current environment.
 * This is rendered if 'showenvbadge' or 'showEnvBadge' appears in REACT_APP_FEATURE_FLAGS.
 */
export function EnvBadge() {
  const show =
    featureFlags.has('showenvbadge') || featureFlags.has('showenv') || featureFlags.has('showenvbadge:true');

  if (!show) return null;

  const label = env.NODE_ENV();
  const level = env.LOG_LEVEL();
  const title = `Environment: ${label} • Log: ${level}`;

  return (
    <div
      aria-label={title}
      title={title}
      className="fixed bottom-3 right-3 z-[60] select-none rounded-md bg-neutral-900/80 px-2 py-1 text-xs font-semibold text-white shadow-soft backdrop-blur-sm ring-1 ring-white/10"
    >
      {label}
    </div>
  );
}

export default env;
