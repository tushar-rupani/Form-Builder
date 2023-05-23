import React from "react";
import Header from "../components/Header/Header";
import { FinalObjectType } from "../Main/Main";
import { Button } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Home: React.FC = () => {
  let data = localStorage.getItem("form-data") || "[]";
  let parsedData: FinalObjectType[] | [] = JSON.parse(data);
  return (
    <div>
      <Header>
        <div>
          <table style={{ width: "98%", margin: "10px" }}>
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
                    <Link to={`/form/${data.id}`}>
                      <Button className="zero">
                        <EyeOutlined />
                      </Button>
                    </Link>
                    &nbsp;
                    <Button className="zero">
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
