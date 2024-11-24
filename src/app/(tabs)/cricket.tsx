import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Text, View } from "@/components/Themed";
import { Link, useRouter } from "expo-router";

export default function Cricket() {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        setData(result.results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderMatch = ({ item }: { item: any }) => (
    <Link href={`/(tabs)?id=${item.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.title}>{item.match_title || "Match Title"}</Text>
        <Text style={styles.text}>Date: {item.date || "N/A"}</Text>
        <Text style={styles.text}>
          Teams: {item.home_team?.name || "Team A"} vs{" "}
          {item.away_team?.name || "Team B"}
        </Text>
      </TouchableOpacity>
    </Link>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMatch}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No matches available!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7", padding: 10 },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  text: { fontSize: 14, color: "#555" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { fontSize: 16, color: "red" },
});
