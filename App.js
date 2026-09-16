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
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ujmfvlktaxhefrqzkmdl.supabase.co";
const supabaseKey = "sb_publishable_zcu1n2OSXR7xlizKMHWHgw_IljNK7JS";
const supabase = createClient(supabaseUrl, supabaseKey);
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
  Torsdag: [
    "Chilimarinerad fläskfilé",
    "Kalvgryta",
    "Dagens fisk",
  ],
  Fredag: [
    "Fredagens husmanskost",
    "Kockens special",
    "Dagens fisk",
  ],
};

const categories = [
  "Lunch",
  "Pasta",
  "Hamburgare",
  "Pizza",
  "Kebab",
  "Sallader",
  "Veganskt",
  "Frysta matlådor",
  "Frukost",
];

export default function App() {
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("Lunch");

  const addItem = (name, price) => {
    setCart((old) => ({
      ...old,
      [name]: {
        price,
        quantity: (old[name]?.quantity || 0) + 1,
      },
    }));
  };

  const removeItem = (name) => {
    setCart((old) => {
      if (!old[name]) return old;

      const copy = { ...old };

      if (copy[name].quantity <= 1) {
        delete copy[name];
      } else {
        copy[name] = {
          ...copy[name],
          quantity: copy[name].quantity - 1,
        };
      }

      return copy;
    });
  };

  const totalItems = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderFood = (name, price) => (
    <View style={styles.foodRow} key={name}>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodPrice}>{price} kr</Text>
      </View>

      <View style={styles.quantity}>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => removeItem(name)}
        >
          <Text style={styles.smallButtonText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>
          {cart[name]?.quantity || 0}
        </Text>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => addItem(name, price)}
        >
          <Text style={styles.smallButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategory = () => {
    if (selectedCategory === "Lunch") {
      return (
        <>
          <Text style={styles.sectionTitle}>Veckans lunch</Text>
          <Text style={styles.info}>
            Äta här 139 kr • Ta med 129 kr • Endast matlåda 119 kr
          </Text>

          {Object.entries(lunchMenu).map(([day, foods]) => (
            <View style={styles.card} key={day}>
              <Text style={styles.day}>{day}</Text>

              {foods.map((food) => renderFood(food, 139))}
            </View>
          ))}
        </>
      );
    }

    if (selectedCategory === "Frysta matlådor") {
      return (
        <>
          <Text style={styles.sectionTitle}>Frysta matlådor</Text>
          <Text style={styles.info}>Hemlagade frysta matlådor</Text>

          <View style={styles.card}>
            {renderFood("1 fryst matlåda", 65)}
            {renderFood("5 frysta matlådor", 290)}
            {renderFood("10 frysta matlådor", 550)}
          </View>
        </>
      );
    }

    if (selectedCategory === "Frukost") {
      return (
        <>
          <Text style={styles.sectionTitle}>Frukost</Text>

          <View style={styles.card}>
            {renderFood("Kokt ägg", 10)}
            {renderFood("Fralla med ost", 25)}
            {renderFood("Fralla med ost och skinka", 25)}
            {renderFood("Fralla, kaffe och kokt ägg", 49)}
            {renderFood("Kaffe", 25)}
          </View>
        </>
      );
    }

    return (
      <View style={styles.card}>
        <Text style={styles.day}>{selectedCategory}</Text>
        <Text style={styles.emptyText}>
          Maträtter kommer att läggas in här.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>H</Text>
        </View>

        <View>
          <Text style={styles.title}>HUSMAN</Text>
          <Text style={styles.subtitle}>Lunchrestaurang</Text>
          <Text style={styles.location}>Kungens Kurva</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Meny</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category &&
                  styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category &&
                    styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {renderCategory()}

        <TouchableOpacity
          style={styles.bookingButton}
          onPress={() =>
            Alert.alert(
              "Boka bord",
              "Välj datum och tid för din bordsbokning."
            )
          }
        >
          <Text style={styles.bookingText}>📅 Boka bord</Text>
        </TouchableOpacity>

        <View style={styles.cart}>
          <Text style={styles.cartTitle}>🛒 Varukorg</Text>

          {Object.keys(cart).length === 0 ? (
            <Text style={styles.cartText}>Varukorgen är tom</Text>
          ) : (
            Object.entries(cart).map(([name, item]) => (
              <View style={styles.cartRow} key={name}>
                <Text style={styles.cartItem}>
                  {item.quantity} × {name}
                </Text>

                <Text style={styles.cartItem}>
                  {item.quantity * item.price} kr
                </Text>
              </View>
            ))
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalText}>
              Antal: {totalItems}
            </Text>

            <Text style={styles.totalText}>
              Totalt: {totalPrice} kr
            </Text>
          </View>

          {totalItems > 0 && (
  <TouchableOpacity
    style={styles.orderButton}
    onPress={async () => {
      const { error } = await supabase.from("orders").insert([
        {
          items: cart,
          total: totalPrice,
          message: customerMessage,
          status: "new",
        },
      ]);

      if (error) {
        Alert.alert("Fel", error.message);
        return;
      }

      Alert.alert("Tack!", "Din beställning är skickad.");
    }}
  >
    <Text style={styles.orderButtonText}>
      Skicka beställning
    </Text>
  </TouchableOpacity>
)}
  Alert.alert("Tack!", "Din beställning är skickad.");
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
    backgroundColor: "#082B4C",
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  logoText: {
    color: "#082B4C",
    fontSize: 36,
    fontWeight: "bold",
  },

  title: {
    color: "#ffffff",
    fontSize: 27,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },

  location: {
    color: "#DCE7F0",
    fontSize: 14,
    marginTop: 2,
  },

  content: {
    padding: 16,
    paddingBottom: 60,
  },

  sectionTitle: {
    color: "#082B4C",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    color: "#4D5C68",
    marginBottom: 15,
  },

  categoryScroll: {
    marginBottom: 16,
  },

  categoryButton: {
    borderWidth: 1,
    borderColor: "#082B4C",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: "#ffffff",
  },

  categoryButtonActive: {
    backgroundColor: "#082B4C",
  },

  categoryText: {
    color: "#082B4C",
    fontWeight: "bold",
  },

  categoryTextActive: {
    color: "#ffffff",
  },

  card: {
    backgroundColor: "#F3F6F9",
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
  },

  day: {
    color: "#082B4C",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 10,
  },

  foodRow: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  foodInfo: {
    flex: 1,
    paddingRight: 10,
  },

  foodName: {
    fontSize: 15,
    color: "#18242E",
    fontWeight: "600",
  },

  foodPrice: {
    color: "#082B4C",
    fontWeight: "bold",
    marginTop: 5,
  },

  quantity: {
    flexDirection: "row",
    alignItems: "center",
  },

  smallButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#082B4C",
    alignItems: "center",
    justifyContent: "center",
  },

  smallButtonText: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "bold",
  },

  quantityText: {
    width: 32,
    textAlign: "center",
    color: "#082B4C",
    fontSize: 17,
    fontWeight: "bold",
  },

  emptyText: {
    color: "#687681",
    fontSize: 16,
  },

  bookingButton: {
    backgroundColor: "#082B4C",
    borderRadius: 12,
    padding: 17,
    marginTop: 8,
    marginBottom: 18,
  },

  bookingText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  cart: {
    borderWidth: 2,
    borderColor: "#082B4C",
    borderRadius: 14,
    padding: 16,
    backgroundColor: "#ffffff",
  },

  cartTitle: {
    color: "#082B4C",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  cartText: {
    color: "#687681",
    fontSize: 16,
  },

  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8ED",
    paddingVertical: 8,
  },

  cartItem: {
    color: "#18242E",
    fontSize: 14,
    flex: 1,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  totalText: {
    color: "#082B4C",
    fontSize: 17,
    fontWeight: "bold",
  },

  orderButton: {
    backgroundColor: "#082B4C",
    borderRadius: 10,
    padding: 15,
    marginTop: 18,
  },

  orderButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});
