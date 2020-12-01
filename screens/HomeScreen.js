import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Linking,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { WebView } from "react-native-webview";
import Question from "../components/Question";
import { Appbar, Card, Title, Paragraph, Button } from "react-native-paper";
import { apiConfig } from "../config/config";
import axios from "axios";

const postData = async (payLoad) => {
  axios
    .post(apiConfig.baseUrl + "answers/", payLoad, {
      auth: apiConfig.auth,
    })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

const DetermineContent = (props) => {
  const answerCallBack = (answer) => {
    //will need to change these values later to fit specific users and questions
    let payLoad = { user: 1, question: props.content.content.item_object.id };

    //detrmines what data type was answered
    switch (props.content.content.item_object.question_type) {
      case "YES_NO":
        payLoad = { ...payLoad, bool_answer: answer };
        break;
      case "HAPPY_SAD":
        payLoad = { ...payLoad, bool_answer: answer };
        break;
      case "BLOCK":
        payLoad = { ...payLoad, string_answer: answer };
        break;
      case "MULTILINE":
        payLoad = { ...payLoad, string_answer: answer };
        break;
      case "SCALE":
        payLoad = { ...payLoad, number_answer: answer };
        break;
    }
    postData(payLoad);
  };

  if (props.content.content.item_type == "Question") {
    return (
      <Question
        question={props.content.content.item_object}
        answerCallBack={answerCallBack}
      />
    );
  }
  switch (props.content.content.item_object.content_type) {
    case "Video": {
      return (
        <View style={styles.container}>
          <Title>{props.content.content.item_object.title}</Title>
          <WebView
            javaScriptEnabled={true}
            scrollEnabled={false}
            allowsFullscreenVideo={true}
            source={{
              uri: props.content.content.item_object.link,
            }}
          />
        </View>
      );
    }
    case "Article": {
      return (
        <Button
          mode="outlined"
          onPress={() => {
            Linking.openURL(props.content.content.item_object.link);
          }}
        >
          GO TO ARTICLE
        </Button>
      );
    }
  }
};

const renderFeed = ({ item }) => {
  return (
    <View style={styles.card}>
      <Card style={styles.c}>
        <Card.Content>
          <DetermineContent content={item} />
          <Paragraph>{item.content.item_object.description}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default function HomeScreen() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);

  const changePage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(apiConfig.baseUrl + `users/3/feed/?page=${page}`, {
          auth: apiConfig.auth,
        })
        .then((data) => {
          page === 1
            ? setContent(data.data.results)
            : setContent([...content, ...data.data.results]);
        })
        .catch((err) => {
          err.response.status == 404 ? setLoadMore(false) : console.warn(err);
        });
    };
    fetchData();
  }, [page]);

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <View>
        <FlatList
          data={content}
          renderItem={renderFeed}
          keyExtractor={(item) => String(item.id)}
          ListFooterComponent={
            <View style={styles.footer}>
              {loadMore ? (
                <Button onPress={changePage}>Load more</Button>
              ) : null}
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 150,
    marginTop: 6,
  },
  container: {
    height: 250,
  },
  card: {
    marginTop: 7,
    alignItems: "center",
    width: "100%",
  },
  c: {
    width: "95%",
  },
});
