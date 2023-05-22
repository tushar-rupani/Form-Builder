import React from "react";
import Header from "../components/Header/Header";
import { FinalObjectType } from "../Main/Main";
import { Button } from "antd";
import { EditOutlined, FolderViewOutlined } from "@ant-design/icons";
const Home: React.FC = () => {
  let data = localStorage.getItem("form-data") || "";
  let parsedData: FinalObjectType[] | [] = JSON.parse(data);
  return (
    <div>
      <Header>
        <div>
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parsedData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.form_name}</td>
                  <td>
                    <Button>
                      <FolderViewOutlined />
                    </Button>
                    &nbsp;
                    <Button>
                      <EditOutlined />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Header>
    </div>
  );
};

export default Home;
