import type { CSSProperties } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme, Progress } from "antd";
import { green } from '@ant-design/colors';
import skillsData from "../Mocks/skillsData";

const { Panel } = Collapse;

const SkillsPage = () => {
  const { token } = theme.useToken();

  const panelStyle: CSSProperties = {
    marginBottom: 24,
    background: "#f8f9fa",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-200 p-6">
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorWhite }}
      >
        {skillsData.map((section) => (
          <Panel header={section.title} key={section.key} style={panelStyle}>
            {section.subSections ? (
              <Collapse
                bordered={false}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                style={{background: token.colorBgElevated}}
              >
                {section.subSections.map((sub) => (
                  <Panel header={sub.title} key={sub.key}>
                    {sub.skills.map((skill) => (
                      <div key={skill.name} className="mb-2">
                        <p className="font-medium">{skill.name}</p>
                        <Progress percent={skill.level} steps={10} status="active" strokeColor={green[6]}/>
                      </div>
                    ))}
                  </Panel>
                ))}
              </Collapse>
            ) : section.skills ? (
              // Single-level skills (no subsections)
              section.skills.map((skill) => (
                <div key={skill.name} className="mb-2">
                  <p className="font-medium">{skill.name}</p>
                  <Progress percent={skill.level} steps={10} status="active"  strokeColor={green[6]}/>
                </div>
              ))
            ) : Array.isArray(section.content) ? (
              <ul className="list-disc ml-6">
                {section.content.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              section.content && <p>{section.content}</p>
            )}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default SkillsPage;
