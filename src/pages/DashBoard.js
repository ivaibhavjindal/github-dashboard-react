import { useState } from "react";
import { Layout, Row, Col, notification } from "antd";
import Search from "../components/Search/Search";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Table from "../components/Table/Table";
import axios from "axios";
const { Content } = Layout;

const baseUrl = "https://api.github.com/users";

const openNotification = (type) => {
  const args = {
    message: "Error",
    description: "User not found",
  };
  notification[type](args);
};

const extractData = (data) => {
  const tableData = [];
  data.map(({ name, stargazers_count, watchers_count, html_url }) => {
    tableData.push({
      name,
      stargazers_count,
      watchers_count,
      html_url,
    });
  });
  return tableData;
};

export default function () {
  const [userData, setUserData] = useState([]);
  const [starData, setStarData] = useState([]);

  async function onSearch(username) {
    if (username) {
      try {
        const userRes = await axios.get(`${baseUrl}/${username}/repos`);
        if (userRes) {
          if (userRes.message && userRes.message === "Not Found") {
            setUserData([]);
            openNotification("error");
          }

          let data = extractData(userRes.data);
          setUserData(data);

          const starRes = await axios.get(`${baseUrl}/${username}/starred`);
          if (starRes) {
            setStarData(extractData(starRes.data));
          } else {
            setStarData([]);
          }
        } else {
          setUserData([]);
          setStarData([]);
          openNotification("error");
        }
      } catch (e) {
        openNotification("error");
        setUserData([]);
        setStarData([]);
      }
    }
  }

  return (
    <Layout>
      <Header />
      <Content
        style={{ padding: "2rem 1rem", minHeight: "calc(100vh - 128px)" }}
      >
        <Row>
          <Col
            xs={{ span: 20, offset: 2 }}
            md={{ span: 12, offset: 6 }}
            lg={{ span: 8, offset: 8 }}
          >
            <Search onSearch={onSearch} />
          </Col>
        </Row>
        {userData && userData.length ? (
          <>
            <h1> {"Public Repositories"} </h1>
            <Table data={userData} />
          </>
        ) : (
          ""
        )}

        {starData && starData.length ? (
          <>
            <h1> {"Starred Repositories"} </h1>
            <Table data={starData} />
          </>
        ) : (
          ""
        )}
      </Content>
      <Footer />
    </Layout>
  );
}
