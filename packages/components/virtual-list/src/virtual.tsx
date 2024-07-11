import { createNamespace } from "@commonUI/utils/create";
import { defineComponent, onMounted, ref, reactive, computed, watch } from "vue";


export default defineComponent({
  name: 'ZVirtualList',
  props: {
    size: {
      type: Number,
      default: 35,
    },
    remain: {
      type: Number,
      default: 8,
    },
    items: {
      type: Array,
      default: () => [],
    }
  },
  setup(props, {slots}) {
    const bem = createNamespace('vl');
    const wrapperRef = ref<HTMLElement>();
    const barRef = ref<HTMLDivElement>();

    
    const initWrapper = () => {
      wrapperRef.value!.style.height = `${props.size * props.remain}px`;
      barRef.value!.style.height = `${props.size * props.items.length}px`;
    }


    watch(
      () => props.items, 
      initWrapper
    )

    onMounted(() => {
      initWrapper()
    })
    
    const state = reactive({
      start: 0,
      end: props.remain,

    });

    const prev = computed(() => {
      return Math.min(state.start, props.remain);
    });

    const next = computed(() => {
      return Math.min(props.remain, props.items.length - state.end);
    });

    const visibleData = computed(() => {
      return props.items.slice(state.start - prev.value, state.end + next.value)
    });
    const offset = ref(0);
    const handleScroll = (e: Event) => {
      const scroolTop = wrapperRef.value!.scrollTop;
      state.start = Math.floor(scroolTop / props.size);
      state.end = state.start + props.remain;
      offset.value = state.start * props.size - prev.value * props.size;
    };


    return () => {
      return (
      <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
        <div class={bem.e('scroll-bar')} ref={barRef}></div>
        <div class={bem.e('scroll-list')} style={{ transform: `translate3d(0,${offset.value}px,0)` }}>
          {
            visibleData.value.map((node, idx) => slots.default!({ node }))
          }

        </div>
      </div>
      )
    }
  }
});