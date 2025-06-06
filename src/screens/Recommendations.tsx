import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

type RecommendationsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Recommendations'>;

const recommendations = [
  {
    title: 'Antes da Tempestade',
    items: [
      'Mantenha uma lanterna e pilhas extras em local de fácil acesso',
      'Tenha um rádio portátil com pilhas',
      'Mantenha o celular carregado',
      'Tenha uma reserva de água potável',
      'Mantenha alimentos não perecíveis',
    ],
  },
  {
    title: 'Durante a Falta de Energia',
    items: [
      'Desligue equipamentos elétricos para evitar danos por surtos',
      'Mantenha a geladeira fechada para preservar os alimentos',
      'Use lanternas em vez de velas para evitar acidentes',
      'Mantenha-se informado através do rádio',
      'Evite abrir portas e janelas desnecessariamente',
    ],
  },
  {
    title: 'Após a Restauração',
    items: [
      'Verifique se todos os equipamentos estão funcionando corretamente',
      'Descarte alimentos que possam ter estragado',
      'Verifique se há danos na instalação elétrica',
      'Registre o evento para fins de documentação',
      'Mantenha um kit de emergência sempre atualizado',
    ],
  },
];

export const Recommendations = () => {
  const navigation = useNavigation<RecommendationsScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.card}>
        <Text style={styles.header}>Recomendações</Text>

        <View style={styles.recommendationsContainer}>
          {recommendations.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.item}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
          ))}

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Overview')}
          >
            <Text style={styles.buttonText}>Voltar ao Início</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f3f4f6',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1f2937',
  },
  recommendationsContainer: {
    spaceY: 24
  },
  section: {
    spaceY: 8
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'semibold',
    marginBottom: 8,
    color: '#1f2937',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#3b82f6',
    marginRight: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 24,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'semibold',
    fontSize: 18,
  },
}); 