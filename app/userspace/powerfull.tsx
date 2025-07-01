import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import { api } from "../../src/services/api";
import { Car } from "../../src/types/Car";
import { useTokenContext } from "../../src/contexts/userContext";
import { CarCard } from "../../src/components/CarCard";
import { useRouter } from "expo-router";

export default function PowerfulCars() {
  const router = useRouter();
  const { token } = useTokenContext();
  const [HpFilter, SetHpFilter] = useState("");
  const [cars, setCars] = useState<Car[]>([]);

  const handleSearch = async () => {
    const filter = encodeURIComponent(`hp > "${HpFilter}"`);
    try {
      const res = await api.get<{ items: Car[] }>(
        `/api/collections/cars/records?filter=(${filter})`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCars(res.data.items);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar por HP</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 300"
        onChangeText={SetHpFilter}
      />

      <Button title="Buscar" onPress={handleSearch}></Button>

      <Text style={styles.title}>Carros Potentes (HP &gt; {HpFilter} )</Text>
      
      <FlatList
        data={cars}
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
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f0f4f8",
  },
  input: {
    borderWidth: 1,
    borderColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#2e7d32",
  },
  listContent: {
    paddingBottom: 16,
  },
});
