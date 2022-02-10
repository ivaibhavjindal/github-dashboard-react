import { Table } from "antd";
import { styles } from "./styles";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Stars",
    dataIndex: "stargazers_count",
    key: "name",
  },
  {
    title: "Watching",
    dataIndex: "watchers_count",
    key: "name",
  },
  {
    title: "Link",
    key: "html_url",
    dataIndex: "html_url",
    render: (url) => (
      <a href={url} target="_blank">
        {"Open"}
      </a>
    ),
  },
];

export default function ({ data }) {
  return <Table style={styles.table} columns={columns} dataSource={data} />;
}
