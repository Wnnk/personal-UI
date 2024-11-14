<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { rouletteProps, PrizesType } from './roulette'
import { onMounted, reactive, toRefs, ref } from 'vue';
const bem = createNamespace('roulette');
defineOptions({
  name: 'z-roulette'
});
const props = defineProps(rouletteProps);
const {width, height, data, gap } = toRefs(props);
const canvasOptions = reactive({
  ctx: null  as CanvasRenderingContext2D | null,
  canvas: null  as HTMLCanvasElement | null,
})
/* 是否正在播放 */
const isPlaying = ref(false);
/* 初始速度 */
const speed = ref(0.1);

const startAngle = ref(0);
const endAngle = ref(0);
/* 转动角度 */
const angle = ref(0);
/* 动画帧 */
const frameFlag = ref();
const speedFlag = ref();
/* 目标值 */
const targetIndex = ref(0);
/* 减速值 */
const downSpeed = ref(0.01);



/** 
 * @description: 绘制背景
**/
const drawBackground = async () => {
  const ctx = canvasOptions.ctx;
  const canvas = canvasOptions.canvas;
  if (!ctx ||!canvas) return;
  ctx.clearRect(0, 0, canvasOptions.canvas!.width, canvasOptions.canvas!.height);
  const size = Math.min(canvas.width, canvas.height);
  for (let i = 0; i < data.value.blocks.length; i++) {
    const block = data.value.blocks[i];

    ctx.beginPath();
    ctx.arc(
      size / 2, 
      size / 2, 
      size / 2 - Number(block.padding ) * i, 
      0,
      2 * Math.PI
    )

    if (block.imgsrc) {
      const backgroundImage = new Image();
      backgroundImage.src = block.imgsrc;
      await new Promise ((resolve) => {
        backgroundImage.onload = async () => {
        ctx.save();
        ctx.clip();
        ctx.drawImage(backgroundImage, 0, 0, size, size);
        ctx.restore();
        resolve(true);
        }
      })

    } else {
      ctx.fillStyle = block.background;
      ctx.fill();
    }
   ctx.closePath();
  }
}

