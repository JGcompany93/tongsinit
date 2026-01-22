import type { TelcoKey } from "../types";

type Props = {
  telco: TelcoKey;
  className?: string;
};

export default function TelcoLogo({ telco, className }: Props) {
  switch (telco) {
    case "KT":
      return (
        <svg viewBox="0 0 64 24" className={className} aria-label="KT">
          <text x="0" y="18" fontSize="18" fontWeight="700" fill="#000">
            KT
          </text>
        </svg>
      );

    case "SK":
      return (
        <svg viewBox="0 0 64 24" className={className} aria-label="SK">
          <text x="0" y="18" fontSize="18" fontWeight="700" fill="#000">
            SK
          </text>
        </svg>
      );

    case "LGU+":
      return (
        <svg viewBox="0 0 64 24" className={className} aria-label="LG U+">
          <text x="0" y="18" fontSize="18" fontWeight="700" fill="#000">
            LG U+
          </text>
        </svg>
      );

    case "SKYLIFE":
      return (
        <svg viewBox="0 0 96 24" className={className} aria-label="Skylife">
          <text x="0" y="18" fontSize="18" fontWeight="700" fill="#000">
            skylife
          </text>
        </svg>
      );

    case "HELLO":
      return (
        <svg viewBox="0 0 96 24" className={className} aria-label="HelloVision">
          <text x="0" y="18" fontSize="18" fontWeight="700" fill="#000">
            Hello
          </text>
        </svg>
      );

    default:
      return null;
  }
}
