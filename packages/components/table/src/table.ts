
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
  width: {
    type: String,
    default: '100%'
  }
}