// minimal types for the parts the site uses
export interface QRCode {
  addData(data: string, mode?: "Byte"): void;
  make(): void;
  getModuleCount(): number;
  isDark(row: number, col: number): boolean;
}
interface QRCodeFactory {
  (typeNumber: number, errorCorrectionLevel: "L" | "M" | "Q" | "H"): QRCode;
  stringToBytes: (s: string) => number[];
  stringToBytesFuncs: Record<string, (s: string) => number[]>;
}
declare const qrcode: QRCodeFactory;
export default qrcode;
