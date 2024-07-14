import { h, defineComponent } from 'vue';

export default defineComponent({
  name: 'Loading',
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        class="loading"
      >
        <path
          d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.1C13.5 544.2 0 477.1 0 408c0-69.1 13.5-136.2 40.2-199.3C176 251.7 213 197 260 150c47-47 101.7-84 162.1-109.8C477.1 13.5 544.2 0 613.3 0c69.1 0 136.2 13.5 199.3 40.2C874"
          fill="currentColor"
        ></path>

      </svg>
    )
  }
});