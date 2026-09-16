import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const lunchMenu = {
  Måndag: [
    "Piccata Milanese med ris och tomatsås",
    "Hackad biff med stekt potatis och krämig paprikasås",
    "Panerad fiskfilé med kokt potatis och remouladsås",
  ],
  Tisdag: [
    "Raggmunk med stekt fläsk och lingonsylt eller löksås",
    "Kyckling Bourguignon med grönsaker, ris och vitlökskräm",
    "Panerad flundrafilé med kokt potatis och kall dillsås",
  ],
  Onsdag: [
    "Wallenbergare med potatismos, gräddsås och lingonsylt",
    "Korv Stroganoff med paprika, lök, krämig chilisås och ris",
    "Panerad rödspättafilé med kokt potatis och avokadoröra",
  ],
};

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart([...cart, food]);
    Alert.alert("Tillagd", `${food} är tillagd i varukorgen.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.title}>Husman Lunchrestaurang</Text>
        <Text style={styles.subtitle}>Kungens Kurva</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Veckans lunch</Text>
        <Text style={styles.price}>Äta här 139 kr • Ta med 129 kr</Text>

        {Object.entries(lunchMenu).map(([day, foods]) => (
          <View key={day} style={styles.card}>
            <Text style={styles.day}>{day}</Text>

            {foods.map((food, index) => (
              <View key={index} style={styles.foodRow}>
                <Text style={styles.food}>
                  {index + 1}. {food}
                </Text>

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(food)}
                >
                  <Text style={styles.addButtonText}>Lägg till</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.heading}>Meny</Text>

        {[
          "Lunch",
          "Pasta",
          "Hamburgare",
          "Pizza",
          "Kebab",
          "Sallader",
          "Veganskt",
          "Frysta matlådor",
          "Frukost",
        ].map((category) => (
          <TouchableOpacity key={category} style={styles.menuButton}>
            <Text style={styles.menuButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.bookingButton}
          onPress={() =>
            Alert.alert("Boka bord", "Bordsbokningen öppnas här.")
          }
        >
          <Text style={styles.bookingText}>📅 Boka bord</Text>
        </TouchableOpacity>

        <View style={styles.cart}>
          <Text style={styles.cartTitle}>🛒 Varukorg</Text>
          <Text style={styles.cartText}>
            {cart.length === 0
              ? "Varukorgen är tom"
              : `${cart.length} maträtt(er) i varukorgen`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#1565c0",
    padding: 22,
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#ffffff",
    fontSize: 15,
    marginTop: 4,
  },
  content: {
    padding: 16,
    paddingBottom: 50,
  },
  heading: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#1565c0",
    marginTop: 12,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#f4f7fb",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: 10,
  },
  foodRow: {
    marginBottom: 14,
  },
  food: {
    fontSize: 16,
    marginBottom: 7,
  },
  addButton: {
    backgroundColor: "#1565c0",
    padding: 9,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  menuButton: {
    borderWidth: 1,
    borderColor: "#1565c0",
    padding: 14,
    borderRadius: 10,
    marginBottom: 9,
  },
  menuButtonText: {
    color: "#1565c0",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  bookingButton: {
    backgroundColor: "#1565c0",
    padding: 17,
    borderRadius: 10,
    marginTop: 15,
  },
  bookingText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  cart: {
    marginTop: 20,
    padding: 18,
    backgroundColor: "#f4f7fb",
    borderRadius: 12,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cartText: {
    fontSize: 16,
    marginTop: 7,
  },
eas.json
