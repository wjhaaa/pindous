import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Canvas,
  Image,
  ScrollView,
  Slider,
  Text,
  View,
} from "@tarojs/components";
import Taro, { useReady } from "@tarojs/taro";
import { AtButton } from "taro-ui";
import "./index.scss";
import { loadMardPalette, type MardColor } from "./mardPalette";
import { beadifyPixels, type BeadifyResult } from "./beadify";

type ImageMeta = {
  path: string;
  width: number;
  height: number;
};

const PRESET_WIDTHS = [
  { label: "钥匙扣 16", value: 16 },
  { label: "常规小图 29", value: 29 },
  { label: "大板 52", value: 52 },
  { label: "双板级 104", value: 104 },
] as const;

const CANVAS_ID = "bead_preview_canvas";
const EXPORT_CANVAS_ID = "bead_export_canvas";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

async function get2dCanvasNode(canvasId: string): Promise<{
  canvas: any;
  ctx: any;
}> {
  // WeChat mini-program: Canvas type="2d" provides node + 2d context.
  // H5: fallback to canvasId with createCanvasContext (no getImageData), so we prioritize node route.
  return new Promise((resolve, reject) => {
    const query = Taro.createSelectorQuery();
    const page = Taro.getCurrentInstance?.().page as any;
    if (page && typeof query.in === "function") {
      query.in(page);
    }
    query
      .select(`#${canvasId}`)
      .fields({ node: true, size: true } as any)
      .exec((res: any[]) => {
        const r = res?.[0];
        const canvas = r?.node;
        if (!canvas) {
          reject(new Error("无法获取 Canvas 节点（请确认使用了 type='2d'）。"));
          return;
        }
        const ctx = canvas.getContext("2d");
        resolve({ canvas, ctx });
      });
  });
}

function drawBeadGridToCtx(params: {
  ctx: any;
  grid: number[][];
  palette: MardColor[];
  cell: number;
  padding?: number;
  shape?: "circle" | "square";
  gridLine?: boolean;
  background?: string;
}) {
  const {
    ctx,
    grid,
    palette,
    cell,
    padding = 0,
    shape = "circle",
    gridLine = true,
    background = "#FFFFFF",
  } = params;

  const h = grid.length;
  const w = grid[0]?.length ?? 0;
  const widthPx = padding * 2 + w * cell;
  const heightPx = padding * 2 + h * cell;

  ctx.clearRect(0, 0, widthPx, heightPx);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, widthPx, heightPx);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pIdx = grid[y][x];
      const color = palette[pIdx]?.hex ?? "#000000";
      const left = padding + x * cell;
      const top = padding + y * cell;

      ctx.fillStyle = color;
      if (shape === "circle") {
        const r = cell * 0.45;
        const cx = left + cell / 2;
        const cy = top + cell / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(left, top, cell, cell);
      }

      if (gridLine) {
        ctx.strokeStyle = "rgba(0,0,0,0.10)";
        ctx.lineWidth = 1;
        ctx.strokeRect(left + 0.5, top + 0.5, cell, cell);
      }
    }
  }
}

function buildLegendItems(result: BeadifyResult, palette: MardColor[]) {
  const items = result.counts
    .map((count, idx) => ({ count, idx }))
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count)
    .map(({ idx, count }) => ({
      code: palette[idx]?.code ?? "UNK",
      hex: palette[idx]?.hex ?? "#000000",
      count,
      idx,
    }));
  return items;
}

