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




onMounted(() => {
  
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


    <z-card style="max-width: 480px;">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      <template #footer>Footer content</template>
    </z-card>
    <z-loading loading></z-loading>

 <!--    <z-table :data="tableData" style="width: 100%;" :border="false" height="300" :multiple="false">
      <z-table-column prop="date"  width="180"  label="Date" :sort="true"/>
      <z-table-column prop="name" label="Name" width="150" />
      <z-table-column prop="address" label="Address" :sort="true"/>
    </z-table> -->
  </div>

</template>

<style scoped lang="scss"> 
.app {
  width: 100%;
  height: 100vh;

}
</style>
