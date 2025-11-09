import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Card, Button } from "antd";
import Profile from "../Asset/profile.png";
import { motion } from "framer-motion";

const { Meta } = Card;

const HomePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-6">
      <h1 className="text-3xl font-bold mb-2">
        <motion.div
          whileHover={{
            rotate: [0, -5, 5, -3, 3, 0],
            transition: { duration: 0.4 },
          }}
          initial={{ filter: "blur(12px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I’m Sanjay 👋
        </motion.div>
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        <motion.div
          whileHover={{
            color: "#4f46e5",
            scale: 1.1,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frontend Developer | Building responsive web apps with React & Angular
        </motion.div>
      </p>

      <Card
        style={{ width: 320 }}
        // cover={<img alt="profile" src={Profile} />}
        cover={
          <motion.img
            alt="profile"
            src={Profile}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.4 }}
          />
        }
        actions={[
          <motion.div
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              type="link"
              href="https://github.com/Sanjay053?tab=repositories"
              target="_blank"
              icon={
                <GithubOutlined
                  style={{ fontSize: "20px", color: "#0A66C2" }}
                />
              }
            />
          </motion.div>,

          <motion.div
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              type="link"
              href="https://www.linkedin.com/in/sanjayrajan053"
              target="_blank"
              icon={
                <LinkedinOutlined
                  style={{ fontSize: "20px", color: "#0A66C2" }}
                />
              }
            />
          </motion.div>,

          <motion.div
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              type="link"
              href="mailto:sanjayrajan053@gmail.com"
              icon={
                <MailOutlined style={{ fontSize: "20px", color: "#0A66C2" }} />
              }
            />
          </motion.div>,
        ]}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          <Meta title="Sanjay" description="UI Developer" />
        </motion.div>
      </Card>
    </div>
  );
};

export default HomePage;
