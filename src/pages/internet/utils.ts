export function formatWon(n: number) {
  return `${n.toLocaleString("ko-KR")}원`;
}

export function formatSpeed(speedMbps: number) {
  return speedMbps >= 1000 ? "1 Gbps" : `${speedMbps} Mbps`;
}
