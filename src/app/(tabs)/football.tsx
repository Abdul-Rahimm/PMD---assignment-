import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const url =
        "https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2021-01-29";

      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "f89afba7b0mshedbc28a7540f903p113142jsn356174a6704f",
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      const result = await response.json();

      // Assuming the data you're interested in is in `result.response`
      setData(result.response || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMatch = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.league.name}</Text>
      <Text style={styles.text}>{item.fixture.date}</Text>
      <Text style={styles.text}>
        {item.teams.home.name} vs {item.teams.away.name}
      </Text>
      <Text style={styles.text}>{item.fixture.venue.name}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
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
        keyExtractor={(item) => item.fixture.id.toString()}
        renderItem={renderMatch}
        onRefresh={fetchData}
        refreshing={refreshing}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No matches found!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  list: {
    padding: 10,
  },
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 16,
    color: "red",
  },
});
