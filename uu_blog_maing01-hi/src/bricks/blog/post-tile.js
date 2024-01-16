//@@viewOn:imports
import {createVisualComponent, PropTypes, useCall, useEffect, useRoute, useSession, useState, Utils} from "uu5g05";
import {Box, Text, Line, Button, Grid} from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import { useSystemData, useSubAppData, useSubApp } from "uu_plus4u5g02";
import Config from "./config/config.js";
import {Link} from "uu5g05-elements";
import Calls from "../../calls";
//@@viewOff:imports

const Css = {
  tileIcon: () => Config.Css.css({
    alignItems: "right",
    justifyContent: "right",
  }),
}

const PostTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes

  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let { data, ...otherProps } = props;
    const [, setRoute] = useRoute();
    const post = data.data;
    const [imageSrc, setImageSrc] = useState(null);
    const session = useSession();
    const currentUserId = session?.identity?.uuIdentity;
    //@@viewOff:private

    useEffect(() => {
      if (post.imageCode)
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
    }, []);

    //@@viewOn:render
    return (
      <Uu5TilesElements.Tile {...otherProps} headerOverlap>
        {({ padding }) => {
          return (
            <Grid
              className={Config.Css.css({
                paddingTop: padding.top,
                paddingRight: padding.right,
                paddingBottom: padding.bottom,
                paddingLeft: padding.left,
                display: "grid",
                rowGap: "12px",
              })}
            >
              <Link onClick={() => {
                setRoute("post", {id: post.id}) }}>
                <Text colorScheme="building" category="story" segment="heading" type="h2">{post.title}</Text>
              </Link>
              {post.imageCode && <Link onClick={() => { setRoute("post", {id: post.id}) }}>
                <img src={imageSrc} alt="post image"/>
              </Link>}
              <Line significance="subdued" />
              <div>
                <Text category="interface" segment="content" type="medium" significance="subdued" colorScheme="building">
                  {post.creatorName}
                </Text>
              </div>
              <Box significance="distinct">
                <Text>{`Amount of views: ${data.data.totalViews}`}</Text>
                {(currentUserId === post.creatorIdentity) && <Button icon="mdi-pencil" significance="subdued" tooltip="Update" className={Css.tileIcon()}/>}
                {(currentUserId === post.creatorIdentity) && <Button icon="mdi-delete" significance="subdued" tooltip="Delete" className={Css.tileIcon()}/>}
              </Box>
            </Grid>
          );
        }}
      </Uu5TilesElements.Tile>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PostTile };
export default PostTile;
//@@viewOff:exports
