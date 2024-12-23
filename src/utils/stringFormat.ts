export const relativeTime = (date: number): string => {
  const start = new Date(date);
  const seconds = Math.floor((Date.now() - start.getTime()) / 1000);

  if (seconds < 60) return '방금 전';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}일 전`;

  const year = start.getFullYear().toString().slice(-2); // 년도 마지막 두 자리를 가져옴
  const month = (start.getMonth() + 1).toString().padStart(2, '0');
  const day = start.getDate().toString().padStart(2, '0');

  return `${year}.${month}.${day}`;

  // return start.toLocaleDateString();
};
