import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from "react";

function NavBar({ setIsSticky }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const active = window.scrollY > 50;
      setSticky(active);
      setIsSticky(active);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsSticky]);

  return (
    <>
      <Box
        className={`navbar-custom ${sticky ? "sticky-nav" : ""}`}
        px={6}
        py={4}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <NavLink to="/" className="navbar-brand text-white">
            Home
          </NavLink>

          {/* Desktop Menu */}
          <HStack
            gap={8}
            display={{ base: "none", md: "flex" }}
            className="navbar-links"
          >
            <NavLink to="/work">Service</NavLink>
            <NavLink to="/skill">Skills</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </HStack>

          {/* Mobile Menu */}
          <IconButton
            aria-label="Open Menu"
            onClick={onOpen}
            display={{ base: "flex", md: "none" }}
            color="white"
            bg="transparent"
            _hover={{ bg: "gray.700" }}
            icon={<HamburgerIcon />}
          />
        </Flex>
      </Box>

      {/* ✅ Chakra v2 Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900" color="white">
          <DrawerCloseButton />

          <DrawerBody mt={20}>
            <VStack gap={6} align="flex-start">
              <NavLink to="/work" onClick={onClose}>
                Service
              </NavLink>
              <NavLink to="/skill" onClick={onClose}>
                Skills
              </NavLink>
              <NavLink to="/about" onClick={onClose}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={onClose}>
                Contact
              </NavLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NavBar;
