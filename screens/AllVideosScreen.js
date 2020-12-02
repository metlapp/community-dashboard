import React, { useEffect } from "react";
import { SafeAreaView, Text, FlatList } from "react-native";
import axios from "axios";
import { apiConfig } from "../config/config";
import defaultStyles, {feedBackgroundColor} from "../config/defaultStyles";
import { Appbar } from "react-native-paper";
import ContentCard from "../components/ContentCard";

export default function AllVideosScreen() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  // Here we render the videos for the flatlist to diplay on the screen
  const renderVids = ({ item }) => {
    //Article types will not be displayed
    if (item.content_type == "Article") {
      return;
    }
    return (
        <ContentCard item={item} contentType={"video"} />
    );
  };

  //Fetch's data from the Api

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(apiConfig.baseUrl + "content/", {
          auth: apiConfig.auth,
        })
        .then((data) => {
          setData(data.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={[...[defaultStyles.SafeAreaView], ...[{backgroundColor: feedBackgroundColor}]]}>
      <Appbar.Header>
        <Appbar.Content title="All Videos" />
      </Appbar.Header>
      {loading ? (
        <Text>loading</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderVids}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}
