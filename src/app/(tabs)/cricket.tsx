import { Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  // State to store API data and loading state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const URL = "https://rapidapi.com/sportcontentapi/api/cricket-live-data/";
  const headers = {
    // "X-RapidAPI-Key": "your-rapidapi-key", // Replace with your actual key
    "X-RapidAPI-Host": "sportcontentapi.p.rapidapi.com",
  };

  const fetchData = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers,
      });

      const textResponse = await response.text(); // Log the raw text response
      console.log("Raw response:", textResponse);

      const jsonResponse = JSON.parse(textResponse); // Parse to JSON
      setData(jsonResponse);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching cricket data : ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : data ? (
        <Text>{JSON.stringify(data, null, 2)}</Text>
      ) : (
        <Text>No data available</Text>
      )}

      <Button title="Refresh" onPress={() => setRefresh(!refresh)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
