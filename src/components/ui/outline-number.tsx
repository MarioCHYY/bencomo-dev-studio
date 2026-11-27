/**
 * The big outlined service number. A plain text stroke draws every contour of the font,
 * so the joints inside the digits show (the cross inside the 4, the seam in the 3 and the 6)
 * and digits that touch cross each other. This draws the outline of the filled number instead:
 * the shape grown by one pixel, minus the shape itself, so only the outer edge is left.
 */
export function OutlineNumber({ value, className = "", alpha = 0.09 }: { value: string; className?: string; alpha?: number }) {
  return (
    <>
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
        <filter id="outline-number" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
          <feMorphology in="SourceGraphic" operator="dilate" radius="1" result="grown" />
          <feComposite in="grown" in2="SourceGraphic" operator="out" />
        </filter>
      </svg>
      <span aria-hidden="true" className={`select-none tabular-nums text-white ${className}`} style={{ filter: "url(#outline-number)", opacity: alpha }}>
        {value}
      </span>
    </>
  );
}
