import { Card } from "antd";
import { ClockCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Timeline, Typography } from "antd";

const { Title } = Typography;

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-violet-100 to-indigo-200 p-6">
      <Card
        title="Hi, I’m Sanjay 👋 — a passionate Frontend Developer"
        variant="borderless"
        style={{ margin: "40px 50px" }}
      >
        <p>
          I’m a frontend developer who loves building modern, responsive, and
          user-friendly web applications. With strong expertise in React,
          Angular, and UI design, I aim to create digital experiences that are
          simple yet impactful.
        </p>
      </Card>

      <Card
        title="My Journey"
        style={{ marginLeft: "40px", maxWidth: "700px" }}
      >
        <Timeline
          mode="alternate"
          style={{ paddingLeft: "20px", maxWidth: "700px", margin: "0 auto" }}
          items={[
            {
              label: <Title level={4}>Projects</Title>,
              dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
              children: (
                <div>
                  <strong>Cost Management (E-commerce App)</strong> <br />
                  React, GraphQL, Redux Toolkit, Tailwind <br />
                  <em>Sep 2025 – Present</em> <br />
                  <CaretRightOutlined /> Developed client-side features such as
                  product management and checkout flows.
                </div>
              ),
            },
            {
              color: "green",
              children: (
                <div>
                  <strong>Offer Management System</strong> <br />
                  Angular, Tailwind, RxJS, Ant Design, Playwright <br />
                  <em>Jul 2025 – Present</em> <br />
                  <CaretRightOutlined /> Built offer creation modules for
                  vendors and merchants with automated testing.
                </div>
              ),
            },
            {
              color: "green",
              dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
              children: (
                <div>
                  <strong>Unified Promotions Platform</strong> <br />
                  React, GraphQL, Redux Toolkit, Tailwind <br />
                  <em>Sep 2024 – Jun 2025</em> <br />
                  <CaretRightOutlined /> Designed promotion workflows at
                  division and national levels.
                </div>
              ),
            },
            {
              color: "green",
              children: (
                <div>
                  <strong>Canine (Pet Service Booking)</strong> <br />
                  React, Calendar Slot Booking <br />
                  <em>Jul 2023 – Jan 2024</em> <br />
                  <CaretRightOutlined /> Implemented slot-based booking system
                  for pet services.
                </div>
              ),
            },
            {
              color: "green",
              children: (
                <div>
                  <strong>Download Delight (Game Listing)</strong> <br />
                  Angular, Material, Bootstrap <br />
                  <em>Jan 2023 – Jun 2023</em> <br />
                  <CaretRightOutlined /> Created UI for browsing and managing
                  downloadable games.
                </div>
              ),
            },
            {
              color: "green",
              label: <Title level={4}>Certifications</Title>,
              dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
              children: (
                <ul style={{ margin: 0, paddingLeft: "16px" }}>
                  <li>
                    Responsive Web Design (JavaScript) — Sep 2022 – Dec 2022
                  </li>
                  <li>
                    Algorithms & Data Structures / ANN (IBM) — Mar 2022 - Aug
                    2022
                  </li>
                  <li>
                    Machine Learning for Real World Applications (TCS iON) — Oct
                    2021 - Feb 2022
                  </li>
                </ul>
              ),
            },
            {
              label: <Title level={4}>Education</Title>,
              color: "green",
              children: (
                <div>
                  <strong>B.E. Computer Science</strong> <br />
                  Aug 2019 – Mar 2023
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default AboutPage;
