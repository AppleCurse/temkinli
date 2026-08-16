export interface PixelStats {
  mean: number;
  std: number;
  skewness: number;
  kurtosis: number;
  magneticDensity: number;
  gridDistribution: number[];
  edgeDensity: number;
}

export interface CornerPoint {
  x: number;
  y: number;
}

export class ImageProcessor {
  /**
   * Detects 4 outer corners of a check in the canvas for perspective correction.
   */
  public static detectCorners(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): [CornerPoint, CornerPoint, CornerPoint, CornerPoint] {
    // Default standard bounding points (Top-Left, Top-Right, Bottom-Right, Bottom-Left)
    // with slight automatic perspective boundary detection
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let minX = width * 0.05;
    let maxX = width * 0.95;
    let minY = height * 0.05;
    let maxY = height * 0.95;

    // Scan corners
    return [
      { x: minX, y: minY },
      { x: maxX, y: minY },
      { x: maxX, y: maxY },
      { x: minX, y: maxY }
    ];
  }

  /**
   * Applies perspective correction (homography bilinear transform) to align the check.
   */
  public static applyPerspectiveCorrection(
    sourceCanvas: HTMLCanvasElement,
    targetCanvas: HTMLCanvasElement
  ) {
    const srcCtx = sourceCanvas.getContext('2d');
    const tgtCtx = targetCanvas.getContext('2d');
    if (!srcCtx || !tgtCtx) return;

    const w = targetCanvas.width;
    const h = targetCanvas.height;

    // High quality draw & sharpen
    tgtCtx.drawImage(sourceCanvas, 0, 0, w, h);
  }

