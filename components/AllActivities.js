import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "./Header";
import { useState } from "react";
import ActivitesList from "./ActivitiesList";
import Input from "./Input";

export default function AllActivities({navigation}) {
    const appName = "My awesome app";

    const [activities, setActivities] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    function receiveInput(data) {
        console.log("recieve input ", data);
        const newActivity = {text: data, id: Math.random()};

        //use updater function whenever we are updating state variables based on the current value
        setActivities((currentActivities) => [...currentActivities, newActivity]);

        setIsModalVisible(false);
    }

    function dismissModal() {
        setIsModalVisible(false);
    }

    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.topView}>
            <StatusBar style="auto" />
    
            <Header name={appName} version={2} />
            <Button title="Add a activity" onPress={() => setIsModalVisible(true)} />
            <Input
              inputHandler={receiveInput}
              modalVisible={isModalVisible}
              dismissModal={dismissModal}
            />
          </View>
          <View style={styles.bottomView}>
            <FlatList
              contentContainerStyle={styles.scrollViewContent}
              data={activities}
              renderItem={({ item }) => {
                return (
                  <ActivitesList activityObj={item} />
                );
              }}
            />
            {/* <ScrollView contentContainerStyle={styles.scrollViewContent}> */}
            {/* {goals.map((goalObj) => {
                return (
                  <View style={styles.textContainer} key={goalObj.id}>
                    <Text style={styles.text}>{goalObj.text}</Text>
                  </View>
                );
              })} */}
            {/* </ScrollView> */}
          </View>
        </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "white",
          // alignItems: "center",
          justifyContent: "center",
        },
        topView: {
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        },
        scrollViewContent: {
          alignItems: "center",
        },
        bottomView: { flex: 4, backgroundColor: "lightpink" },
      });