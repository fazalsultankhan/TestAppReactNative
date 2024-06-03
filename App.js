import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Text, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

const API_KEY = "44200213-4a13586ecb810e6b86698d881";
export default function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`https://pixabay.com/api/?key=${API_KEY}&per_page=50`)
      .then((response) => {
        setImages(response.data.hits);
  
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View>
          <FlatList
            data={images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <Image
                  source={{ uri: item.webformatURL }}
                  style={styles.image}
                />
                <View style={styles.DynamicContent}>
                  <Text style={styles.Textstyle}>
                  <Icon name="user" size={15} color="black" /> {""}
                    {item.user}</Text>
                  <Text style={styles.Textstyle}>
                    <Icon name="heart" size={15} color="black" /> {""}
                    {item.likes}
                  </Text>
                  <Text style={styles.Textstyle}>
                    <Icon name="eye" size={15} color="black" />{" "}
                    {item.views}
                  </Text>
                </View>
              </>
            )}
          />
        </View>
      </View>
    </>
  );
}
const DimensionsWidth = Dimensions.get('window').width;
const DimensionsHight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: DimensionsWidth < 560 ? 405 : 790,
    height: DimensionsHight < 560 ? 350: 400,
    marginBottom: 20,
    marginTop: 20,

    shadowColor: "red",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderRadius: 6,
  },
  DynamicContent: {
    flex: 1,
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 6,
  },
  Textstyle: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
