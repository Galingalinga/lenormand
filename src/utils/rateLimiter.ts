// 防濫用工具函數
class RateLimiter {
    private attempts: Map<string, number[]> = new Map();
    private readonly maxAttempts: number;
    private readonly timeWindowMs: number;

    constructor(maxAttempts: number = 3, timeWindowMinutes: number = 10) {
        this.maxAttempts = maxAttempts;
        this.timeWindowMs = timeWindowMinutes * 60 * 1000;
    }

    canProceed(identifier: string): boolean {
        const now = Date.now();
        const attempts = this.attempts.get(identifier) || [];

        // 清除過期的嘗試記錄
        const validAttempts = attempts.filter(time => now - time < this.timeWindowMs);

        if (validAttempts.length >= this.maxAttempts) {
            this.attempts.set(identifier, validAttempts);
            return false;
        }

        // 記錄新的嘗試
        validAttempts.push(now);
        this.attempts.set(identifier, validAttempts);
        return true;
    }

    getRemainingTime(identifier: string): number {
        const attempts = this.attempts.get(identifier) || [];
        if (attempts.length === 0) return 0;

        const oldestAttempt = Math.min(...attempts);
        const timeElapsed = Date.now() - oldestAttempt;
        const remainingMs = this.timeWindowMs - timeElapsed;

        return Math.max(0, Math.ceil(remainingMs / 60000)); // 回傳剩餘分鐘數
    }

    reset(identifier: string): void {
        this.attempts.delete(identifier);
    }
}

// 生成裝置指紋（比單純的隨機 ID 更可靠）
export const getDeviceFingerprint = (): string => {
    const stored = localStorage.getItem('lenormand_device_fp');
    if (stored) return stored;

    const fingerprint = [
        navigator.userAgent,
        navigator.language,
        new Date().getTimezoneOffset(),
        screen.width,
        screen.height,
        screen.colorDepth,
    ].join('|');

    // 簡單的雜湊函數
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    const deviceId = 'fp_' + Math.abs(hash).toString(36) + '_' + Date.now().toString(36);
    localStorage.setItem('lenormand_device_fp', deviceId);
    return deviceId;
};

// 全域速率限制器
export const rateLimiter = new RateLimiter(3, 10); // 10分鐘內最多3次

export { RateLimiter };
