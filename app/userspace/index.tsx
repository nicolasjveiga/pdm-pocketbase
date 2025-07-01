import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useTokenContext } from "../../src/contexts/userContext";
import { api } from "../../src/services/api";
import { Car } from "../../src/types/Car";
import { CarCard } from "../../src/components/CarCard";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Home() {
  const router = useRouter();
  const { token } = useTokenContext();
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
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

      <Link href="/userspace/create_car" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Create a new Car</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/userspace/search" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buscar por Marca</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/userspace/powerfull" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver Carros Potentes</Text>
        </TouchableOpacity>
      </Link>

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
  listContent: {
    paddingBottom: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
