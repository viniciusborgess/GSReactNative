import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useEvents } from "../context/EventsContext";
import { PowerOutageEvent } from "../types/types";

type LocationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Location"
>;
type LocationScreenRouteProp = RouteProp<RootStackParamList, "Location">;

export const Location = () => {
  const navigation = useNavigation<LocationScreenNavigationProp>();
  const route = useRoute<LocationScreenRouteProp>();
  const { eventId } = route.params || {};
  const { addEvent, updateEvent, events } = useEvents();
  const [location, setLocation] = useState({
    neighborhood: "",
    city: "",
    zipCode: "",
  });
  const [eventType, setEventType] = useState("");
  const [loadingCEP, setLoadingCEP] = useState(false);

  useEffect(() => {
    if (eventId) {
      const eventToEdit = events.find((e) => e.id === eventId);
      if (eventToEdit) {
        setLocation(eventToEdit.location);
        setEventType(eventToEdit.naturalEvent.type);
      }
    }
  }, [eventId, events]);

  const fetchLocationByCEP = async (cep: string) => {
    if (cep.length !== 8) return;
    setLoadingCEP(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data && !data.erro) {
        setLocation((prev) => ({
          ...prev,
          neighborhood: data.bairro || "",
          city: data.localidade || "",
        }));
      } else {
        console.log("CEP não encontrado.");
        setLocation((prev) => ({
          ...prev,
          neighborhood: "",
          city: "",
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setLocation((prev) => ({
        ...prev,
        neighborhood: "",
        city: "",
      }));
    } finally {
      setLoadingCEP(false);
    }
  };

  const handleSubmit = async () => {
    const newOrUpdatedEvent: PowerOutageEvent = eventId
      ? events.find((e) => e.id === eventId)!
      : {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          duration: { startTime: new Date().toISOString(), endTime: "" },
          damages: {
            description: "",
            affectedHouses: 0,
            affectedBusinesses: 0,
            otherDamages: "",
          },
          naturalEvent: { type: "", description: "" },
        };

    newOrUpdatedEvent.location = location;
    newOrUpdatedEvent.naturalEvent.type = eventType;

    try {
      if (eventId) {
        await updateEvent(newOrUpdatedEvent);
      } else {
        await addEvent(newOrUpdatedEvent);
      }
      navigation.navigate("Duration", { eventId: newOrUpdatedEvent.id });
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.card}>
        <Text style={styles.header}>Detalhes da Ocorrência</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={styles.input}
              value={location.zipCode}
              onChangeText={(text) => {
                setLocation((prev) => ({ ...prev, zipCode: text }));
                if (text.length === 8) {
                  fetchLocationByCEP(text);
                }
              }}
              placeholder="Digite o CEP"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              maxLength={8}
            />
            {loadingCEP && (
              <ActivityIndicator
                style={styles.loadingIndicator}
                size="small"
                color="#0000ff"
              />
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={styles.input}
              value={location.neighborhood}
              onChangeText={(text) =>
                setLocation((prev) => ({ ...prev, neighborhood: text }))
              }
              placeholder="Digite o bairro"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              value={location.city}
              onChangeText={(text) =>
                setLocation((prev) => ({ ...prev, city: text }))
              }
              placeholder="Digite a cidade"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Desastre</Text>
            <TextInput
              style={styles.input}
              value={eventType}
              onChangeText={setEventType}
              placeholder="Selecione: Chuva, Vento, Deslizamento, Outro"
              placeholderTextColor="#9CA3AF"
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
  loadingIndicator: {
    marginTop: 8,
  },
});
