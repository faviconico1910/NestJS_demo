import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';

// Load .env file
dotenv.config({path: path.resolve(__dirname, '../../.env')});


if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Không tìm thấy file .env');
  process.exit(1);
}

const configSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    // coerce để tự động chuyển đổi string sang number
    PORT: z.coerce.number().default(3000),
    DB_HOST: z.string(),
    DB_PORT: z.string(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_DATABASE: z.string(),
});

// validate
const validatedConfig = configSchema.safeParse(process.env);

if (!validatedConfig.success) {
    console.error('Lỗi cấu hình môi trường:', validatedConfig.error.format());
    process.exit(1);
}

export const envConfig = validatedConfig.data;