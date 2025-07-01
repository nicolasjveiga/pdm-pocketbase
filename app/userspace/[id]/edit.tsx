import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { useTokenContext } from "../../../src/contexts/userContext";
import { api } from "../../../src/services/api";
import { Car } from "../../../src/types/Car";
import { CarForm } from "../../../src/components/CarForm";

export default function EditCar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token } = useTokenContext();

  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    api
      .get<Car>(`/api/collections/cars/records/${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => setCar(res.data))
      .catch((err) => Alert.alert("Erro ao carregar", err.message));
  }, [id]);

  const handleSave = async (data: { brand: string; model: string; hp: number }) => {
    try {
      await api.patch<Car>(
        `/api/collections/cars/records/${id}`,
        data,
        { headers: { Authorization: token } }
      );
      Alert.alert("Atualizado!");
      router.replace("/userspace");
    } catch (err: any) {
      Alert.alert("Erro ao salvar", err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/collections/cars/records/${id}`, {
        headers: { Authorization: token },
      });
      Alert.alert("Deletado!");
      router.replace("/userspace");
    } catch (err: any) {
      Alert.alert("Erro ao deletar", err.message);
    }
  };

  if (!car) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar o Carro: {car.brand} {car.model}</Text>
      <CarForm
        initialData={{
          brand: car.brand,
          model: car.model,
          hp: car.hp,
        }}
        showDeleteButton={true}
        submitLabel="Salvar Alterações"
        onSubmit={handleSave}
        onDelete={handleDelete}
      />
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
  loading: {
    flex: 1,
    textAlign: "center",
    marginTop: 48,
    fontSize: 16,
  },
});
