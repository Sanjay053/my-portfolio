import { Card, Typography } from "antd";
import { timelineData } from "../data/timelineData";
import { Box, VStack, Heading } from "@chakra-ui/react";
import { TimelineItem } from "../Components/TimelineItem";
const { Paragraph } = Typography;

const WorkPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-violet-100 to-indigo-200 p-6">
          <Card
            title="Hi, I’m Sanjay 👋 — a passionate Frontend Developer"
            variant="borderless"
            style={{ margin: "40px 50px" }}
          >
            <Paragraph>
              I’m a frontend developer who loves building modern, responsive, and
              user-friendly web applications. With strong expertise in React,
              Angular, and UI design, I aim to create digital experiences that are
              simple yet impactful.
            </Paragraph>
          </Card>
    
           {/* TIMELINE */}
          <Box mt={10} mx="auto" maxW="760px">
            <Heading size="md" mb={5}>
              My Journey
            </Heading>
    
            <VStack align="stretch">
              {timelineData.map((item, index) => (
                <Box key={index}>
                  <TimelineItem item={item} />
                </Box>
              ))}
            </VStack>
          </Box>
        </div>
      );
}

export default WorkPage;