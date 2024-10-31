<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { rouletteProps, BackOption } from './roulette'
import { onMounted, reactive, toRefs, ref } from 'vue';
const bem = createNamespace('roulette');
defineOptions({
  name: 'z-roulette'
});
const props = defineProps(rouletteProps);
const { data, backOption, btnOption } = toRefs(props);

const ballOptions = reactive(data.value);
const backImageOption = reactive(backOption.value);
const backBtnImage = reactive(btnOption.value);

const canvasOptions = reactive({
  ctx: null as CanvasRenderingContext2D | null,
  canvas: null as HTMLCanvasElement | null,
  angle: 0.1,
  speed: 0.1,
  mustIndex: 0,
});



/* 转盘配置  */
const isAnimal = ref(false);
const {ctx,canvas,angle,speed,mustIndex} = toRefs(canvasOptions);
const animateFlag = ref(0);
const speedFlag = ref(0);
const downSpeed = ref(0.0001);
const startAngle = ref(0);
const endAngle = ref(0);

onMounted( async () => {
  canvasOptions.canvas = document.getElementById('canvas') as HTMLCanvasElement;
  canvasOptions.ctx = canvasOptions.canvas?.getContext('2d');
  await animate()
  await eventOfCanvas();
});

/** 
 * @description: 绘制基础圆盘
 * @param {beginPointX: number, beginPointY: number, radius: number,startAngle: number, endAngle: number, backgroudColor: string}
  **/
const drawBall = (beginPointX: number, beginPointY: number, radius: number, startAngle: number, endAngle: number, backgroudColor: string) => {
  const ctx = canvasOptions.ctx;
  if (!ctx) return;
  ctx.beginPath();
  ctx.arc(beginPointX,beginPointY, radius, startAngle, endAngle);
  ctx.fillStyle = backgroudColor;
  ctx.fill();
};

/** 
 * @description: 
 * @param { beginPointX: number, beginPointY: number, radius: number, startAngle: number, endAngle: number, backImage: Object }
  */
  const drawRoundImage = (beginPointX,beginPointY,radius,startAngle,endAngle,backImage) =>{
  const ctx = canvasOptions.ctx
  if (!ctx) return;
    let temp = Math.min(backImage.width,backImage.height); 
    let scale = radius / temp;
    ctx.beginPath();
    ctx.rect(
      beginPointX-backImage.width*scale, 
      beginPointX-backImage.height*scale, 
      beginPointX+radius, 
      beginPointY+backImage.height*scale
    );
    // ctx.stroke();
    ctx.fill()
    ctx.drawImage(backImage, beginPointX-backImage.width*scale/2, beginPointY-backImage.height*scale/2,backImage.width*scale,backImage.height*scale);
}



/** 
 * @description 绘制圆弧
 * @param {beginPointX: number, beginPointY: number, radius: number, startAngle: number, endAngle: number, backgroundColor: string, item: Object}
**/
const drawArc = (beginPointX: number, beginPointY: number, radius: number, startAngle: number, endAngle: number, backgroundColor: string, item: Object) => {
  const ctx = canvasOptions.ctx;
  if (!ctx) return;
  const centerX = 300;
  const centerY = 300;
  const orbitRadius = 200;
  ctx.beginPath();
  ctx.arc(beginPointX, beginPointY, radius, startAngle, endAngle);
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = 'white'
  } else {
    ctx.fillStyle = 'rgba(0,0,0,0)';
  }
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(300, 300);
  const startX = centerX + orbitRadius * Math.cos(startAngle);
  const startY = centerY + orbitRadius * Math.sin(startAngle);
  const endX = centerX + orbitRadius * Math.cos(endAngle);
  const endY = centerY + orbitRadius * Math.sin(endAngle);
  ctx.lineTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.closePath();
  ctx.fillStyle = backgroundColor;
  ctx.strokeStyle = backgroundColor;
  ctx.stroke();
  ctx.fill();
  ctx.save();
  ctx.translate((startX + endX) / 2, (startY + endY) / 2);
  let angle = 0;
  let index = ballOptions.findIndex(ite => ite.label === ite.label);
  if (index !== ballOptions.length - 1) {
    angle = (startAngle + endAngle) / 2  + Math.PI / 2;
  } else {
    angle = (startAngle + endAngle) / 2 - Math.PI / 2;
  }
  /* 旋转画布 */
  ctx.rotate(angle);
  ctx.font = '24px Arial bold';
  ctx.fillStyle = '#AA625B'
  ctx.textAlign = 'center';
  ctx.fillText(item.label, 0, 0);
  ctx.restore();

  // if ('backImage' in item) {
  //   let img = new Image();
  //   img.src = item.backImage;
  //   img.onload = () => {
  //     ctx.save();
  //     ctx.translate(((startX+endX)/2+300)/2, ((startY+endY)/2+300)/2);
  //     let angle = 0;
  //     let index = ballOptions.findIndex(ite =>ite.label == item.label);
  //     if(index != ballOptions.length-1){
  //       angle = (startAngle + endAngle) / 2 + Math.PI/2;
  //     }else{
  //       angle = (startAngle + endAngle) / 2 - Math.PI/2;
  //     }
  //     ctx.rotate(angle);
  //     drawRoundImage(0,0,60,0,Math.PI*2,img)
  //     ctx.restore();
  //   }
  // }
}


/** 
 * @description: 绘制指针
 * @param color: string,
**/

