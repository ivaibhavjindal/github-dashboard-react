import { Input } from "antd";
const { Search } = Input;

export default function ({ onSearch }) {
  return (
    <Search
      placeholder="Enter Github username"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
  );
}
