import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { api } from "../../src/services/api";
import { Car } from "../../src/types/Car";
import { useTokenContext } from "../../src/contexts/userContext";
import { CarCard } from "../../src/components/CarCard";
import { useRouter } from "expo-router";

export default function PowerfulCars() {
  const router = useRouter();
  const { token } = useTokenContext();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchPowerfulCars = async () => {
      const filter = encodeURIComponent("hp > 300");
      const res = await api.get<{ items: Car[] }>(
        `/api/collections/cars/records?filter=(${filter})`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCars(res.data.items);
    };
    fetchPowerfulCars();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carros Potentes (HP &gt; 300)</Text>
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
