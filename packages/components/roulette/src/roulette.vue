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
const targetIndex = ref(5);
/* 减速值 */
const downSpeed = ref(0.002);




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
  ctx.translate((startX + endX) / 2, (startY + endY) / 2);
  let angle = (startAngle + endAngle) / 2 + Math.PI / 2;
  ctx.rotate(angle);
  ctx.font = '24px Arial bold';
  ctx.fillStyle = '#AA625B';
  ctx.textAlign = 'center';
  for (const font of item.fonts) {
    ctx.fillText(font.text, 0, 15);
  }
  ctx.restore();
}


/**
 * @description： 计算停止时概率的开始角度和结束角度
 *   
**/
const calculateAngle = () => {
  /* 总奖品数量 */
  const totalPrizes = data.value.prizes.length;
  /* 总概率 */
  let totalProbability = 0;


  data.value.prizes.forEach((prize) => {
    if (!prize.probability) {
      prize.probability =  1 / totalPrizes;
    }

    totalProbability += prize.probability;
  });

  const angles = data.value.prizes.map((prize) => {
    return (prize.probability! / totalProbability) * (2 * Math.PI);
  })

  let startAngle = 0;


  for (let i = 0; i < angles.length; i++) {
    if (i === targetIndex.value) {
      const endAngle = startAngle + angles[i];
      return {
        startAngle,
        endAngle
      };
    }
    startAngle += angles[i];
  }



  return {
    startAngle: 0,
    endAngle: 0
  }
}




/** 
 * @description: 抽奖动画
 * 
**/

const animate = async () => {
  const ctx = canvasOptions.ctx;
  const canvas = canvasOptions.canvas;
  if (!ctx ||!canvas) return;
 
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
   
    /* 更新总概率 */
    totalProbability += prize.probability;
  }

  /* 绘制指针 */
  await drawPointer();


  if (isPlaying.value && speed.value < 0.32) {
    speed.value += 0.005;
    angle.value += speed.value;
    frameFlag.value = requestAnimationFrame(animate);
    
  }
  if (speed.value > 0.32) {
    console.log('stopAnimate')
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
  if (isPlaying.value) return;
  isPlaying.value = true;
  animate();
  speed.value = 0.1;
  
}




/** 
 * @description: 停止抽奖动画
 * 
**/
const stopAnimate = () => {

  if (targetIndex.value !== undefined) {
  if (!startAngle.value) {
    targetIndex.value = Math.floor(Math.random() * data.value.prizes.length);
  }
  

  const { startAngle: calcStartAngle, endAngle: calcEndAngle } = calculateAngle();
  startAngle.value = calcStartAngle;
  endAngle.value = calcEndAngle;

  

  let tempStartAngle = startAngle.value;;
  let tempEndAngle = endAngle.value;
  let stopAngle = (tempStartAngle + tempEndAngle) / 2;
  let baseAngle = angle.value % (2 * Math.PI);
  downSpeed.value = stopAngle < baseAngle ? (2 * Math.PI - baseAngle + stopAngle) / 1000 : (stopAngle - baseAngle) / 1000;
  slowSpeed();
  } else {
  slowSpeed();
  }
  isPlaying.value = false;
}


/** 
 * @description: 动画减速
 * 
**/
const slowSpeed = () => {
  speed.value -= downSpeed.value;

  if (typeof targetIndex.value === 'number') {
    const currentAngle = angle.value % (2 * Math.PI);
    if ( currentAngle >= startAngle.value && currentAngle <= endAngle.value) {
      console.log(currentAngle, startAngle.value, endAngle.value)
      console.log(speed.value)
      cancelAnimationFrame(speedFlag.value);
      cancelAnimationFrame(frameFlag.value);
    } else {
      cancelAnimationFrame(speedFlag.value);
    }

    // if (!(currentAngle >= startAngle.value 
    //   && currentAngle <= endAngle.value)) {
    //     console.log('stopAnimate1')
    //   speedFlag.value = requestAnimationFrame(slowSpeed);
    // } else if (speed.value <= 0.03) {
    //   console.log('stopAnimate2', currentAngle > startAngle.value, currentAngle < endAngle.value)
    //   cancelAnimationFrame(frameFlag.value);
    //   cancelAnimationFrame(speedFlag.value);
    // } 
    // else {
    //   console.log('stopAnimate3',targetIndex.value)
    //   cancelAnimationFrame(frameFlag.value);
    //   cancelAnimationFrame(speedFlag.value);
    // }
  }
  
  
}

onMounted(async () => {
  canvasOptions.canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvasOptions.ctx = canvasOptions.canvas.getContext('2d') as CanvasRenderingContext2D;
  await drawBackground();
  
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