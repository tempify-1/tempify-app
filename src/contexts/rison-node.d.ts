declare module 'rison-node' {
  /**
   * Decode a RISON-encoded string into a JavaScript value
   * @param str - The RISON-encoded string to decode
   * @returns The decoded JavaScript value
   */
  export function decode(str: string): any;

  /**
   * Encode a JavaScript value into a RISON string
   * @param obj - The JavaScript value to encode
   * @returns The RISON-encoded string
   */
  export function encode(obj: any): string;

  /**
   * Decode a RISON-encoded object string
   * @param str - The RISON-encoded object string to decode
   * @returns The decoded JavaScript object
   */
  export function decode_object(str: string): any;

  /**
   * Encode a JavaScript object into a RISON object string
   * @param obj - The JavaScript object to encode
   * @returns The RISON-encoded object string
   */
  export function encode_object(obj: any): string;

  /**
   * Decode a RISON-encoded array string
   * @param str - The RISON-encoded array string to decode
   * @returns The decoded JavaScript array
   */
  export function decode_array(str: string): any[];

  /**
   * Encode a JavaScript array into a RISON array string
   * @param arr - The JavaScript array to encode
   * @returns The RISON-encoded array string
   */
  export function encode_array(arr: any[]): string;

  /**
   * Decode a RISON-encoded URI component
   * @param str - The RISON-encoded URI component to decode
   * @returns The decoded JavaScript value
   */
  export function decode_uri(str: string): any;

  /**
   * Encode a JavaScript value into a RISON URI component
   * @param obj - The JavaScript value to encode
   * @returns The RISON-encoded URI component
   */
  export function encode_uri(obj: any): string;

  /**
   * Quote a string for use in RISON
   * @param str - The string to quote
   * @returns The quoted string
   */
  export function quote(str: string): string;

  /**
   * Unquote a RISON-quoted string
   * @param str - The quoted string to unquote
   * @returns The unquoted string
   */
  export function unquote(str: string): string;

  // Default export for CommonJS compatibility
  const rison: {
    decode: typeof decode;
    encode: typeof encode;
    decode_object: typeof decode_object;
    encode_object: typeof encode_object;
    decode_array: typeof decode_array;
    encode_array: typeof encode_array;
    decode_uri: typeof decode_uri;
    encode_uri: typeof encode_uri;
    quote: typeof quote;
    unquote: typeof unquote;
  };

  export default rison;
}
