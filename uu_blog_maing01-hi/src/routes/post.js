//@@viewOn:imports
import {createVisualComponent, Utils, Content, useRoute, useEffect, useState, useSession} from "uu5g05";
import Config from "./config/config.js";
import {Box, Button, Grid, Line, Link, Text} from "uu5g05-elements";
import Calls from "../calls";
import RouteBar from "../bricks/route-bar";
import {withRoute} from "uu_plus4u5g02-app";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px", // Add some padding to the main container
  }),
  header: () => Config.Css.css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "20px", // Add margin below the header
  }),
  actionButtons: () => Config.Css.css({
    display: "flex",
    gap: "10px", // Add gap between action buttons
  }),
  image: () => Config.Css.css({
    maxWidth: "100%", // Make sure the image doesn't overflow its container
    marginBottom: "20px", // Add margin below the image
  }),
  content: () => Config.Css.css({
    fontSize: "16px", // Set a base font size for the content
    lineHeight: "1.6", // Improve line height for better readability
    marginBottom: "20px", // Add margin below the content
  }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Post = createVisualComponent({
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
    const [imageSrc, setImageSrc] = useState(null);
    const session = useSession();
    const currentUserId = session?.identity?.uuIdentity;
    let hasEditPermissions = false;

    useEffect(() => {
      if(post){
        if (post?.imageCode)
        {
          Calls.getBinary({ code:  post.imageCode})
            .then((result) => {
              setImageSrc(URL.createObjectURL(result));
              console.log("IMAGE", imageSrc);
            })
            .catch((error) => {
              console.error("Error fetching post image:", error);
            });
        }
      }
    }, [post]);

    //@@viewOff:private
    useEffect(() => {
      if (route.params?.id) {

        const postId = route.params.id;
        Calls.postGet({ id: postId })
          .then((result) => {
            hasEditPermissions = (result.creatorIdentity === currentUserId);
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
      <>
        <RouteBar/>
      <Grid className={Css.main()}>
        <div className={Css.header()}>
          <Text colorScheme="building" category="story" segment="heading" type="h1">
            {post?.title}
          </Text>
          {hasEditPermissions && <div className={Css.actionButtons()}>
            <Button icon="mdi-pencil" significance="subdued" tooltip="Update"/>
            <Button icon="mdi-delete" significance="subdued" tooltip="Delete"/>
          </div> }
          <Text category="interface" segment="content" type="medium" significance="subdued" colorScheme="building">
            {post?.creatorName}
          </Text>
          <Text>{`Amount of views: ${post?.totalViews}`}</Text>
        </div>
        {post?.imageCode && <img className={Css.image()} src={imageSrc} alt="post image"/>}
        <Text className={Css.content()}>
          {post?.postText}
        </Text>

      </Grid>
      </>
    );

    //@@viewOff:render
  },
});

Post = withRoute(Post, { authenticated: false });

//@@viewOn:exports
export { Post };
export default Post;
//@@viewOff:exports
