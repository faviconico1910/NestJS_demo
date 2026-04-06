import {createKeyv} from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';


@Module({
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            useFactory: async () => {
                return {
                    // Trả về một object chứa mảng stores
                    stores: [
                        createKeyv('redis://localhost:6379')
                    ],
                    ttl: 600000, // 10 phút
                };
            }
        })
    

    ]
})


export class RedisCacheModule {}