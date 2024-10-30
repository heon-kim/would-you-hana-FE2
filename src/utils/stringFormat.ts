export const relativeTime = (date: number): string => {
  const start = new Date(date);
  const seconds = Math.floor((Date.now() - start.getTime()) / 1000);

  if (seconds < 60) return '방금 전';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}일 전`;

  return start.toLocaleDateString();
};
