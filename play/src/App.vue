<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { onMounted, ref, watch} from 'vue'



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
    date: '2016-05-07',
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
        <template #test="props">
          <div class="expand-row">
            <p>测试</p>
          </div>
        </template>
      </z-table-column>
      <z-table-column prop="date" label="Date" width="150" sortable></z-table-column>
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
