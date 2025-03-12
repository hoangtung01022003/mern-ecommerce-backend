import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.UPSTASH_REDIS_URL) {
  throw new Error("UPSTASH_REDIS_URL không được định nghĩa trong biến môi trường");
}

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

redis.on('connect', () => {
  console.log('Đã kết nối Redis thành công');
});

redis.on('error', (err) => {
  console.error('Lỗi kết nối Redis:', err);
});

redis.on('ready', () => {
  console.log('Redis đã sẵn sàng để sử dụng');
});