/** 
 * @description: 绘制指针
**/
const drawPointer = () => {
  const ctx = canvasOptions.ctx;
  const canvas = canvasOptions.canvas;
  if (!ctx ||!canvas) return;
  const centerX  = canvas.width / 2;
  const centerY  = canvas.height / 2;

  /* 绘制外围 */
  for (let i = 0; i < data.value.buttons.length; i++) {
    ctx.beginPath();
    const button = data.value.buttons[i];
    const radius = button.radius.endsWith('%') 
    ? centerX  * Number(button.radius.replace('%', '')) / 100 
    : Number(button.radius);
    ctx.fillStyle = button.background;
    /* 不绘制指针 */
    if (!button.pointer) {
      ctx.arc(
        centerX, 
        centerY, 
        radius, 
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.closePath();
    } else {
      /* 绘制指针 */
      ctx.arc(
        centerX, 
        centerY, 
        radius, 
        -45 * Math.PI / 180,
        225 * Math.PI / 180
      );
      /* 计算起终点 */
      const startX = centerX + radius * Math.cos(-45 * Math.PI / 180);
      const startY = centerY + radius * Math.sin(-45 * Math.PI / 180);
      const endX = centerX+ radius * Math.cos(225 * Math.PI / 180);
      const endY = centerY + radius * Math.sin(225 * Math.PI / 180);
      ctx.moveTo(centerX, centerY - 50);
      ctx.lineTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineTo(centerX, centerY - 50);
      ctx.fill();
      ctx.closePath();
    }
    /* 绘制文字 */
    if (button.fonts && button.fonts.length > 0) {
      ctx.textAlign = "center";
      ctx.font = "bold 14px serif";
      for (let i = 0; i < button.fonts.length; i++) {
        const font = button.fonts[i];
        if (font.background) {
          ctx.fillStyle = font.background;
        } else {
          ctx.fillStyle = 'black';
        }
        if (font.top || font.bottom || font.left || font.right) {
          
        }
        ctx.fillText(font.text, centerX, centerY)
      }
    }

  }

}


/** 
 * @description: 绘制轮盘
 * @param beginPointX 开始点x坐标
 * @param beginPointY 开始点y坐标
 * @param startAngle 开始角度
 * @param endAngle 结束角度
 * @param item 绘制项
**/
const drawRoulette = (beginPointX: number, beginPointY: number, startAngle: number, endAngle: number, item: PrizesType) => {
  const ctx = canvasOptions.ctx;
  const canvas = canvasOptions.canvas;
  if (!ctx ||!canvas) return;
  const centerX  = canvas.width / 2;
  const centerY  = canvas.height / 2;
  const size = Math.min(centerX, centerY);
  /*  计算半径 */
  const orbitRadius = size - data.value.blocks.reduce((acc, cur) => {
    return acc + Number(cur.padding) ;
  },0)
 
  ctx.beginPath();
  ctx.arc(
    beginPointX,
    beginPointY,
    orbitRadius,
    startAngle,
    endAngle
  );
  if (item.background) {
    ctx.fillStyle = item.background;
  } else {
    ctx.fillStyle =  "rgba(0,0,0,0)";
  }
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  const startX = centerX + orbitRadius * Math.cos(startAngle);
  const startY = centerY + orbitRadius * Math.sin(startAngle);
  const endX = centerX + orbitRadius * Math.cos(endAngle);
  const endY = centerY + orbitRadius * Math.sin(endAngle);
  ctx.lineTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.closePath();
  // ctx.stroke();
  ctx.fill();
  ctx.save();
  ctx.translate((startX+endX)/2, (startY+endY)/2);
  let angle = (startAngle + endAngle) / 2 + Math.PI / 2;
  ctx.rotate(angle);
  ctx.font = '24px Arial bold';
  ctx.fillStyle = '#AA625B';
  ctx.textAlign = 'center';
  for (const font of item.fonts) {
    ctx.fillText(font.text, 0, 10);
  }
  ctx.restore();
}


/** 
 * @description: 抽奖动画
 * 
**/

const animate = async () => {
  const ctx = canvasOptions.ctx;
  const canvas = canvasOptions.canvas;
  if (!ctx ||!canvas) return;
  /* 绘制背景 */
  await drawBackground();
  console.log('绘制背景')
  let totalProbability = 0;
  for (const prize of data.value.prizes) {
    if (!prize.probability) {
      /* 默认概率 */
      prize.probability = 0.1;
    }
    startAngle.value = 2 * Math.PI * (totalProbability)
    endAngle.value = 2 * Math.PI * (totalProbability + prize.probability);
    await drawRoulette(
      canvas.width / 2, 
      canvas.height / 2, 
      startAngle.value + angle.value, 
      endAngle.value + angle.value, 
      prize
    )
    console.log('绘制奖品')
    /* 更新总概率 */
    totalProbability += prize.probability;
  }

  /* 绘制指针 */
  await drawPointer();
  console.log('绘制指针');

  if (isPlaying.value) {
    speed.value += 0.0005;
    angle.value += speed.value;
    // setTimeout(() => {
    //   frameFlag.value = requestAnimationFrame(animate);
    // },300)
    
    
  }
  if (speed.value > 0.32) {
    stopAnimate();
   
  }
}


/** 
 * @description: 点击按钮事件
 * 
  */
const clickButtonEvent = async() => {
  const canvas = canvasOptions.canvas;
  if (!canvas) return;
  if (isPlaying.value) return;
  canvas.addEventListener('click', (event) => {
    const centerX  = canvas.width / 2;
    const centerY  = canvas.height / 2;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    let maxRadius = 0;
    /* 计算最大按钮半径 */
    for (const button of data.value.buttons) {
      const radius = button.radius.endsWith('%') 
      ? centerX  * Number(button.radius.replace('%', '')) / 100 
      : Number(button.radius);
      maxRadius = Math.max(maxRadius, radius);
    }
    if(x > centerX - maxRadius 
        && x < centerX + maxRadius 
        && y > centerY - maxRadius 
        && y < centerY + maxRadius
      ) {
      startAnimate();
    }
  })
}

/** 
 * @description: 开始抽奖动画
**/
const startAnimate = () => {
  console.log('startAnimate');
  isPlaying.value = true;
  animate();
  speed.value = 0.1;
  
}

/** 
 * @description: 停止抽奖动画
 * 
**/
const stopAnimate = () => {
  if (targetIndex.value) {
   if (targetIndex.value) {
    if (!startAngle.value) {
      targetIndex.value = Math.floor(Math.random() * data.value.prizes.length);
    }
    startAngle.value = ((targetIndex.value) * 2 * Math.PI) / data.value.prizes.length;
    endAngle.value = ((targetIndex.value + 1) * 2 * Math.PI) / data.value.prizes.length;
    let tempStartAngle = startAngle.value;;
    let tempEndAngle = endAngle.value;
    let stopAngle = (tempStartAngle + tempEndAngle) / 2;
    let baseAngle = angle.value % (2 * Math.PI);
    downSpeed.value = stopAngle < baseAngle ? (2 * Math.PI - baseAngle + stopAngle) / 1000 : (stopAngle - baseAngle) / 1000;
    slowSpeed();
   } else {
    slowSpeed();
   }
  }
}


/** 
 * @description: 动画减速
 * 
**/
const slowSpeed = () => {
  speed.value -= downSpeed.value;
  if (targetIndex.value) {
    if (!(angle.value % (2 * Math.PI) > startAngle.value 
      && angle.value % ( 2 * Math.PI) < endAngle.value)) {
      speedFlag.value = requestAnimationFrame(slowSpeed);
    } else if (speed.value < 0) {
      cancelAnimationFrame(frameFlag.value);
      cancelAnimationFrame(speedFlag.value);
    } else {
      cancelAnimationFrame(frameFlag.value);
      cancelAnimationFrame(speedFlag.value);
    }
  } else {
    if (speed.value < 0) {
      cancelAnimationFrame(frameFlag.value);
      cancelAnimationFrame(speedFlag.value);
    } else {
      speedFlag.value = requestAnimationFrame(slowSpeed);
    }
  }
}

onMounted(async () => {
  canvasOptions.canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvasOptions.ctx = canvasOptions.canvas.getContext('2d') as CanvasRenderingContext2D;
  await animate();
  await clickButtonEvent();
})
</script>

<template>
  <div :class="bem.b()">
    <canvas id="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<style lang='scss' scoped>
</style>