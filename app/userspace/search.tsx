// app/search.tsx
import { useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import { api } from "../../src/services/api";
import { Car } from "../../src/types/Car";

export default function Search() {
  const [brandFilter, setBrandFilter] = useState("");
  const [result, setResult] = useState<Car[]>([]);

  const handleSearch = async () => {
    const filter = encodeURIComponent(`brand="${brandFilter}"`);
    try {
      const res = await api.get<{ items: Car[] }>(
        `/api/collections/cars/records?filter=(${filter})`
      );
      setResult(res.data.items);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Marca para buscar"
        value={brandFilter}
        onChangeText={setBrandFilter}
      />
      <Button title="Buscar" onPress={handleSearch} />
      <FlatList
        data={result}
        keyExtractor={c => c.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.brand} {item.model}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12 },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
});
