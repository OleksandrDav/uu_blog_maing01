//@@viewOn:imports
import {createVisualComponent, Utils, Content, useRoute, useEffect, useState} from "uu5g05";
import Config from "./config/config.js";
import {Box, Button, Grid, Line, Link, Text} from "uu5g05-elements";
import Calls from "../calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {

};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Post = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Post",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const [route] = useRoute();
    const [post, setPost] = useState(null);

    //@@viewOff:private
    useEffect(() => {
      if (route.params?.id) {

        const postId = route.params.id;
        Calls.postGet({ id: postId })
          .then((result) => {
            setPost(result);
          })
          .catch((error) => {
            console.error("Error fetching shopping list:", error);
          });
      }

    }, [route.params?.id, post]);

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Grid>
        <div>
          <Text colorScheme="building">
            {post?.title}
          </Text>
          <Button icon="mdi-pencil" significance="subdued" tooltip="Update"/>
          <Button icon="mdi-delete" significance="subdued" tooltip="Delete"/>
          <Text category="interface" segment="content" type="medium" significance="subdued" colorScheme="building">
            {post?.creatorName}
          </Text>
          {`Amount of views: ${post?.totalViews}`}
        </div>
        <div>
          <img src="https://picsum.photos/320/330" alt="image" onClick={() => {
            setRoute("post", {id: post?.id}) }}/>
        </div>
        <Text>
          {post?.postText}
        </Text>

      </Grid>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Post };
export default Post;
//@@viewOff:exports
