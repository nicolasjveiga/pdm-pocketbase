import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Car } from "../types/Car";

interface CarFormProps {
  initialData?: Car;
  onSubmit: (data: { brand: string; model: string; hp: number }) => void;
  submitLabel?: string;
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

export function CarForm({
  initialData,
  onSubmit,
  submitLabel = "Salvar",
  showDeleteButton = false,
  onDelete,
}: CarFormProps) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [hp, setHp] = useState("");

  useEffect(() => {
    if (initialData) {
      setBrand(initialData.brand);
      setModel(initialData.model);
      setHp(String(initialData.hp));
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!brand || !model || !hp) return;
    onSubmit({ brand, model, hp: parseInt(hp) });
  };

  return (
    <View>
      <TextInput
        value={brand}
        onChangeText={setBrand}
        placeholder="Marca (Ex: Toyota)"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        value={model}
        onChangeText={setModel}
        placeholder="Modelo (Ex: Corolla)"
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        value={hp}
        onChangeText={(text) => setHp(text.replace(/[^0-9]/g, ""))}
        placeholder="HP (Ex: 300)"
        keyboardType="number-pad"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </TouchableOpacity>

      {showDeleteButton && onDelete && (
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
