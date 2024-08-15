
interface TableData {
  label: string;
  value: string;
}
export const tableProps = {
  data: {
    type: Array,
    default: () => [],
    required: true
  },
  border: {
    boolean: true,
    default: false
  },
  height: {
    type: String,
  }
}