import { component$ } from "@builder.io/qwik";
import type { JSXOutput } from "@builder.io/qwik";

// Payload Rich Text Types
interface SerializedTextNode {
  type: "text";
  text: string;
  format: number;
  detail: number;
  mode: "normal" | "token" | "segmented";
  style: string;
  version: number;
}

interface SerializedLinkNode {
  type: "link";
  children: SerializedNode[];
  direction: "ltr" | "rtl" | null;
  format: string;
  indent: number;
  fields: {
    linkType: "custom" | "internal";
    url?: string;
    newTab?: boolean;
    doc?: any;
  };
  version: number;
}

interface SerializedHeadingNode {
  type: "heading";
  children: SerializedNode[];
  direction: "ltr" | "rtl" | null;
  format: string;
  indent: number;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  version: number;
}

interface SerializedParagraphNode {
  type: "paragraph";
  children: SerializedNode[];
  direction: "ltr" | "rtl" | null;
  format: string;
  indent: number;
  textFormat?: number;
  version: number;
}

interface SerializedListNode {
  type: "list";
  children: SerializedNode[];
  direction: "ltr" | "rtl" | null;
  format: string;
  indent: number;
  listType: "bullet" | "number" | "check";
  start?: number;
  tag: "ul" | "ol";
  version: number;
}

interface SerializedListItemNode {
  type: "listitem";
  children: SerializedNode[];
  direction: "ltr" | "rtl" | null;
  format: string;
  indent: number;
  value?: number;
  checked?: boolean;
  version: number;
}

interface SerializedQuoteNode {
  type: "quote";
  children: SerializedNode[];
  direction: "ltr" | "rtl" | null;
  format: string;
  indent: number;
  version: number;
}

interface SerializedRootNode {
  type: "root";
  children: SerializedNode[];
  direction: "ltr" | "rtl" | null;
  format: string;
  indent: number;
  version: number;
}

interface SerializedTableNode {
  type: "table";
  children: SerializedTableRowNode[];
  version: number;
}

interface SerializedTableRowNode {
  type: "tablerow";
  children: SerializedTableCellNode[];
  version: number;
}

interface SerializedTableCellNode {
  type: "tablecell";
  children: SerializedNode[];
  headerState?: number;
  width?: number;
  version: number;
}

type SerializedNode =
  | SerializedTextNode
  | SerializedLinkNode
  | SerializedHeadingNode
  | SerializedParagraphNode
  | SerializedListNode
  | SerializedListItemNode
  | SerializedQuoteNode
  | SerializedRootNode
  | SerializedTableNode
  | SerializedTableRowNode
  | SerializedTableCellNode;

export interface PayloadRichText {
  root: SerializedRootNode;
}

import { getAosProps, type AnimationProps } from "../animation-types";

export interface AppBlockRichTextData extends AnimationProps {
  blockId?: string;
  richText?: PayloadRichText;
  class?: string;
}

export interface AppBlockRichTextProps extends AppBlockRichTextData {
  columnNumber: number;
  blockNumber: number;
}

// Lexical text format bitmask values
const TEXT_FORMAT = {
  BOLD: 1,
  ITALIC: 2,
  STRIKETHROUGH: 4,
  UNDERLINE: 8,
  CODE: 16,
  SUBSCRIPT: 32,
  SUPERSCRIPT: 64,
} as const;

// Apply text formatting based on bitmask
const applyTextFormat = (text: string, format: number, key: number): JSXOutput => {
  let result: JSXOutput = text;

  // Apply formats from innermost to outermost
  if (format & TEXT_FORMAT.CODE) {
    result = <code key={`${key}-code`} class="bg-gray-100 dark:bg-gray-800 px-1 rounded font-mono text-sm">{result}</code>;
  }
  if (format & TEXT_FORMAT.SUBSCRIPT) {
    result = <sub key={`${key}-sub`}>{result}</sub>;
  }
  if (format & TEXT_FORMAT.SUPERSCRIPT) {
    result = <sup key={`${key}-sup`}>{result}</sup>;
  }
  if (format & TEXT_FORMAT.STRIKETHROUGH) {
    result = <s key={`${key}-s`}>{result}</s>;
  }
  if (format & TEXT_FORMAT.UNDERLINE) {
    result = <u key={`${key}-u`}>{result}</u>;
  }
  if (format & TEXT_FORMAT.ITALIC) {
    result = <em key={`${key}-em`}>{result}</em>;
  }
  if (format & TEXT_FORMAT.BOLD) {
    result = <strong key={`${key}-strong`}>{result}</strong>;
  }

  return result;
};

// Renderer function
const renderNode = (node: SerializedNode, index: number): JSXOutput => {
  switch (node.type) {
    case "text": {
      // If no formatting, return plain span
      if (!node.format || node.format === 0) {
        return <span key={index}>{node.text}</span>;
      }
      // Apply text formatting based on bitmask
      return <span key={index}>{applyTextFormat(node.text, node.format, index)}</span>;
    }

    case "link": {
      const href = node.fields.url || "#";
      const target = node.fields.newTab ? "_blank" : undefined;
      const rel = node.fields.newTab ? "noopener noreferrer" : undefined;
      return (
        <a key={index} href={href} target={target} rel={rel}>
          {node.children.map((child, i) => renderNode(child, i))}
        </a>
      );
    }

    case "heading": {
      const Tag = node.tag;
      return (
        <Tag key={index}>
          {node.children.map((child, i) => renderNode(child, i))}
        </Tag>
      );
    }

    case "paragraph":
      return (
        <p key={index}>
          {node.children.map((child, i) => renderNode(child, i))}
        </p>
      );

    case "list": {
      const ListTag = node.tag;
      return (
        <ListTag key={index}>
          {node.children.map((child, i) => renderNode(child, i))}
        </ListTag>
      );
    }

    case "listitem":
      return (
        <li key={index}>
          {node.children.map((child, i) => renderNode(child, i))}
        </li>
      );

    case "quote":
      return (
        <blockquote key={index}>
          {node.children.map((child, i) => renderNode(child, i))}
        </blockquote>
      );

    case "root":
      return (
        <div key={index}>
          {node.children.map((child, i) => renderNode(child, i))}
        </div>
      );

    case "table":
      return (
        <table key={index} class="min-w-full border-collapse border border-gray-300">
          <tbody>
            {node.children.map((child, i) => renderNode(child, i))}
          </tbody>
        </table>
      );

    case "tablerow":
      return (
        <tr key={index}>
          {node.children.map((child, i) => renderNode(child, i))}
        </tr>
      );

    case "tablecell": {
      const isHeader = node.headerState === 1 || node.headerState === 3;
      const CellTag = isHeader ? "th" : "td";
      const cellClass = isHeader
        ? "border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left"
        : "border border-gray-300 px-4 py-2";

      return (
        <CellTag key={index} class={cellClass}>
          {node.children.map((child, i) => renderNode(child, i))}
        </CellTag>
      );
    }

    default:
      return null;
  }
};

export const AppBlockRichText = component$<AppBlockRichTextProps>((props) => {
  const { blockId, richText, class: className, animation, animationPlacement, animationEasing, columnNumber, blockNumber } = props;

  if (!richText?.root) {
    return null;
  }

  const aosProps = getAosProps({ animation, animationPlacement, animationEasing, columnNumber, blockNumber });

  return (
    <div id={blockId} class={className} {...aosProps}>
      {richText.root.children.map((child, i) => renderNode(child, i))}
    </div>
  );
});

