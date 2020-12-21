import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import Question from "../components/Question";
import { apiConfig } from "../config/config";
import axios from "axios";
import Video from "../components/Video";
import Article from "../components/Article";
import AuthContext from "../auth/Context";
import { feedBackgroundColor } from "../config/defaultStyles";
import AppButton from "../components/AppButton";
import FixedText from "../components/FixedText";
import ZoomLink from "../components/ZoomLink";
import Survey from "../components/Survey";


export default function HomeScreen({navigation}) {
  const authContext = useContext(AuthContext);

  //content from the API
  const [content, setContent] = useState([]);
  //What page we are currently on
  const [page, setPage] = useState(1);
  //Displays the loadmore button or not
  const [loadMore, setLoadMore] = useState(true);

  //
  //ChangePage will update the page so we can grab more content
  //when requested
  //
  const changePage = () => {
    setPage(page + 1);
  };

  //
  //useEffect gets data from api when homepage is rendered and when
  //a change happens to the page state
  //
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          apiConfig.baseUrl + `users/${authContext.user.id}/feed/?page=${page}`,
          {
            auth: apiConfig.auth,
          }
        )
        .then((data) => {
          //Will not display button when no more pages are available 
          data.data.next == null ? setLoadMore(false) : setLoadMore(true);
          page === 1
            ? setContent(data.data.results)
            : setContent([...content, ...data.data.results]);
        })
        .catch(console.error);
    };
    fetchData();
  }, [page]);

  //
  //When a user answers a question the deleteItem is called and excludes the answered quetion from
  //the flatlist
  //
  const deleteItem = (id) => {
    let filteredData = content.filter((item) => item.id !== id);
    setContent(filteredData);
  };

  //Determines the content to be displayed to the homescreen
  //depends on the content type
  const DetermineContent = (props) => {
    //Posts the answer to the API
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

    //Determines what type the answer is ans stes up the payload to send to the API
    const answerCallBack = (answer) => {
      //will need to change these values later to fit specific users and questions
      let payLoad = { user: authContext.user.id, question: props.content.content.item_object.id };

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
      deleteItem(props.content.id);
      postData(payLoad);
    };
    
    // add publication_date_time to content object, to be passed to components
    props.content.content['publication_date_time'] = props.content.publication_date_time;
    if (props.content.content.item_type == "Question") {
      return (
        <Question
          question={props.content.content.item_object}
          answerCallBack={answerCallBack}
        />
      );
    }
    if (props.content.content.item_type === "Static") {
      return <FixedText data={props.content.content.item_object} />;
    }else if(props.content.content.item_type === "Survey"){
      return <Survey data={props.content.content.item_object} navigation={navigation}/>
    }
    switch (props.content.content.item_object.content_type) {
      case "Video": {
        return <Video video={props.content.content} />;
      }
      case "Article": {
        return <Article article={props.content.content} />;
      }
      case "Zoom": {
        return <ZoomLink data={props.content.content} />;
      }
    }
  };

  //Renders the data in a pretty way to the flatlist
  const renderFeed = ({ item }) => {
    return <DetermineContent content={item} />;
  };

  return (
    <SafeAreaView style={{ backgroundColor: feedBackgroundColor }}>
      <View>
        <FlatList
          data={content}
          renderItem={renderFeed}
          keyExtractor={(item) => String(item.id)}
          ListFooterComponent={
            <View style={styles.footer}>
              {loadMore ? (
                <AppButton
                  onPress={changePage}
                  title="Load More"
                  width="80%"
                  compact={true}
                />
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
    justifyContent: "center",
    marginVertical: 6,
    alignItems: "center",
  },
});
