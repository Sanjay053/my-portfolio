import React from "react";
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Button } from "antd";
import Profile from "../Asset/profile.png";

const { Meta } = Card;

const HomePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold mb-2">Hi, I’m Sanjay 👋</h1>
      <p className="text-lg text-gray-700 mb-6">
        Frontend Developer | Building responsive web apps with React & Angular
      </p>

      <Card
        style={{ width: 320 }}
        cover={<img alt="profile" src={Profile} />}
        actions={[
           <Button
            type="link"
            href="https://github.com/Sanjay053?tab=repositories"
            target="_blank"
            icon={
              <GithubOutlined
                style={{ fontSize: "20px", color: "#0A66C2" }}
              />
            }
          />,
          <Button
            type="link"
            href="https://www.linkedin.com/in/sanjayrajan053"
            target="_blank"
            icon={
              <LinkedinOutlined
                style={{ fontSize: "20px", color: "#0A66C2" }}
              />
            }
          />,
           <Button
            type="link"
            href="mailto:sanjayrajan053@gmail.com"
            icon={
              <MailOutlined
                style={{ fontSize: "20px", color: "#0A66C2" }}
              />
            }
          />
        ]}
      >
        <Meta
          avatar={<Avatar src={Profile} />}
          title="Sanjay"
          description="UI Developer"
        />
      </Card>
    </div>
  );
};

export default HomePage;
