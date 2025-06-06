import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useEvents } from "../context/EventsContext";

type DamagesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Damages"
>;
type DamagesScreenRouteProp = RouteProp<RootStackParamList, "Damages">;

export const Damages = () => {
  const navigation = useNavigation<DamagesScreenNavigationProp>();
  const route = useRoute<DamagesScreenRouteProp>();
  const { eventId } = route.params || {};
  const { events, addEvent, updateEvent } = useEvents();
  const [damages, setDamages] = useState({
    description: "",
    affectedHouses: "",
    affectedBusinesses: "",
    otherDamages: "",
  });

  const currentEvent = eventId
    ? events.find((e) => e.id === eventId)
    : events[events.length - 1];

  useEffect(() => {
    if (eventId && currentEvent?.damages) {
      setDamages({
        description: currentEvent.damages.description || "",
        affectedHouses: currentEvent.damages.affectedHouses?.toString() || "",
        affectedBusinesses:
          currentEvent.damages.affectedBusinesses?.toString() || "",
        otherDamages: currentEvent.damages.otherDamages || "",
      });
    }
  }, [eventId, currentEvent]);

  const handleSubmit = async () => {
    const currentEvent = events[events.length - 1];
    if (!currentEvent) return;

    const updatedEvent = {
      ...currentEvent,
      damages: {
        description: damages.description,
        affectedHouses: parseInt(damages.affectedHouses) || 0,
        affectedBusinesses: parseInt(damages.affectedBusinesses) || 0,
        otherDamages: damages.otherDamages,
      },
    };

    try {
      await updateEvent(updatedEvent);
      console.log("Updated Event with Damages:", updatedEvent);
      navigation.navigate("Recommendations", { eventId: updatedEvent.id });
    } catch (error) {
      console.error("Error saving damages:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.card}>
        <Text style={styles.header}>Prejuízos Causados</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição dos Prejuízos</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={damages.description}
              onChangeText={(text) =>
                setDamages((prev) => ({ ...prev, description: text }))
              }
              placeholder="Descreva os prejuízos causados"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de Residências Afetadas</Text>
            <TextInput
              style={styles.input}
              value={damages.affectedHouses}
              onChangeText={(text) =>
                setDamages((prev) => ({ ...prev, affectedHouses: text }))
              }
              placeholder="Digite o número de residências"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Número de Estabelecimentos Afetados
            </Text>
            <TextInput
              style={styles.input}
              value={damages.affectedBusinesses}
              onChangeText={(text) =>
                setDamages((prev) => ({ ...prev, affectedBusinesses: text }))
              }
              placeholder="Digite o número de estabelecimentos"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Outros Prejuízos (Opcional)</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={damages.otherDamages}
              onChangeText={(text) =>
                setDamages((prev) => ({ ...prev, otherDamages: text }))
              }
              placeholder="Descreva outros prejuízos"
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f3f4f6",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#1f2937",
  },
  formContainer: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1f2937",
    marginBottom: 0,
  },
  multilineInput: {
    minHeight: 100,
    height: "auto", // Or a specific height if preferred
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 16,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "semibold",
    fontSize: 18,
  },
});