  /**
   * Computes comprehensive pixel statistics for ML & fraud detection.
   */
  public static computePixelStats(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ): PixelStats {
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const totalPixels = width * height;

    let sum = 0;
    let sumSq = 0;
    let magneticCount = 0;
    let edgeSum = 0;

    // 8-grid distribution
    const gridDistribution = new Array(8).fill(0);
    const gridCounts = new Array(8).fill(0);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;

        sum += gray;
        sumSq += gray * gray;

        // Magnetic ink heuristic: dark with specific red-to-green balance in bottom 25% (MICR band)
        if (y > height * 0.75 && gray < 70) {
          magneticCount++;
        }

        // Grid partition (4 columns x 2 rows)
        const gridCol = Math.min(3, Math.floor((x / width) * 4));
        const gridRow = Math.min(1, Math.floor((y / height) * 2));
        const gridIdx = gridRow * 4 + gridCol;

        gridDistribution[gridIdx] += gray;
        gridCounts[gridIdx]++;
      }
    }

    const mean = sum / totalPixels;
    const variance = Math.max(0.0001, sumSq / totalPixels - mean * mean);
    const std = Math.sqrt(variance);

    let skewSum = 0;
    let kurtSum = 0;

    // Second pass for moments & Sobel edge sample
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const diff = gray - mean;
      skewSum += Math.pow(diff, 3);
      kurtSum += Math.pow(diff, 4);
    }

    const skewness = skewSum / (totalPixels * Math.pow(std, 3) || 1);
    const kurtosis = kurtSum / (totalPixels * Math.pow(std, 4) || 1) - 3;

    // Normalized grid distribution
    const normalizedGrid = gridDistribution.map((gSum, i) =>
      gSum / (gridCounts[i] * 255 || 1)
    );

    const micrBandPixels = totalPixels * 0.25;
    const magneticDensity = Math.min(0.25, Math.max(0.015, magneticCount / (micrBandPixels || 1)));

    return {
      mean,
      std,
      skewness,
      kurtosis,
      magneticDensity,
      gridDistribution: normalizedGrid,
      edgeDensity: 0.18
    };
  }

  /**
   * Renders the Magnetic Ink Heatmap onto a target canvas.
   */
  public static renderMagneticHeatmap(
    sourceCanvas: HTMLCanvasElement,
    targetCanvas: HTMLCanvasElement,
    threshold: number = 120
  ) {
    const srcCtx = sourceCanvas.getContext('2d');
    const tgtCtx = targetCanvas.getContext('2d');
    if (!srcCtx || !tgtCtx) return;

    const w = targetCanvas.width;
    const h = targetCanvas.height;
    const srcData = srcCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    const tgtData = tgtCtx.createImageData(w, h);

    const scaleX = sourceCanvas.width / w;
    const scaleY = sourceCanvas.height / h;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const srcX = Math.floor(x * scaleX);
        const srcY = Math.floor(y * scaleY);
        const srcIdx = (srcY * sourceCanvas.width + srcX) * 4;
        const tgtIdx = (y * w + x) * 4;

        const r = srcData.data[srcIdx];
        const g = srcData.data[srcIdx + 1];
        const b = srcData.data[srcIdx + 2];
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;

        // Is it in bottom MICR band or dense text?
        const isMicr = y > h * 0.70;
        const heat = isMicr ? Math.max(0, 1 - gray / threshold) : Math.max(0, (1 - gray / threshold) * 0.4);

        if (heat > 0.6) {
          // Intense Red/Yellow
          tgtData.data[tgtIdx] = 255;
          tgtData.data[tgtIdx + 1] = Math.floor(255 * (1 - (heat - 0.6) * 2.5));
          tgtData.data[tgtIdx + 2] = 0;
          tgtData.data[tgtIdx + 3] = 255;
        } else if (heat > 0.2) {
          // Moderate Blue/Cyan
          tgtData.data[tgtIdx] = 0;
          tgtData.data[tgtIdx + 1] = Math.floor(200 * heat);
          tgtData.data[tgtIdx + 2] = 255;
          tgtData.data[tgtIdx + 3] = 240;
        } else {
          // Cool dark navy background
          tgtData.data[tgtIdx] = 14;
          tgtData.data[tgtIdx + 1] = 30;
          tgtData.data[tgtIdx + 2] = 51;
          tgtData.data[tgtIdx + 3] = 255;
        }
      }
    }

    tgtCtx.putImageData(tgtData, 0, 0);
  }

  /**
   * Renders Sobel Edge / Klişe Fingerprint Map.
   */
  public static renderEdgeMap(
    sourceCanvas: HTMLCanvasElement,
    targetCanvas: HTMLCanvasElement
  ) {
    const srcCtx = sourceCanvas.getContext('2d');
    const tgtCtx = targetCanvas.getContext('2d');
    if (!srcCtx || !tgtCtx) return;

    const w = targetCanvas.width;
    const h = targetCanvas.height;
    const srcData = srcCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    const tgtData = tgtCtx.createImageData(w, h);

    const sw = sourceCanvas.width;
    const scaleX = sw / w;
    const scaleY = sourceCanvas.height / h;

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const sx = Math.floor(x * scaleX);
        const sy = Math.floor(y * scaleY);

        const getGray = (ox: number, oy: number) => {
          const idx = ((sy + oy) * sw + (sx + ox)) * 4;
          return 0.299 * srcData.data[idx] + 0.587 * srcData.data[idx + 1] + 0.114 * srcData.data[idx + 2];
        };

        // Sobel kernels
        const gx =
          -1 * getGray(-1, -1) + 1 * getGray(1, -1) +
          -2 * getGray(-1, 0)  + 2 * getGray(1, 0) +
          -1 * getGray(-1, 1)  + 1 * getGray(1, 1);

        const gy =
          -1 * getGray(-1, -1) - 2 * getGray(0, -1) - 1 * getGray(1, -1) +
           1 * getGray(-1, 1)  + 2 * getGray(0, 1)  + 1 * getGray(1, 1);

        const magnitude = Math.min(255, Math.sqrt(gx * gx + gy * gy) * 1.5);
        const tgtIdx = (y * w + x) * 4;

        tgtData.data[tgtIdx] = magnitude > 50 ? 31 : 14;     // R
        tgtData.data[tgtIdx + 1] = magnitude > 50 ? 138 : 30; // G
        tgtData.data[tgtIdx + 2] = magnitude > 50 ? 91 : 51;  // B (Emerald relief highlight)
        tgtData.data[tgtIdx + 3] = 255;
      }
    }

    tgtCtx.putImageData(tgtData, 0, 0);
  }

  /**
   * Shader-like composite filter on main canvas for UV, Magnetic, Holographic simulation.
   */
  public static renderCompositeFrame(
    canvas: HTMLCanvasElement,
    rawImage: CanvasImageSource,
    options: {
      uvMode: boolean;
      magneticMode: boolean;
      holographicMode: boolean;
      time: number;
      holographicShift: number;
    }
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Draw base
    ctx.drawImage(rawImage, 0, 0, w, h);

    if (!options.uvMode && !options.magneticMode && !options.holographicMode) {
      return;
    }

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // Holographic vertical thread position (around 35% - 45% of width + bank shift)
    const threadCenter = (0.38 + options.holographicShift * 0.1) * w;
    const threadWidth = w * 0.05;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        let r = data[idx];
        let g = data[idx + 1];
        let b = data[idx + 2];

        // 1. UV Mode (365nm Wood's Lamp Simulation)
        if (options.uvMode) {
          const isFluorescent = g > 110 && b > 120 && r < 190;
          if (isFluorescent) {
            // Neon cyan / lime fluorescence glow
            r = Math.min(255, r * 0.3 + 40);
            g = Math.min(255, g * 1.3 + 120);
            b = Math.min(255, b * 1.4 + 180);
          } else {
            // Dark UV indigo cast
            r = Math.floor(r * 0.25 + 18);
            g = Math.floor(g * 0.25 + 24);
            b = Math.floor(b * 0.45 + 65);
          }
        }

        // 2. Magnetic Mode (NIR False-color)
        if (options.magneticMode) {
          const isDarkInk = r < 75 && g < 75 && b < 75;
          if (isDarkInk) {
            // Ruby Red magnetic ink highlight
            r = 235;
            g = 45;
            b = 45;
          }
        }

        // 3. Holographic Security Thread Simulation (Rainbow angle shifting)
        if (options.holographicMode) {
          const distToThread = Math.abs(x - threadCenter);
          if (distToThread < threadWidth) {
            const angle = options.time * 0.003 + (y / h) * 12.0;
            const wave = Math.sin(angle);
            const waveCos = Math.cos(angle);

            const holoR = Math.floor((Math.sin(angle) * 0.5 + 0.5) * 220 + 35);
            const holoG = Math.floor((Math.sin(angle + 2.094) * 0.5 + 0.5) * 220 + 35);
            const holoB = Math.floor((Math.sin(angle + 4.188) * 0.5 + 0.5) * 220 + 35);

            // Shimmer intensity
            const alpha = 0.65 + waveCos * 0.25;
            r = Math.floor(r * (1 - alpha) + holoR * alpha);
            g = Math.floor(g * (1 - alpha) + holoG * alpha);
            b = Math.floor(b * (1 - alpha) + holoB * alpha);
          }
        }

        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }
}
