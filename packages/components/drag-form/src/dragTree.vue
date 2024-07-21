<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { VueDraggable } from 'vue-draggable-plus'
import { ref, computed, } from 'vue';
import { nodesType, leftTreeProps, leftTreeEmits } from './dragForm'
import dragTree from './dragTree.vue';
import Switcher from '../../internal-icon/Switcher';

const bem = createNamespace('drag-tree');
const props = defineProps(leftTreeProps);
const emit = defineEmits(leftTreeEmits);
defineOptions({
  name:'z-drag-tree',
})
const list = computed({
  get() {
    return props.nodes;
  },
  set(val:any) {
    emit('updateLeftTree', val)
  }
})


const collapse = ref(false);

/**
 * @description: 生成uuid
 * @return {string} - uuid
**/
const createUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x'? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/** 
 * @description: 深拷贝
 * @param {any} origin - 原始数据
 * @map {any} Map - 用于存储循环引用的对象
 * @return {any} - 深拷贝后的新数据
 */
const deepClone = (origin: any, map = new WeakMap()) => {
  /* 返回null */
  if (origin === null) return origin;
  /* 返回日期类型 */
  if (origin instanceof Date) return new Date(origin);
  /* 返回RegExp类型 */
  if (origin instanceof RegExp) return new RegExp(origin);
  /* 返回函数类型 */
  if (typeof origin === 'function') return origin;
  /* 返回基本类型 */
  if (typeof origin !== 'object') return origin;
  /* 解决循环引用 */
  if (map.has(origin)) return map.get(origin);
  /* 新建origins的副本 */
  let clone = new (origin.constructor)();
  /* 存储循环引用 */
  map.set(origin, clone);
  /* 遍历origin的属性 */
  for (let key in origin) {
    if (origin.hasOwnProperty(key)) {
      /* 递归处理 */
      if (key === 'id') {
        /* 拖拽时，生成新的id */
        clone[key] = createUuid();
      } else {
        /* 递归处理 */
        clone[key] = deepClone(origin[key], map);
      }
    }
  }
}
/** 
 * @description: 选中Node，添加至panel
 * @param {nodesType} node - 节点数据
 * @return {void}
 */
const chooseNode = (node: nodesType) => {
  /* 等待补充 */
  console.log(node);
}




/**
 * @description 触发添加节点事件
 */

 const addSchema = (node: nodesType) => {
   emit('addSchema', node);
 }




</script>

<template>
  <div :class=[bem.b()]>
    <div :class="[bem.e('content-tree')]">
      <VueDraggable 
        v-model="list" 
        :group="{name: 'dragableGroup', pull: 'clone', put: false}"  
        :animation="150" 
        :clone="deepClone"
        >
        <div v-for="(node, index) in nodes" :key="node.id" >
          <div :class="[bem.e('item')]">
            <slot :node='node'>
              <div v-if="node.level === 1" :class="bem.e('first-level')">
                <span>{{node.label}}</span>
                <z-icon
                  v-if="node.children && node.children.length > 0"
                  :class="[bem.e('collapse-icon'),{collapse: node.collapse}]"
                  @click="node.collapse = !node.collapse"
                >
                  <Switcher />
                </z-icon>
              <span @click="addSchema(node)">+</span>
              </div>
              <div v-else-if="node.level === 2" :class="bem.e('second-level')"  @click="chooseNode(node)">
                <span>{{node.label}}</span>
              </div>
            </slot>
          </div>
          <dragTree  v-show="node.collapse" v-model:nodes="node.children">
            <template #default="{node}">
              <slot :node='node'></slot>
            </template>
          </dragTree>
        </div>
      </VueDraggable>
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>