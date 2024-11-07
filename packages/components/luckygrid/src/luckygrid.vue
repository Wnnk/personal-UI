<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { luckyGridProps } from './luckygrid';
import { onMounted, reactive, toRefs, ref, onUnmounted } from 'vue';

const bem = createNamespace('luckygrid');
const props = defineProps(luckyGridProps);
const { width, height, data, gap, speed } = toRefs(props);

defineOptions({
  name: 'z-luckygrid'
});

const canvasOptions = reactive({
  ctx: null as CanvasRenderingContext2D | null,
  canvas: null as HTMLCanvasElement | null,
  canvasRecord: [] as any[]
})

/* 初始化时，绘制背景和九宫格坐标 */
const beginPointX = ref(0);
const beginPointY = ref(0);
/* 绘制背景后左上角的起始坐标 */
const originX = ref(0);
const originY = ref(0);
/* 抽奖圈数 */
const prizeCount = ref(0);


/** 
 * @description: 绘制九宫格背景
**/
const drawGridBackground = async () => {
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

  
  /* 暂存九宫格的起始坐标 */
  originX.value = beginPointX.value;
  originY.value = beginPointY.value;

  /* 计算格子大小 */
  const cellSize = getGridCellSize(gap.value);

  /* 绘制九宫格 */  
  /* 绘制奖品 */
  await getGridCell(ctx, data.value.prizes, gap.value, cellSize);


  /* 绘制按钮 */
  await getGridCell(ctx, data.value.buttons, gap.value, cellSize);
  
}


/**  
 * @description: 绘制单个格子
 * @param {CanvasRenderingContext2D} ctx canvas上下文
 * @param {any} data 奖项数据
 * @param {number} gap 格子间距
 * @param {number} cellSize 格子大小
 * @param {any} style 各自样式样式
**/

const getGridCell = async( ctx:CanvasRenderingContext2D ,data:any, gap:number = 10, cellSize:number = 0 ) => {
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
      /* 不适用图片为背景 && 不是抽状态*/
      if (item.background && !isStart.value) {
        ctx.fillStyle = item.background;
      } else if(isStart.value) {
        ctx.fillStyle = '#ff9300';
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
  const remainWidth = Number(width.value) - originX.value * 2;
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

/** 
 * @description: 根据x,y坐标获取九宫格的格子坐标
 * @param {number} x x坐标
 * @param {number} y y坐标
**/

const getGridCellByXY = (x:number, y:number) => {
  const cellSize = getGridCellSize(gap.value);
  const cellX = cellSize *  x + (gap.value * (x + 1) ) + originX.value;
  const cellY = cellSize *  y + (gap.value * (y + 1) ) + originY.value;
  return {
    x: cellX,
    y: cellY,
    cellSize: cellSize
  }
}


/** 
 * @description：判断是否按下开始按钮
**/
/* 按钮状态 */
const isStart = ref(false);

const mouseEvent = async  () => {
  const canvas = canvasOptions.canvas;
  if (!canvas) return;
  const handleClick = (event: MouseEvent) => {
    /* 无效点击 */
    if (isStart.value) return;

    for (let i = 0; i < data.value.buttons.length; i++) {
      const item = data.value.buttons[i];
      /* 判断是否是开始按钮 */
      const {x ,y, cellSize} = getGridCellByXY(item.x, item.y);
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      if (mouseX > x && mouseX < x + cellSize && mouseY > y && mouseY < y + cellSize) {
        isStart.value = true;
        startAnimation();
      }
    }
  };
  canvas.addEventListener('click', handleClick);

  onUnmounted(() => {
    canvas.removeEventListener('click', handleClick);
    console.log('组件销毁');
  })
}


/** 
 * @description: 开始抽奖动画
**/
const startAnimation = async (i:number = 0) => {
  const ctx = canvasOptions.ctx;
  const canvasRecord = canvasOptions.canvasRecord;
  if (!ctx) return;

  /* 停止抽奖 */
  if (prizeCount.value > 3) {
    isStart.value = false;
    prizeCount.value = 0;
    return;
  }
  setTimeout(() => {
    /* 基础数据 */
    const item = data.value.prizes[i];
    const {x, y, cellSize} = getGridCellByXY(item.x, item.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';


    if  (i === 0 && prizeCount.value === 0) {
      /* 记录当前画布状态 */
      const imageData = ctx.getImageData(0, 0, Number(width.value), Number(height.value));
      canvasRecord.push(imageData);
    } else {
      /* 还原画布状态 */
      ctx.putImageData(canvasRecord[0], 0, 0);
    }
   
    ctx.beginPath();
    ctx.strokeRect(x - 2, y - 2, cellSize + 4, cellSize + 4);
    ctx.stroke();
    ctx.closePath();

    i++;
    if (i > data.value.prizes.length - 1) {
      i = 0;
      prizeCount.value++;
    }
    startAnimation(i);
  },speed.value)
 
}

/** 
 * @description: 停止抽奖动画
 * @param {number} i 获得奖项索引
**/

const stopAnimation = (i:number) => {
  console.log(`停止抽奖动画${i}号奖品`);
}



defineExpose({
  stopAnimation
})

/** 
 * @description: 组件初始化
 * 
**/

const init = async () => {
  canvasOptions.canvas= document.getElementById('luckygrid') as HTMLCanvasElement;
  canvasOptions.ctx = canvasOptions.canvas.getContext('2d');
  /* 绘制背景 */
  await drawGridBackground();
  /* 绘制九宫格 */
  await drawGridCells();
  /* 注册鼠标点击事件 */
  await mouseEvent();
}



onMounted(async () => {
  await init();
});





</script>

<template>
  <div :class="bem.b()">
    <canvas id="luckygrid" :width="width" :height="height"></canvas>
  </div>
</template>

<style lang='scss' scoped>
</style>