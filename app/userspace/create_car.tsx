import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import { api } from "../../src/services/api";
import { Car } from "../../src/types/Car";
import { CarForm } from "../../src/components/CarForm";

export default function CreateCar() {
  const router = useRouter();
  const { token } = useTokenContext();

  const handleCreate = async (data: { brand: string; model: string; hp: number }) => {
    try {
      const res = await api.post<Car>(
        "/api/collections/cars/records",
        data,
        {
          headers: {
            Authorization: token,
            "content-type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        Alert.alert("Criado com sucesso!", res.data.model);
        router.replace("/userspace");
      } else {
        Alert.alert("Erro", "Erro ao criar carro");
      }
    } catch (err: any) {
      Alert.alert("Erro", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Novo Carro</Text>
      <CarForm submitLabel="Cadastrar Carro" onSubmit={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
});
