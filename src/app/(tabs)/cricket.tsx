import { Button, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { ScrollView } from "react-native";

export default function TabOneScreen() {
  // State to store API data and loading state
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://cricket-live-data.p.rapidapi.com/fixtures";
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "f89afba7b0mshedbc28a7540f903p113142jsn356174a6704f",
            "x-rapidapi-host": "cricket-live-data.p.rapidapi.com",
          },
        };

        const response = await fetch(url, options);
        const result = await response.json();
        setData(result.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : data ? (
          <Text>{JSON.stringify(data, null, 2)}</Text>
        ) : (
          <Text>No data available</Text>
        )}
      </ScrollView>
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
