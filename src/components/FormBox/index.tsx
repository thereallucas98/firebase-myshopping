import React, { useState } from "react";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";

export function FormBox() {
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);

  async function handleAddProduct() {
    firestore()
      .collection("products")
      .add({
        description: productDescription,
        quantity: productQuantity,
        done: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Produto Adicionado com sucesso");
        setProductDescription("");
        setProductQuantity(0);
      }).catch((error) => {
        Alert.alert("Ocorreu um problema no cadastro do produto");
        console.log(error);
      })
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setProductDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={(value) => setProductQuantity(Number(value))}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleAddProduct}
      />
    </Container>
  );
}
