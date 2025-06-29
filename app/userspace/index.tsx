import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import { api } from "../../src/services/api";
import { Car } from "../../src/types/Car";
import { CarCard } from "../../src/components/CarCard";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const { token } = useTokenContext();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    // exemplo com then-catch (na outra página usaremos async-await)
    api
      .get("/api/collections/cars/records", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setCars(response.data.items);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cars API LIST</Text>

      {/* botão para criar */}
      <Link href="/userspace/create_car">
        <Text style={styles.createLink}>+ Create a new Car</Text>
      </Link>

      {/* lista de carros */}
      <FlatList
        data={cars}
        keyExtractor={(car: Car) => car.id}
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
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  createLink: {
    fontSize: 16,
    color: "#007AFF",
    marginBottom: 16,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 24,
  },
});
