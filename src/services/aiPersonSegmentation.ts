import { SelfieSegmentation, Results } from '@mediapipe/selfie_segmentation';

let segmenterInstance: SelfieSegmentation | null = null;

export function getSelfieSegmentationInstance(): SelfieSegmentation {
  if (!segmenterInstance) {
    segmenterInstance = new SelfieSegmentation({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
    });
    segmenterInstance.setOptions({
      modelSelection: 1, // 1 = Toàn thân / Cảnh rộng (Landscape/Full-body) tách cả người chạy, đứng, cúi đầu
      selfieMode: false
    });
  }
  return segmenterInstance;
}

/**
 * Bóc tách người từ thẻ Image hoặc Video bằng AI Deep Learning của MediaPipe
 * Kết quả: Chỉ giữ lại MỖI CON NGƯỜI, xóa sạch sành sanh bãi biển, tảng đá, bầu trời, hoàng hôn
 */
export async function segmentPersonFromMedia(
  sourceElement: HTMLImageElement | HTMLVideoElement,
  width: number,
  height: number
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const segmenter = getSelfieSegmentationInstance();

      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = width;
      outputCanvas.height = height;
      const ctx = outputCanvas.getContext('2d');

      if (!ctx) {
        throw new Error('Cannot get 2d context');
      }

      segmenter.onResults((results: Results) => {
        ctx.save();
        ctx.clearRect(0, 0, width, height);

        // 1. Vẽ mặt nạ phân tách người do AI nhận diện (results.segmentationMask)
        ctx.drawImage(results.segmentationMask, 0, 0, width, height);

        // 2. Dùng chế độ 'source-in' để chỉ giữ lại các điểm ảnh thuộc về cơ thể người
        ctx.globalCompositeOperation = 'source-in';
        ctx.drawImage(results.image, 0, 0, width, height);

        ctx.restore();

        const transparentPng = outputCanvas.toDataURL('image/png');
        resolve(transparentPng);
      });

      await segmenter.send({ image: sourceElement });
    } catch (err) {
      console.warn('AI Segmentation error:', err);
      reject(err);
    }
  });
}
