import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Share } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

// Quotes categorized
const quotes = {
  Motivation: [
    { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Anonymous" },
    { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  ],
  Success: [
    { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
    { text: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "Work hard in silence, let success make the noise.", author: "Frank Ocean" },
  ],
  Life: [
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { text: "If you get tired, learn to rest, not quit.", author: "Banksy" },
    { text: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
  ],
};

// Background gradients
const gradients = [
  ["#f7f7f7", "#d9c9b8"],  // Muted beige
  ["#f7d9eb", "#f4cfa1"],  // Soft blush peach
  ["#d6dee3", "#e6eef2"],  // Subtle grey-blue
  ["#d9c6f3", "#a7c9ef"],  // Muted lavender-blue
  ["#fae9c6", "#e6b866"],  // Soft golden beige
  ["#d6f3c7", "#c8e9d6"],  // Gentle mint green
  ["#f5c9c6", "#f1d6f5"],  // Soft coral-lilac
  ["#b8d3f5", "#d3e6f7"],  // Muted baby blue
  ["#f8ece6", "#cde6f5"],  // Cream to sky pastel
  ["#f6d6e0", "#b8b6e3"],  // Soft rose-lilac
];


const RandomQuoteGenerator = () => {
  const [quote, setQuote] = useState({});
  const [category, setCategory] = useState("Motivation");
  const [bgGradient, setBgGradient] = useState(gradients[0]);
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getRandomQuote = (cat = category) => {
    const categoryQuotes = quotes[cat];
    const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
    const newQuote = categoryQuotes[randomIndex];
    setQuote(newQuote);

    // change background gradient randomly
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    setBgGradient(randomGradient);

    // reset opacity and fade-in new quote
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${quote.text}" — ${quote.author}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomQuote("Motivation");
  }, []);

  // Title slide animation
  useEffect(() => {
    const loopAnimation = () => {
      slideAnim.setValue(width);
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 6000,
        useNativeDriver: true,
      }).start(() => loopAnimation());
    };
    loopAnimation();
  }, [slideAnim]);

  return (
    <LinearGradient colors={bgGradient} style={styles.container}>
      {/* Sliding Title */}
      <Animated.Text
        style={[styles.title, { transform: [{ translateX: slideAnim }] }]}
      >
        Random Quote Generator
      </Animated.Text>

      {/* Category Buttons */}
      <View style={styles.categoryRow}>
        {Object.keys(quotes).map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, category === cat && styles.activeCategory]}
            onPress={() => {
              setCategory(cat);
              getRandomQuote(cat);
            }}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        {/* Fade-in Quote */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <Text style={styles.author}>— {quote.author}</Text>
        </Animated.View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => getRandomQuote(category)}
          >
            <Text style={styles.buttonText}>New Quote</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.shareButton]}
            activeOpacity={0.8}
            onPress={handleShare}
          >
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#5d4037",
  },
  categoryRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: "#d2b48c",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeCategory: {
    backgroundColor: "#8b5e3c",
  },
  categoryText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fffaf0",
    padding: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    width: "90%",
  },
  quoteText: {
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 15,
    color: "#333",
  },
  author: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    textAlign: "right",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#d2b48c",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  shareButton: {
    backgroundColor: "#8b5e3c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RandomQuoteGenerator;
