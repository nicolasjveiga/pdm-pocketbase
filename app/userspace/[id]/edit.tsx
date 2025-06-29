// app/[id]/edit.tsx
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useTokenContext } from "../../../src/contexts/userContext";
import { api } from "../../../src/services/api";
import { Car } from "../../../src/types/Car";

export default function EditCar() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token } = useTokenContext();

  const [car, setCar] = useState<Car | null>(null);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [hp, setHp] = useState("");

  useEffect(() => {
    api.get<Car>(`/api/collections/cars/records/${id}`, {
      headers: { Authorization: token },
    })
    .then(res => {
      setCar(res.data);
      setBrand(res.data.brand);
      setModel(res.data.model);
      setHp(String(res.data.hp));
    })
    .catch(err => Alert.alert("Erro ao carregar", err.message));
  }, [id]);

  const handleSave = async () => {
    try {
      await api.patch<Car>(
        `/api/collections/cars/records/${id}`,
        { brand, model, hp: parseInt(hp) },
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

  if (!car) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Car #{id}</Text>
      <TextInput style={styles.input} value={brand} onChangeText={setBrand} placeholder="Brand" />
      <TextInput style={styles.input} value={model} onChangeText={setModel} placeholder="Model" />
      <TextInput
        style={styles.input}
        value={hp}
        onChangeText={t => setHp(t.replace(/[^0-9]/g, ""))}
        placeholder="HP"
        keyboardType="number-pad"
      />
      <Button title="Salvar" onPress={handleSave} />
      <View style={{ height: 8 }} />
      <Button title="Deletar" color="red" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12, borderRadius: 4
  },
});
