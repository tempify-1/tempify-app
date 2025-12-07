/**
 * Lightweight HTML sanitizer for safe dangerouslySetInnerHTML usage.
 * Strips dangerous elements and attributes to prevent XSS attacks.
 */

// Allowed HTML tags (whitelist approach)
const ALLOWED_TAGS = new Set([
  'b', 'i', 'u', 'em', 'strong', 'span', 'br', 'sub', 'sup',
  'mark', 'small', 'del', 'ins', 's', 'abbr', 'code', 'kbd',
]);

// Dangerous patterns to remove
const SCRIPT_TAG_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const STYLE_TAG_REGEX = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi;
const EVENT_HANDLER_REGEX = /\s*on\w+\s*=\s*["'][^"']*["']/gi;
const JAVASCRIPT_PROTOCOL_REGEX = /javascript\s*:/gi;
const DATA_PROTOCOL_REGEX = /data\s*:/gi;
const VBSCRIPT_PROTOCOL_REGEX = /vbscript\s*:/gi;

// HTML tag regex for parsing
const HTML_TAG_REGEX = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;

/**
 * Sanitizes HTML content by removing dangerous elements and attributes.
 * Only allows a whitelist of safe inline formatting tags.
 *
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string safe for dangerouslySetInnerHTML
 */
export const sanitizeHtml = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  let sanitized = html;

  // Remove script and style tags entirely
  sanitized = sanitized.replace(SCRIPT_TAG_REGEX, '');
  sanitized = sanitized.replace(STYLE_TAG_REGEX, '');

  // Remove event handlers (onclick, onerror, onload, etc.)
  sanitized = sanitized.replace(EVENT_HANDLER_REGEX, '');

  // Remove dangerous protocols
  sanitized = sanitized.replace(JAVASCRIPT_PROTOCOL_REGEX, '');
  sanitized = sanitized.replace(DATA_PROTOCOL_REGEX, '');
  sanitized = sanitized.replace(VBSCRIPT_PROTOCOL_REGEX, '');

  // Filter to only allowed tags, preserving their content
  sanitized = sanitized.replace(HTML_TAG_REGEX, (match, tagName) => {
    const lowerTagName = tagName.toLowerCase();
    if (ALLOWED_TAGS.has(lowerTagName)) {
      // For allowed tags, strip all attributes except class
      const isClosing = match.startsWith('</');
      if (isClosing) {
        return `</${lowerTagName}>`;
      }
      // Self-closing br
      if (lowerTagName === 'br') {
        return '<br />';
      }
      return `<${lowerTagName}>`;
    }
    // Remove disallowed tags but keep content
    return '';
  });

  return sanitized;
};

/**
 * Escapes HTML entities for safe text display.
 * Use this when you don't want any HTML rendered.
 *
 * @param text - The text to escape
 * @returns Escaped text safe for display
 */
export const escapeHtml = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

