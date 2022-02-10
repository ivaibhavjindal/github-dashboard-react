import { Layout } from "antd";
import { styles } from "./styles";

const { Header } = Layout;

export default function () {
  return <Header style={styles.header}>{"Github Dashboard"}</Header>;
}