const drawMark = (color: string) => {
  const ctx = canvasOptions.ctx;
  if (!ctx) return;
  ctx.beginPath();
  const centerX = 300;
  const centerY = 300;
  const orbitRadius = 40;
  const startX = centerX + orbitRadius * Math.cos(Math.PI / 3 + Math.PI);
  const startY = centerY - orbitRadius * Math.sin(Math.PI / 3);
  const endX = centerX + orbitRadius * Math.cos(Math.PI / 3 );
  const endY = centerY - orbitRadius * Math.sin(Math.PI / 3);
  const tempX = (startX + endX) /2;
  const tempY = (startY + endY) /2;
  const targetX  = tempX * 2 - 300;
  const targetY = tempY * 2 - 300;
  ctx.moveTo(startX, startY);
  ctx.lineTo(targetX, targetY);
  ctx.lineTo(endX, endY);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('开始', 300, 308);
};

const animate = async () => {
  if (backImageOption.type === 'image') {
    /* 绘制圆盘土图片背景 */
    const img = new Image();
    img.src = backImageOption.backGroud;
    
    // 设置层级
    img.onload = async () => {
      // await drawRoundImage(300, 300, 480, 0, 2 * Math.PI, img);
      /* 计算角度分配 */
      for (const [index,item] of ballOptions.entries()) {
        let startAngle = 0;
        let endAngle = 0;
        if (index) {
          startAngle = 2 * Math.PI * (index / ballOptions.length);
        }
        if (index !== ballOptions.length - 1) {
          endAngle = 2 * Math.PI * ((index + 1) / ballOptions.length);
        }
        await drawArc(300, 300, 200, startAngle + angle.value, endAngle + angle.value, item.color, item);
      }
    }
  } else {
    /* 绘制基础圆盘 */
    drawBall(300, 300, 220, 0 ,Math.PI * 2, backImageOption.backGroud)
    for (const [index, item] of ballOptions.entries()) {
      let startAngle = 0;
      let endAngle = 0;
      if (index) {
        startAngle = 2 * Math.PI * (index / ballOptions.length);
      }
      if (index !== ballOptions.length - 1) {
        endAngle = 2 * Math.PI * ((index + 1) / ballOptions.length);
      }
      await drawArc(300,300,200,startAngle+angle.value,endAngle+angle.value,item.color,item)
    }
  }

  if (backBtnImage.type === 'image') {
    const img2 = new Image();
    img2.src = backBtnImage.backGroud;
    img2.onload = async () => {
      // await drawRoundImage(300, 300, 50, 0, 2 * Math.PI, img2);
    }
  } else {
    await drawBall(300, 300, 50, 0, Math.PI * 2, backBtnImage.backGroud);
    await drawBall(300,300, 40, 0, Math.PI * 2, backBtnImage.backGroundSecond);
    await drawMark(backBtnImage.pointerColor);
  }
  if (isAnimal.value) {
    speed.value += 0.0010;
    angle.value += speed.value;
    animateFlag.value = requestAnimationFrame(animate);
  }
  if (speed.value > 0.32) {
    stopAnimate();
  }
}

/** 
 * @description: 开始按钮点击事件
 * 
**/
const eventOfCanvas = () => {
  const canvas = canvasOptions.canvas;
  if (!canvas) return;
  canvas.addEventListener('click', event => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (
      x >= 260 && 
      x <= 340 && 
      y >= 260 && 
      y <= 340
    ) {
      startAnimate();
    }
  });
}

/**  
 * @description: 开始抽奖动画
**/
const startAnimate = () => {
  isAnimal.value = true;
  animate()
  speed.value = 0.1;
}

/** 
 * @description: 停止抽奖动画
  */
  const stopAnimate = () => {
    console.log('停止抽奖动画')
    if (mustIndex.value) {
      if (!startAngle.value) {
        mustIndex.value = ballOptions.length - mustIndex.value - 2;
      }
      startAngle.value = ((mustIndex.value) * Math.PI * 2) / ballOptions.length;
      endAngle.value = ((mustIndex.value + 1) * Math.PI * 2) / ballOptions.length;
      let startAngleTemp = startAngle.value;
      let endAngleTemp = endAngle.value;
      let stopAngle = (startAngleTemp + endAngleTemp) / 2;
      let baseAngel = angle.value % (2 * Math.PI);
      // downSpeed.value = stopAngle - baseAngel;
      subSpeed();
    } else {
      subSpeed();
    }
  }

/** 
 * @description: 减速动画
**/
const subSpeed = () => {
  speed.value -= downSpeed.value;
  if (mustIndex.value) {
    if (!(angle.value % (2 * Math.PI) > startAngle.value && angle.value % (2 * Math.PI) < endAngle.value)) {
      speedFlag.value = requestAnimationFrame(subSpeed);
    } else if (speed.value < 0) {
      cancelAnimationFrame(animateFlag.value);
      cancelAnimationFrame(speedFlag.value);
    } else {
      cancelAnimationFrame(animateFlag.value);
      cancelAnimationFrame(speedFlag.value);
    }
  } else {
    if (speed.value < 0) {
      cancelAnimationFrame(animateFlag.value);
      cancelAnimationFrame(speedFlag.value);
    } else {
      speedFlag.value = requestAnimationFrame(subSpeed);
    }
  }
}

</script>

<template>
  <div :class="bem.b()">
    <canvas id="canvas" width="600" height="600"></canvas>
  </div>
</template>

<style lang='scss' scoped>
</style>