// luminousheaven/src/lib/rate-limit.js
const rateLimitMap = new Map();

export function rateLimit({ ip, windowMs = 60000, maxRequests = 10 }) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
  } else {
    record.count += 1;
  }

  rateLimitMap.set(ip, record);

  return {
    isLimited: record.count > maxRequests,
    remaining: Math.max(0, maxRequests - record.count),
    resetTime: record.resetTime,
  };
}
