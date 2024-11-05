<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { onMounted, ref, watch, reactive} from 'vue'



/* timeAgo */
// const dict = {
//   justNow: '刚刚1',
//   minuteAgo: '1 分钟前1',
//   minutesAgo: '分钟前1',
//   hourAgo: '1 小时前1',
//   hoursAgo: '小时前1',
//   yesterday: '昨天',
//   daysAgo: '天前1',
//   lastWeek: '上周1',
//   weeksAgo: '周前1',
//   lastMonth: '上个月1',
//   monthsAgo: '个月前1',
//   lastYear: '去年1',
//   yearsAgo: '年前1'
// }

/* select */
const selectValue = ref<string[] | number[]>([]);
const options = ref([
  {
    value: 'Option1',
    label: 'Option1',
    disabled:true,
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
])
const changeOptions = (res:any) => {
  options.value = res
}
const useApi = async() => {

  try {
    const response = await fetch(`https://mock.presstime.cn/mock/66b9f2d18b18b22c21d33bf7/ui/select`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

/* tabale */
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    amount: 1353,
    amount1: 10,
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3651 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3652 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3653 21st St, San Fran-cisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3657 21st St, San Francisco',
    zip: 'CA 94114',
    amount: '2054',
    amount1: 15,
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3660 21st St, San Francis-co',
    zip: 'CA 94114',
    amount: 1333,
    amount1: 12,
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3150 21st St, San Francisco',
    zip: 'CA 94114',
    amount: 1253,
    amount1: '12.45',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3640 21st St, San Francisco',
    zip: 'CA 94114',
    amount: '4.35',
    amount1: 10,
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '31650 21st St, San Francisco',
    zip: 'CA 94114',
    amount: '2900',
    amount1: '9.85',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '2650 21st St, San Francisco',
    zip: 'CA 94114',
    amount: 1357,
    amount1: 12,
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
]

const userSort = () => {
  console.log('自定义排序')
}

 /* form */
const sizeForm = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const size  = ref('default');
const labelPosition = ref<string>('right');

/* roulette */
const rouletteData = ref([
  {
    label:"上班",
    color:"#812f33",
    backImage:"/download (1).png"
  },
  {
    label:"摸鱼1",
    color:"#90cbfb",
    backImage:"/download (2).png"
  },
  {
    label:"摸鱼2",
    color:"#a5aaa3",
    backImage:"/download (3).png"
  },
  {
    label:"摸鱼3",
    color:"#705e78",
    backImage:"/download (4).png"
  },
  {
    label:"摸鱼4",
    color:"#fea443",
    backImage:"/black.png"
  },
  {
    label:"摸鱼5",
    color:"#f3feb0",
    backImage:"/download (5).png"
  },
])

const backOption = reactive({
  type: 'image',
  backGroud: '../static/bg3.png'
})

const btnOption = reactive({
  type: 'image', // 默认btn / image
  backGroud: '../static/btn.png', // src | color
  backGroundSecond: 'white', // 指针背景颜色
  pointerColor: 'white', //指针颜色
})

const luckygridData = ref({
  blocks: [
    {padding: '10', background: '#869cfa'},
    {padding: '10', background: '#f7a35c'},
    {padding: '10', background: '#f56c6c'},
    {padding: '10', background: '#7266ba'}
  ],
  prizes: [
    { x: 0, y: 0, fonts: [{ text: '谢谢参与', top: '40%' }], },
    { x: 1, y: 0, fonts: [{ text: '小米手环', top: '40%' }], },
    { x: 2, y: 0, fonts: [{ text: '苹果13', top: '40%' }], },
    { x: 2, y: 1, imgsrc: '../static/bg3.png'},
    { x: 2, y: 2, fonts: [{ text: '优惠券100', top: '40%' }], },
    { x: 1, y: 2, fonts: [{ text: '迷你小冰箱', top: '40%' }], },
    { x: 0, y: 2, fonts: [{ text: '腾讯会员', top: '40%' }], },
    { x: 0, y: 1, fonts: [{ text: '优酷会员', top: '40%' }], },
  ],
  buttons: [
    {
      x: 1, y: 1,
      background: '#9c9dd8',
      fonts: [{ text: '抽奖', top: '40%' }],
    },
  ],
  style: {
    background: '#b8c5f2',
    fontSize: '14'
  },

})
</script>

<template>
  <div class="app">
    <z-select 
      v-model="selectValue" 
      :options="options"
      @update:options="changeOptions" 
      :multiple="true" 
      :multiple-limit="6"
      size="medium"
      :autoLoad="true"
      :api="useApi"
      :lazy="true"
      :clearable="true"
      > 
      <template #header>
        <div>
          自定义头部
        </div>
      </template>
      <template #footer>
        <div>
          自定义footer
        </div>
      </template>
    </z-select>


    <!-- <z-card style="max-width: 480px;">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      <template #footer>Footer content</template>
    </z-card> -->
    <!-- <z-loading loading></z-loading> -->


   
    <z-table :data="tableData" :border="true" height="400" summary>
      <z-table-column type="expand" width="50">
        <template>
          <div class="expand-row">
            <p>测试</p>
          </div>
        </template>
      </z-table-column>
      <z-table-column prop="date" label="Date" width="150" sortable 
        :filters="[
          { text: '2016-05-01', value: '2016-05-01' },
          { text: '2016-05-02', value: '2016-05-02' },
          { text: '2016-05-03', value: '2016-05-03' },
          { text: '2016-05-04', value: '2016-05-04' },
        ]"
      >
      </z-table-column>
      <z-table-column prop="name" label="name" width="150" ></z-table-column>
      <z-table-column prop="amount" label="Amount" width="100" sortable></z-table-column>
      <z-table-column prop="amount1" label="Amount1" width="100" sortable></z-table-column>
      <z-table-column prop="state" label="State" width="100"></z-table-column>
      <z-table-column label="City" prop="city" />
      <z-table-column label="Address" prop="address" sortable :sort-method="userSort"/>
      <z-table-column label="Zip" prop="zip" />
      <!-- <z-table-column prop="name" label="name1" width="150"/>
      <z-table-column prop="name" label="name2" width="350"/>
      <z-table-column prop="name" label="name3" width="350"/> -->
    </z-table>


    <hr>
    {{ size }} {{ labelPosition }}
    <button @click="size = 'large'">large</button>
    <button @click="size = 'default'">default</button>
    <button @click="size ='small'">small</button>

    <button @click="labelPosition = 'left'">left</button>
    <button @click="labelPosition = 'right'">right</button>
    <button @click="labelPosition = 'top'">top</button>
    <z-form  :model="sizeForm" :label-position="labelPosition" :size="size"  label-width="auto" :inline="false">
      <z-form-item label="Avtivity name" required>
        <input type="text" v-model="sizeForm.name">
      </z-form-item>

      <z-form-item label="Region"  
        :rules="[
          { required: true, message: 'age is required' },
          { type: 'number', message: 'age must be a number' },
        ]"
      >
        <input type="text" >
        <button>region</button>
      </z-form-item>

      <z-form-item label="Date">
        <input type="checkbox">checkbox</input>
      </z-form-item>
    </z-form>

    <z-roulette :data="rouletteData" :back-option="backOption" :btn-option="btnOption"></z-roulette>

    <z-luckygrid width="600" height="600" :data="luckygridData"></z-luckygrid>
  </div>

</template>

<style scoped lang="scss"> 
.app {
  width: 100%;
  height: 100vh;
}

.carousel-item{
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.carousel-item:nth-child(2n){
  background-color: #99a9bf;
}

.carousel-item:nth-child(2n + 1){
  background-color: #d3dce6;
}
</style>
