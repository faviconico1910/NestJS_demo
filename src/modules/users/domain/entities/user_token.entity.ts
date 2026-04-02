import { BaseEntity } from "src/core/base-domain/base.entity";

export class UserToken extends BaseEntity<number> {
    userid: number;
    refreshTokenHash: string;
    deviceInfo: string;
    isRevoked: boolean;
    expireAt: Date;

    constructor(
        id: number,
        userid: number,
        refreshTokenHash: string,
        deviceInfo: string,
        isRevoked: boolean,
        expireAt: Date,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        super(id, createdAt, updatedAt);
        this.userid = userid;
        this.refreshTokenHash = refreshTokenHash;
        this.deviceInfo = deviceInfo;
        this.isRevoked = isRevoked;
        this.expireAt = expireAt;
    }

    public isExpired(): boolean {
        return !this.isRevoked && this.expireAt.getTime() < new Date().getTime();
    }

    public revoke(): void {
        this.isRevoked = true;
    }


}