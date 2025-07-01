import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Car } from "../types/Car";

export function CarCard({ car, onPress }: { car: Car, onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.brand}>{car.brand}</Text>
      <Text>{car.model}</Text>
      <Text style={styles.hp}>{car.hp} hp</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  brand: { fontSize: 16, fontWeight: "bold" },
  hp: { color: "#555", marginTop: 4 },
});
