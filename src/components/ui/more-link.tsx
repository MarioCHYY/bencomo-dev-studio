import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

/** Apple-style text link: a few words and a small chevron, underlined on hover */
export function MoreLink({ to, children, className = "" }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-0.5 text-[15px] md:text-[17px] font-medium text-white hover:underline decoration-[#B7A8FF] decoration-2 underline-offset-[6px] ${className}`}>
      {children}
      <ChevronRight size={17} className="text-[#B7A8FF] transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
