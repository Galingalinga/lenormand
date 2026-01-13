import { toPng } from 'html-to-image';

/**
 * 複製文字到剪貼簿
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('複製失敗:', error);
        return false;
    }
}

/**
 * 將指定元素轉換為 PNG 圖片並下載
 */
export async function downloadAsImage(elementId: string, filename: string = 'lenormand-reading.png'): Promise<boolean> {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('找不到指定的元素');
            return false;
        }

        const dataUrl = await toPng(element, {
            quality: 0.95,
            pixelRatio: 2, // 提高解析度
        });

        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();

        return true;
    } catch (error) {
        console.error('下載圖片失敗:', error);
        return false;
    }
}
