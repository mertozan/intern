import { Box, Button, Divider, Text, useToast } from "@chakra-ui/react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import api from "../../api";

function Card({ submission, fetchSubmissions, showMenu = true }) {
  const [isHovering, setIsHovering] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const toast = useToast();
  const { form, status } = submission;

  const handleDelete = () => {
    api.delete("/submissions/" + submission.id).then(() => {
      toast({
        title: "Form silindi.",
      });
      fetchSubmissions();
    });
  };

  const handleApprove = () => {
    api
      .put("/submissions/" + submission.id, {
        status: 1,
      })
      .then(() => {
        toast({
          title: "Form onaylandı.",
        });
        fetchSubmissions();
      });
  };

  const handleReject = () => {
    api
      .put("/submissions/" + submission.id, {
        status: 2,
      })
      .then(() => {
        toast({
          title: "Form reddedildi.",
        });
        fetchSubmissions();
      });
  };

  return (
    <>
      <Box
        cursor={"pointer"}
        display="flex"
        minWidth={"576px"}
        minHeight={"181px"}
        boxShadow={"md"}
        gap={20}
        p={5}
        borderRadius="lg"
        border={"2px solid"}
        borderColor={status === 1 ? "green.300" : status === 2 ? "red.300" : "gray.300"}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        background={isHovering ? "gray.50" : "white"}
        onClick={() => setOpenModal(true)}
        position="relative"
      >
        <div className={"dark"}>
          <Text>Öğrenci</Text>
          <Divider my="2" />
          <Text>
            Adı soyadı: <span style={{ fontWeight: "bold" }}>{form.student_name}</span>
          </Text>
          <Text>
            Öğrenci no: <span style={{ fontWeight: "bold" }}>{form.student_number}</span>
          </Text>
          <Text>
            Sınıfı: <span style={{ fontWeight: "bold" }}>{form.student_class}</span>
          </Text>
        </div>

        <div style={{minWidth:"155.55px"}}>
          <Text>Firma</Text>
          <Divider my="2" />
          <Text>Firma adı: {form.company_name}</Text>
          <Text>Yetkili kişi: {form.employer_name}</Text>
          <Text>Firma Adresi: {form.company_address}</Text>
        </div>

        {showMenu && (
          <Menu>
            <MenuButton onClick={(e) => e.stopPropagation()} as={Button}>
              <HamburgerIcon />
            </MenuButton>
            <MenuList onClick={(e) => e.stopPropagation()}>
              <MenuItem onClick={handleDelete}>Sil</MenuItem>
              <MenuItem onClick={handleApprove}>Onayla</MenuItem>
              <MenuItem onClick={handleReject}>Ret</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
      {/* kartın üzerine tıklandığında modal açılır */}
      <Modal blockScrollOnMount={false} isCentered isOpen={openModal} onClose={() => setOpenModal(false)}> 
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detay</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box fontWeight={"bold"}>Öğrenci:</Box>
            <Text>
              Adi soyadı: <span style={{ fontWeight: "bold" }}>{form.student_name}</span>
            </Text>
            <Text>
              Öğrenci no: <span style={{ fontWeight: "bold" }}>{form.student_number}</span>
            </Text>
            <Text>
              Sınıfı: <span style={{ fontWeight: "bold" }}>{form.student_class}</span>
            </Text>
            <Text>
              Eposta: <span style={{ fontWeight: "bold" }}>{form.student_email}</span>
            </Text>
            <Text>
              Tel no: <span style={{ fontWeight: "bold" }}>{form.student_phone}</span>
            </Text>
            <Text>
              Staj yapılacak alan: <span style={{ fontWeight: "bold" }}>{form.student_class}</span>
            </Text>

            <Divider my="2" />
            <Box fontWeight={"bold"}>Firma:</Box>
            <Text>
              Firma adı: <span style={{ fontWeight: "bold" }}>{form.company_name}</span>
            </Text>
            <Text>
              Firma adresi: <span style={{ fontWeight: "bold" }}>{form.company_address}</span>
            </Text>
            <Text>
              Hizmet alanı: <span style={{ fontWeight: "bold" }}>{form.company_area}</span>
            </Text>
            <Text>
              Telefon: <span style={{ fontWeight: "bold" }}>{form.company_phone}</span>
            </Text>
            <Text>
              Email: <span style={{ fontWeight: "bold" }}>{form.company_email}</span>
            </Text>
            <Text>
              Websitesi: <span style={{ fontWeight: "bold" }}>{form.company_website}</span>
            </Text>
            <Text>
              Faks: <span style={{ fontWeight: "bold" }}>{form.company_faks}</span>
            </Text>
            <Text>
              Staja başlangıç: <span style={{ fontWeight: "bold" }}>{form.company_start_date}</span>
            </Text>
            <Text>
              Staj bitiş: <span style={{ fontWeight: "bold" }}>{form.company_finish_date}</span>
            </Text>
            <Text>
              Süresi: <span style={{ fontWeight: "bold" }}>{form.company_total_week}</span>
            </Text>

            <Divider my="2" />

            <Box fontWeight={"bold"}>İş veren veya Yetkilinin bilgileri:</Box>
            <Text>
              Adi soyadı: <span style={{ fontWeight: "bold" }}>{form.employer_name}</span>
            </Text>
            <Text>
              Görev: <span style={{ fontWeight: "bold" }}>{form.employer_position}</span>
            </Text>
            <Text>
              SGK no: <span style={{ fontWeight: "bold" }}>{form.employer_sgk_no}</span>
            </Text>
            <Text>
              Email: <span style={{ fontWeight: "bold" }}>{form.employer_email}</span>
            </Text>
            <Text>
              Tarih: <span style={{ fontWeight: "bold" }}>{form.employer_date}</span>
            </Text>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Card;
