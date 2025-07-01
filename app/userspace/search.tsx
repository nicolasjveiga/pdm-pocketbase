import { useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import { api } from "../../src/services/api";
import { Car } from "../../src/types/Car";
import { useTokenContext } from "../../src/contexts/userContext";
import { CarCard } from "../../src/components/CarCard";
import { useRouter } from "expo-router";

export default function Search() {
  const router = useRouter();
  const { token } = useTokenContext();
  const [brandFilter, setBrandFilter] = useState("");
  const [result, setResult] = useState<Car[]>([]);

  const handleSearch = async () => {
    const filter = encodeURIComponent(`brand="${brandFilter}"`);
    try {
      const res = await api.get<{ items: Car[] }>(
        `/api/collections/cars/records?filter=(${filter})`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setResult(res.data.items);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar por Marca</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Toyota"
        value={brandFilter}
        onChangeText={setBrandFilter}
      />
      <Button title="Buscar" onPress={handleSearch} />
      <FlatList
        data={result}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CarCard
            car={item}
            onPress={() => router.push(`/userspace/${item.id}/edit`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#f0f4f8" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingBottom: 16,
  },
});
