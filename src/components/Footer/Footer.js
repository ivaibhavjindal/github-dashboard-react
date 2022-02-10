import { Layout } from "antd";
import { styles } from "./styles";

const { Footer } = Layout;

export default function () {
  return (
    <Footer style={styles.footer}>
      {`Github Dashboard © ${new Date().getFullYear()}`}
    </Footer>
  );
}
