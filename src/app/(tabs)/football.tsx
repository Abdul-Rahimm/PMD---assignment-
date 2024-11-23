import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";

export default function TabTwoScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const url =
    "https://api-football-v1.p.rapidapi.com/v3/fixtures?date=2021-01-29";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "f89afba7b0mshedbc28a7540f903p113142jsn356174a6704f",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const result = await response.json();
      setData(result);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching football data : ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Button title="Refresh" onPress={() => setRefresh(!refresh)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
