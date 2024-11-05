<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { luckyGridProps } from './luckygrid';
import { onMounted, reactive, toRefs, ref } from 'vue';

const bem = createNamespace('luckygrid');
const props = defineProps(luckyGridProps);
const { width, height, data } = toRefs(props);

defineOptions({
  name: 'z-luckygrid'
});

const canvasOptions = reactive({
  ctx: null as CanvasRenderingContext2D | null,
  canvas: null as HTMLCanvasElement | null,

})

/* 初始化时，绘制背景和九宫格坐标 */
const beginPointX = ref(0);
const beginPointY = ref(0);
const originX = ref(0);
const originY = ref(0);

/** 
 * @description: 绘制九宫格背景
**/
const drawGridBackground = () => {
  const ctx = canvasOptions.ctx;
  if (!ctx || ! data.value.blocks) return;
  for (let i = 0; i <data.value.blocks.length; i++) {
    const item = data.value.blocks[i];
    ctx.fillStyle = item.background;
    ctx.lineWidth = Number(item.padding);
    ctx.beginPath();
    ctx.roundRect(
      beginPointX.value, 
      beginPointY.value, 
      Number(width.value) - Number(item.padding) * i * 2, 
      Number(height.value) - Number(item.padding) * i * 2, 
      [0]
    );
    ctx.fill();
    ctx.closePath();
    beginPointX.value += Number(item.padding);
    beginPointY.value += Number(item.padding);
  }
}

/** 
 * @description: 绘制九宫格
**/
const drawGridCells = async () => {
  const ctx = canvasOptions.ctx;
  if (!ctx) return;
  const gap = 10; 
  const cellSize = getGridCellSize(gap);
  /* 绘制九宫格 */

  /* 暂存九宫格的起始坐标 */
  originX.value = beginPointX.value;
  originY.value = beginPointY.value;
    
  /* 绘制格子 */
  getGridCell(ctx, data.value.prizes, gap, cellSize, data.value.style);
  
}


/**  
 * @description: 绘制单个格子
 * @param {CanvasRenderingContext2D} ctx canvas上下文
 * @param {any} data 奖项数据
 * @param {number} gap 格子间距
 * @param {number} cellSize 格子大小
 * @param {any} style 各自样式样式
**/

const getGridCell = async( ctx:CanvasRenderingContext2D ,data:any, gap:number = 10, cellSize:number = 0, style:any) => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    /* 计算当前奖项的坐标: cell尺寸 * 奖项坐标 + 间距 + 起始坐标 */
    beginPointX.value = cellSize * item.x + (gap * (item.x + 1) ) + originX.value;
    beginPointY.value = cellSize * item.y + (gap * (item.y + 1) ) + originY.value;

    /* 使用图片 */
    if (item.imgsrc) {
      const img = await loadImage(item.imgsrc);
      ctx.drawImage(img, beginPointX.value, beginPointY.value, cellSize, cellSize);
    } else if(item.fonts) {
      /* 不适用图片为背景 */
      if (style) {
        ctx.fillStyle = style.background;
      }
      ctx.beginPath();
      ctx.roundRect(beginPointX.value, beginPointY.value, cellSize, cellSize, [10]);
      ctx.fill();
      ctx.closePath();

      /* 绘制文字 */
      ctx.font = '24px Arial bold';
      ctx.fillStyle = '#AA625B';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.fonts[0].text,beginPointX.value + cellSize / 2, beginPointY.value + cellSize / 2);
    }
  }
}


/** 
 * @description: 计算九宫格格子大小
**/
const getGridCellSize = (gap:number = 10) => {
    /* 计算绘制背景后剩余k个格子的宽度和高度 */
    const remainWidth = Number(width.value) - beginPointX.value * 2;
  /* 分配每个格子的大小 */
  const cellWidth = (remainWidth - gap * 4) / 3;
  const cellHegiht = (remainWidth - gap * 4) / 3;
  const cellSize = Math.min(cellWidth, cellHegiht);
  return cellSize;
}

/** 
 * @description: 加载图片
 * @param {string} src 图片地址
**/
const loadImage = (src:string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {    
      resolve(img);
    }
  })
}




onMounted(async () => {
  canvasOptions.canvas= document.getElementById('luckygrid') as HTMLCanvasElement;
  canvasOptions.ctx = canvasOptions.canvas.getContext('2d');
  drawGridBackground();
  drawGridCells();
});
</script>

<template>
  <div :class="bem.b()">
    <canvas id="luckygrid" :width="width" :height="height"></canvas>
  </div>
</template>

<style lang='scss' scoped>
</style>