const Generator: React.FC = () => {
  const [palette, setPalette] = useState<MardColor[] | null>(null);
  const [paletteError, setPaletteError] = useState<string | null>(null);
  const [img, setImg] = useState<ImageMeta | null>(null);
  const [targetWidth, setTargetWidth] = useState<number>(29);
  const [targetHeight, setTargetHeight] = useState<number>(29);
  const [result, setResult] = useState<BeadifyResult | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [showGridLines, setShowGridLines] = useState(true);

  const previewNodeRef = useRef<{ canvas: any; ctx: any } | null>(null);
  const exportNodeRef = useRef<{ canvas: any; ctx: any } | null>(null);

  useReady(() => {
    // initialize canvas nodes when page ready
    void (async () => {
      try {
        previewNodeRef.current = await get2dCanvasNode(CANVAS_ID);
        exportNodeRef.current = await get2dCanvasNode(EXPORT_CANVAS_ID);
      } catch (e) {
        // ignore here; will be surfaced when rendering/exports are triggered
      }
    })();
  });

  useEffect(() => {
    void (async () => {
      try {
        const p = await loadMardPalette();
        setPalette(p);
        setPaletteError(null);
      } catch (e: any) {
        setPalette(null);
        setPaletteError(e?.message || "加载 MARD 色板失败");
      }
    })();
  }, []);

  useEffect(() => {
    if (!img) return;
    const h = Math.max(1, Math.round((img.height * targetWidth) / img.width));
    setTargetHeight(h);
  }, [img, targetWidth]);

  const legendItems = useMemo(() => {
    if (!palette || !result) return [];
    return buildLegendItems(result, palette).slice(0, 40);
  }, [palette, result]);

  const chooseImage = useCallback(async () => {
    const r = await Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    });
    const path = r.tempFilePaths?.[0];
    if (!path) return;
    const info = await Taro.getImageInfo({ src: path });
    setImg({ path, width: info.width, height: info.height });
    setResult(null);
  }, []);

  const generate = useCallback(async () => {
    if (!img) {
      Taro.showToast({ title: "请先上传图片", icon: "none" });
      return;
    }
    if (!palette) {
      Taro.showToast({ title: "MARD 色板未就绪", icon: "none" });
      return;
    }
    setIsBusy(true);
    try {
      await new Promise<void>((resolve) => Taro.nextTick(() => resolve()));
      const targetW = clamp(Math.round(targetWidth), 4, 300);
      const targetH = Math.max(
        1,
        Math.round((img.height * targetW) / img.width)
      );
      setTargetWidth(targetW);
      setTargetHeight(targetH);

      const previewNode =
        previewNodeRef.current ?? (await get2dCanvasNode(CANVAS_ID));
      previewNodeRef.current = previewNode;

      // Step 1: draw image scaled to (targetW, targetH) and read pixels
      const offscreen = previewNode.canvas; // reuse the same canvas for sampling
      offscreen.width = targetW;
      offscreen.height = targetH;
      const octx = previewNode.ctx;

      // Use createImage for 2d canvas in weapp
      const image = offscreen.createImage();
      const imageLoaded: Promise<void> = new Promise((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = (err: any) => reject(err);
      });
      image.src = img.path;
      await imageLoaded;

      octx.clearRect(0, 0, targetW, targetH);
      octx.drawImage(image, 0, 0, targetW, targetH);
      const data = octx.getImageData(0, 0, targetW, targetH);

      // Step 2: map to palette
      const bead = beadifyPixels(
        data.data as Uint8ClampedArray,
        targetW,
        targetH,
        palette,
        { transparentAs: "white" }
      );
      setResult(bead);

      // Step 3: render a nicer preview (larger cell size)
      const cell = clamp(Math.floor(480 / Math.max(targetW, targetH)), 6, 16);
      const pad = 12;
      const previewWpx = pad * 2 + targetW * cell;
      const previewHpx = pad * 2 + targetH * cell;
      offscreen.width = previewWpx;
      offscreen.height = previewHpx;

      drawBeadGridToCtx({
        ctx: octx,
        grid: bead.grid,
        palette,
        cell,
        padding: pad,
        shape: "circle",
        gridLine: showGridLines,
        background: "#FFFFFF",
      });
    } catch (e: any) {
      Taro.showToast({ title: e?.message || "生成失败", icon: "none" });
    } finally {
      setIsBusy(false);
    }
  }, [img, palette, showGridLines, targetWidth]);

  const exportPng = useCallback(async () => {
    if (!img || !palette || !result) {
      Taro.showToast({ title: "请先生成图纸", icon: "none" });
      return;
    }
    setIsBusy(true);
    try {
      // ensure album permission (weapp)
      try {
        await Taro.authorize({ scope: "scope.writePhotosAlbum" } as any);
      } catch (e) {
        // user may reject; we'll still try save and surface platform error
      }

      const exportNode =
        exportNodeRef.current ?? (await get2dCanvasNode(EXPORT_CANVAS_ID));
      exportNodeRef.current = exportNode;

      const items = buildLegendItems(result, palette);
      const maxItems = 60;
      const legend = items.slice(0, maxItems);

      const cell = 24; // print-friendly
      const pad = 36;
      const gridWpx = result.width * cell;
      const gridHpx = result.height * cell;

      const legendColW = 360;
      const titleH = 90;
      const legendRowH = 32;
      const legendH = 40 + legend.length * legendRowH;

      const canvasW = pad * 2 + gridWpx + legendColW;
      const canvasH = pad * 2 + Math.max(gridHpx, titleH + legendH);

      const canvas = exportNode.canvas;
      const ctx = exportNode.ctx;
      canvas.width = canvasW;
      canvas.height = canvasH;

      // background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvasW, canvasH);

      // title + meta
      ctx.fillStyle = "#111827";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("拼豆图纸（MARD 色号）", pad, pad + 26);
      ctx.fillStyle = "#4B5563";
      ctx.font = "16px sans-serif";
      ctx.fillText(
        `原图：${img.width}×${img.height}px  输出：${result.width}×${
          result.height
        }  总颗数：${result.width * result.height}`,
        pad,
        pad + 54
      );

      // grid
      const gridLeft = pad;
      const gridTop = pad + titleH;
      ctx.save();
      ctx.translate(gridLeft, gridTop);
      drawBeadGridToCtx({
        ctx,
        grid: result.grid,
        palette,
        cell,
        padding: 0,
        shape: "circle",
        gridLine: showGridLines,
        background: "#FFFFFF",
      });
      ctx.restore();

      // legend
      const legendLeft = pad + gridWpx + 24;
      const legendTop = pad + titleH;
      ctx.fillStyle = "#111827";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("图例 / 统计", legendLeft, legendTop + 18);

      ctx.font = "14px sans-serif";
      for (let i = 0; i < legend.length; i++) {
        const it = legend[i];
        const y = legendTop + 40 + i * legendRowH;
        // swatch
        ctx.fillStyle = it.hex;
        ctx.fillRect(legendLeft, y - 14, 18, 18);
        ctx.strokeStyle = "rgba(0,0,0,0.12)";
        ctx.strokeRect(legendLeft + 0.5, y - 14 + 0.5, 18, 18);
        // text
        ctx.fillStyle = "#111827";
        ctx.fillText(`${it.code}`, legendLeft + 26, y);
        ctx.fillStyle = "#4B5563";
        ctx.fillText(`${it.count} 颗`, legendLeft + 86, y);
      }

      // output temp file
      let tempPath = "";
      if (typeof canvas.toTempFilePath === "function") {
        const r = await canvas.toTempFilePath({
          fileType: "png",
          quality: 1,
        });
        tempPath = r.tempFilePath;
      } else {
        // fallback for environments supporting canvasToTempFilePath by id
        const r = await Taro.canvasToTempFilePath({
          canvasId: EXPORT_CANVAS_ID,
          fileType: "png",
          quality: 1,
        } as any);
        tempPath = (r as any).tempFilePath;
      }

      await Taro.saveImageToPhotosAlbum({ filePath: tempPath });
      Taro.showToast({ title: "已保存 PNG 到相册", icon: "success" });
    } catch (e: any) {
      const msg = e?.errMsg || e?.message || "导出失败";
      Taro.showToast({
        title: msg.includes("auth") ? "请在设置中允许保存到相册" : msg,
        icon: "none",
      });
      if (msg.includes("auth")) {
        try {
          await Taro.openSetting({});
        } catch (_) {}
      }
    } finally {
      setIsBusy(false);
    }
  }, [img, palette, result, showGridLines]);

  return (
    <ScrollView className="generatorPage" scrollY>
      <View className="container">
        <View className="hero">
          <Text className="heroTitle">拼豆图生成</Text>
          <Text className="heroSub">
            上传图片后自动生成拼豆网格，按 MARD 色号匹配，并可导出 PNG。
          </Text>
        </View>

        {/* Step 1 */}
        <View className="panel">
          <View className="panelTitleRow">
            <Text className="panelTitle">上传图片</Text>
            <Text className="panelSubTitle">选择要转换的参考图</Text>
          </View>

          {!img ? (
            <View className="uploadBox" onClick={chooseImage}>
              <Text className="uploadMainText">选择图像</Text>
              <Text className="uploadHelpText">支持 JPG、PNG、WEBP</Text>
            </View>
          ) : (
            <>
              <Image className="previewImg" src={img.path} mode="aspectFill" />
              <View className="rowBetween" style={{ marginTop: 10 }}>
                <Text className="smallMuted">
                  原图尺寸：{img.width}×{img.height}px
                </Text>
                <AtButton
                  size="small"
                  onClick={chooseImage}
                  disabled={isBusy}
                  className="ghostBtn"
                >
                  重新选择
                </AtButton>
              </View>
            </>
          )}
        </View>

        {/* Step 2 */}
        <View className="panel">
          <View className="panelTitleRow">
            <Text className="panelTitle">图案尺寸</Text>
            <Text className="panelSubTitle">
              小图保持原尺寸，大图按上限缩小
            </Text>
          </View>

          <View className="sizeValueRow">
            <Text className="sizeValue">{targetWidth}</Text>
            <Text className="sizeUnit">格</Text>
            <Text className="sizeMeta">
              {img
                ? `输出：${targetWidth}×${targetHeight}`
                : palette
                ? `色板：MARD`
                : paletteError || ""}
            </Text>
          </View>

          <Slider
            min={16}
            max={104}
            step={1}
            value={targetWidth}
            activeColor="#3b82f6"
            backgroundColor="rgba(0,0,0,0.08)"
            blockColor="#2563eb"
            onChanging={(e) => setTargetWidth((e as any).detail.value)}
            onChange={(e) => setTargetWidth((e as any).detail.value)}
          />

          <View className="pillRow">
            {PRESET_WIDTHS.map((p) => (
              <View
                key={p.value}
                className={`pill ${
                  targetWidth === p.value ? "pillActive" : ""
                }`}
                onClick={() => setTargetWidth(p.value)}
              >
                <Text>{p.value}</Text>
              </View>
            ))}
          </View>

          <Text className="smallMuted">
            常用规格：钥匙扣 16、常规小图 29、大板 52、双板级 104。
          </Text>
        </View>

        {/* Options */}
        <View className="panel">
          <View className="panelTitleRow">
            <Text className="panelTitle">参数</Text>
            <Text className="panelSubTitle">影响预览与导出</Text>
          </View>
          <View
            className="rowBetween"
            onClick={() => setShowGridLines((v) => !v)}
          >
            <Text className="label">显示网格线</Text>
            <View
              className="toggleBox"
              style={{
                background: showGridLines ? "#3b82f6" : "rgba(0,0,0,0.14)",
              }}
            >
              <View
                className="toggleDot"
                style={{
                  transform: showGridLines
                    ? "translateX(18px)"
                    : "translateX(2px)",
                }}
              />
            </View>
          </View>
        </View>

        {/* Main action */}
        <View className="panel">
          <AtButton
            type="primary"
            onClick={generate}
            disabled={isBusy || !img || !palette}
            loading={isBusy}
            className="primaryBtn"
          >
            生成拼豆图
          </AtButton>

          {img && result && (
            <View className="successCard" style={{ marginTop: 12 }}>
              <Text className="successTitle">✔ 拼豆图已生成</Text>
              <Text className="successDesc">
                已从 {img.width}×{img.height}px 缩小到 {result.width}×
                {result.height} 格
              </Text>
            </View>
          )}
        </View>

        {/* Preview */}
        <View className="panel">
          <View className="panelTitleRow">
            <Text className="panelTitle">预览</Text>
            <Text className="panelSubTitle">拼豆网格预览</Text>
          </View>
          <View className="canvasBox">
            <Canvas
              type="2d"
              id={CANVAS_ID}
              canvasId={CANVAS_ID}
              style={{ width: "100%", height: "520px" }}
            />
          </View>
          <Text className="smallMuted" style={{ marginTop: 8 }}>
            {result
              ? `${result.width}×${result.height} 颗 · 总颗数 ${
                  result.width * result.height
                }`
              : "生成后会显示预览"}
          </Text>
        </View>

        {/* Counts */}
        <View className="panel">
          <View className="panelTitleRow">
            <Text className="panelTitle">已用颜色</Text>
            <Text className="panelSubTitle">每色颗数统计</Text>
          </View>
          {!palette || !result ? (
            <Text className="smallMuted">
              生成图纸后会显示每种颜色的拼豆颗数。
            </Text>
          ) : (
            <View className="statsList">
              {legendItems.map((it) => (
                <View className="statItem" key={it.code}>
                  <View className="statLeft">
                    <View className="swatch" style={{ background: it.hex }} />
                    <Text className="codeText">{it.code}</Text>
                  </View>
                  <Text className="countText">{it.count}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Export */}
        <View className="panel">
          <View className="panelTitleRow">
            <Text className="panelTitle">导出</Text>
            <Text className="panelSubTitle">保存图例版 PNG 到相册</Text>
          </View>
          <AtButton
            onClick={exportPng}
            disabled={isBusy || !palette || !result}
            className="ghostBtn"
          >
            导出 PNG
          </AtButton>
        </View>
      </View>

      {/* Hidden export canvas node (2d) */}
      <View style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <Canvas
          type="2d"
          id={EXPORT_CANVAS_ID}
          canvasId={EXPORT_CANVAS_ID}
          style={{ width: "10px", height: "10px" }}
        />
      </View>
    </ScrollView>
  );
};

export default Generator;
