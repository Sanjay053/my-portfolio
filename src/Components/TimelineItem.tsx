import { Text, VStack, Badge, Icon, HStack } from "@chakra-ui/react";
import { MdWork, MdSchool, MdVerified } from "react-icons/md";

import { TimelineItemType } from "../data/timelineData";

export const TimelineItem = ({ item }: { item: TimelineItemType }) => {
  const icon =
    item.section === "Work Experience"
      ? MdWork
      : item.section === "Education"
      ? MdSchool
      : item.section === "Certifications"
      ? MdVerified
      : MdWork;

  return (
    <HStack align="flex-start" gap={4} w="100%">
      {/* Left icon */}
      <Icon as={icon as React.ElementType} boxSize={6} color="purple.500" mt={1} />

      {/* Text Content */}
      <VStack align="flex-start" gap={1} flex={1}>
        {item.section && (
          <Badge colorScheme="purple" mb={1}>
            {item.section}
          </Badge>
        )}

        {item.project && (
          <Text fontWeight="bold" fontSize="lg">
            {item.project}
          </Text>
        )}

        {item.company && (
          <Text fontWeight="medium" color="gray.600">
            {item.company}
          </Text>
        )}

        {item.duration && (
          <Text fontSize="sm" color="gray.500">
            {item.duration}
          </Text>
        )}

        {item.tech && (
          <Text fontSize="sm" color="gray.700">
            {item.tech.join(", ")}
          </Text>
        )}

        {item.description &&
          item.description.map((d) => (
            <Text key={d} fontSize="sm" color="gray.700">
              • {d}
            </Text>
          ))}

        {item.certifications && (
          <VStack gap={1} align="flex-start" mt={2}>
            {item.certifications.map((cert) => (
              <Text key={cert} fontSize="sm">
                ✅ {cert}
              </Text>
            ))}
          </VStack>
        )}

        {item.education && (
          <Text fontWeight="semibold" fontSize="lg">
            {item.education}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};
