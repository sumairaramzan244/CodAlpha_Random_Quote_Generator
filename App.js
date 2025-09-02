import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
  { text: "If you are working on something exciting, it will keep you motivated.", author: "Steve Jobs" },
  { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "Keep going. Everything you need will come to you at the perfect time.", author: "Unknown" },
  { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Great things never come from comfort zones.", author: "Anonymous" },
  { text: "Dream bigger. Do bigger.", author: "Anonymous" },
  { text: "Don’t stop when you’re tired. Stop when you’re done.", author: "Unknown" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
  { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
  { text: "Little things make big days.", author: "Isabel Marant" },
  { text: "It’s going to be hard, but hard does not mean impossible.", author: "Unknown" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Anonymous" },
  { text: "Sometimes later becomes never. Do it now.", author: "Unknown" },
  { text: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown" },
  { text: "Your limitation—it’s only your imagination.", author: "Anonymous" },
  { text: "Great things never come from comfort zones.", author: "Anonymous" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  { text: "Stay positive, work hard, make it happen.", author: "Unknown" },
  { text: "Don’t wait for opportunity. Create it.", author: "George Bernard Shaw" },
  { text: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Anonymous" },
  { text: "Dream bigger. Do bigger.", author: "Anonymous" },
  { text: "Don’t stop until you’re proud.", author: "Unknown" },
  { text: "If you get tired, learn to rest, not quit.", author: "Banksy" },
  { text: "Your only limit is your mind.", author: "Anonymous" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Work hard in silence, let success make the noise.", author: "Frank Ocean" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "Opportunities don’t happen, you create them.", author: "Chris Grosser" },
  { text: "Do what you can with all you have, wherever you are.", author: "Theodore Roosevelt" },
  { text: "Hustle in silence and let your success be the noise.", author: "Unknown" },
  { text: "Success is what comes after you stop making excuses.", author: "Luis Galarza" },
  { text: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  { text: "Failure is the condiment that gives success its flavor.", author: "Truman Capote" },
  { text: "Courage is one step ahead of fear.", author: "Coleman Young" },
  { text: "Do it with passion, or not at all.", author: "Rosa Nouchette Carey" },
  { text: "Go as far as you can see; when you get there, you’ll be able to see further.", author: "Thomas Carlyle" },
  { text: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry" },
  { text: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "With self-discipline most anything is possible.", author: "Theodore Roosevelt" },
  { text: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
];

const RandomQuoteGenerator = () => {
  const [quote, setQuote] = useState({});
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[randomIndex];
    setQuote(newQuote);

    // reset opacity and fade-in new quote
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    getRandomQuote();
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
    <LinearGradient colors={["#f5f5dc", "#fdfaf6"]} style={styles.container}>
      {/* Sliding Title */}
      <Animated.Text
        style={[
          styles.title,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
          Random Quote Generator 
      </Animated.Text>

      <View style={styles.card}>
        {/* Fade-in Quote */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <Text style={styles.author}>— {quote.author}</Text>
        </Animated.View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={getRandomQuote}
        >
          <Text style={styles.buttonText}>New Quote</Text>
        </TouchableOpacity>
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
    marginBottom: 25,
    color: "#5d4037",
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
  button: {
    backgroundColor: "#d2b48c",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default RandomQuoteGenerator;
