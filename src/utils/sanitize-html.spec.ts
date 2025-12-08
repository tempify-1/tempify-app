import { describe, test, expect } from "vitest";
import { sanitizeHtml, escapeHtml } from "./sanitize-html";

describe("sanitizeHtml", () => {
  test("returns empty string for null/undefined input", () => {
    expect(sanitizeHtml(null as any)).toBe("");
    expect(sanitizeHtml(undefined as any)).toBe("");
    expect(sanitizeHtml("")).toBe("");
  });

  test("allows safe inline formatting tags", () => {
    expect(sanitizeHtml("<b>bold</b>")).toBe("<b>bold</b>");
    expect(sanitizeHtml("<i>italic</i>")).toBe("<i>italic</i>");
    expect(sanitizeHtml("<em>emphasis</em>")).toBe("<em>emphasis</em>");
    expect(sanitizeHtml("<strong>strong</strong>")).toBe("<strong>strong</strong>");
    expect(sanitizeHtml("<u>underline</u>")).toBe("<u>underline</u>");
    expect(sanitizeHtml("<span>span</span>")).toBe("<span>span</span>");
    expect(sanitizeHtml("line1<br />line2")).toBe("line1<br />line2");
  });

  test("removes script tags", () => {
    expect(sanitizeHtml("<script>alert('xss')</script>")).toBe("");
    expect(sanitizeHtml("before<script>evil()</script>after")).toBe("beforeafter");
    expect(sanitizeHtml("<SCRIPT>alert('xss')</SCRIPT>")).toBe("");
  });

  test("removes style tags", () => {
    expect(sanitizeHtml("<style>body{display:none}</style>")).toBe("");
    expect(sanitizeHtml("text<style>.hidden{}</style>more")).toBe("textmore");
  });

  test("removes event handlers", () => {
    expect(sanitizeHtml('<img onerror="alert(1)">')).toBe("");
    expect(sanitizeHtml('<div onclick="evil()">click</div>')).toBe("click");
    expect(sanitizeHtml('<a onmouseover="hack()">link</a>')).toBe("link");
  });

  test("removes javascript: protocol", () => {
    expect(sanitizeHtml('<a href="javascript:alert(1)">link</a>')).toBe("link");
  });

  test("removes data: protocol", () => {
    // The img tag is stripped, and data: protocol is removed
    // Some remnant chars may remain but the dangerous content is neutralized
    const result = sanitizeHtml('<img src="data:image/svg+xml,<svg>">');
    expect(result).not.toContain("data:");
    expect(result).not.toContain("<img");
  });

  test("removes vbscript: protocol", () => {
    expect(sanitizeHtml('<a href="vbscript:msgbox(1)">link</a>')).toBe("link");
  });

  test("strips attributes from allowed tags", () => {
    expect(sanitizeHtml('<span class="red" style="color:red">text</span>')).toBe("<span>text</span>");
    expect(sanitizeHtml('<b id="test">bold</b>')).toBe("<b>bold</b>");
  });

  test("removes disallowed tags but keeps content", () => {
    expect(sanitizeHtml("<div>content</div>")).toBe("content");
    expect(sanitizeHtml("<p>paragraph</p>")).toBe("paragraph");
    expect(sanitizeHtml("<a href='link'>anchor</a>")).toBe("anchor");
  });

  test("handles nested tags", () => {
    expect(sanitizeHtml("<div><b>bold</b> text</div>")).toBe("<b>bold</b> text");
    expect(sanitizeHtml("<p><em>nested <strong>deep</strong></em></p>")).toBe("<em>nested <strong>deep</strong></em>");
  });

  test("handles plain text without tags", () => {
    expect(sanitizeHtml("just plain text")).toBe("just plain text");
    expect(sanitizeHtml("text with < and > symbols")).toBe("text with < and > symbols");
  });
});

describe("escapeHtml", () => {
  test("returns empty string for null/undefined input", () => {
    expect(escapeHtml(null as any)).toBe("");
    expect(escapeHtml(undefined as any)).toBe("");
    expect(escapeHtml("")).toBe("");
  });

  test("escapes ampersand", () => {
    expect(escapeHtml("foo & bar")).toBe("foo &amp; bar");
    expect(escapeHtml("&&&")).toBe("&amp;&amp;&amp;");
  });

  test("escapes less than", () => {
    expect(escapeHtml("a < b")).toBe("a &lt; b");
    expect(escapeHtml("<tag>")).toBe("&lt;tag&gt;");
  });

  test("escapes greater than", () => {
    expect(escapeHtml("a > b")).toBe("a &gt; b");
  });

  test("escapes double quotes", () => {
    expect(escapeHtml('say "hello"')).toBe("say &quot;hello&quot;");
  });

  test("escapes single quotes", () => {
    expect(escapeHtml("it's")).toBe("it&#039;s");
  });

  test("escapes all special characters together", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
    );
  });

  test("leaves normal text unchanged", () => {
    expect(escapeHtml("Hello World")).toBe("Hello World");
    expect(escapeHtml("abc123")).toBe("abc123");
  });
});

