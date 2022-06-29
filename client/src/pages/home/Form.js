import React from "react";
import { Box, Button, Divider, Input, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import api from "../../api";
import { socket } from "../../socket";

function Form() {
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    api
      .post("/submissions", {
        data,
      })
      .then(() => {
        toast({
          title: "Form gönderildi.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        socket.emit("submission", data);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text mb="2">Öğrenci Bilgileri:</Text>
      <VStack spacing={4}>
        <Input {...register("student_name")} placeholder="Ad soyad" />
        <Input {...register("student_number")} placeholder="Öğrenci no" type="number" />
        <Input {...register("student_class")} placeholder="Sınıf" type="number" />
        <Input {...register("student_email")} placeholder="E-posta" type="email" />
        <Input {...register("student_phone")} placeholder="Telefon" type="tel" />
      </VStack>

      <Divider my="10" />

      <Text mb="2">Staj yapilacak kuruma ait bilgiler:</Text>
      <VStack spacing={4}>
        <Input {...register("company_name")} placeholder="Firma adi" />
        <Input {...register("company_address")} placeholder="Firma Adresi" type="" />
        <Input {...register("company_service")} placeholder="Hizmet Alani" />
        <Input {...register("company_phone")} placeholder="Firma Telefon no" />
        <Input {...register("company_email")} placeholder="Email" type="email" />
        <Input {...register("company_website")} placeholder="Web sitesi" />
        <Input {...register("company_faks")} placeholder="Faks no" />
        <Input {...register("company_start_date")} placeholder="Staja baslama tarihi" />
        <Input {...register("company_finish_date")} placeholder="Staj bitis tarihi" />
        <Input {...register("company_total_week")} placeholder="Suresi(hafta)" />
        <Input {...register("company_area")} placeholder="Staj yapilacak alan" />
      </VStack>

      <Divider my="10" />

      <Text mb="2">Is veren veya Yetkilinin bilgileri</Text>
      <VStack spacing={4}>
        <Input {...register("employer_name")} placeholder="Adi soyadi" />
        <Input {...register("employer_position")} placeholder="Gorevi" />
        <Input {...register("employer_email")} placeholder="Eposta" />
        <Input {...register("employer_date")} placeholder="Tarih" />
        <Input {...register("employer_sgk_no")} placeholder="Is veren sgk tescil no" />
      </VStack>

      <Divider my="10" />

      <Box display={"flex"} justifyContent="flex-end">
        <Button type="submit" colorScheme={"teal"}>
          Gonder
        </Button>
      </Box>
    </form>
  );
}

export default Form;
