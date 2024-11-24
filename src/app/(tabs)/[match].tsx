import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";

export default function MatchDetails() {
  const { id } = useLocalSearchParams(); // Get the match ID from search params
  const [matchDetails, setMatchDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        if (!id) {
          setError("No match ID provided");
          setLoading(false);
          return;
        }

        const url = `https://cricket-live-data.p.rapidapi.com/match/${id}`;
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

        console.log(result);
        setMatchDetails(result.results.fixture || {});
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading match details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: matchDetails?.match_title }} />

      <Text style={styles.text}>
        Date: {matchDetails?.dates[0].date || "N/A"}
      </Text>
      <Text style={styles.text}>Venue: {matchDetails?.venue || "N/A"}</Text>
      <Text style={styles.text}>
        Teams: {matchDetails?.home.name || "Team A"} vs{" "}
        {matchDetails?.away?.name || "Team B"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f7f7f7" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  text: { fontSize: 16, color: "#333", marginBottom: 8 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { fontSize: 16, color: "red" },
});
