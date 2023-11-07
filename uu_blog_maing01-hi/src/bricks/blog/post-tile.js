//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Box, Text, Line, Button } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const Css = {
  main: () =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }),
  header: () =>
    Config.Css.css({
      display: "block",
      padding: 16,
      height: 48,
    }),
  name: () =>
    Config.Css.css({
      display: "block",
      paddingLeft: "16px",
      paddingTop: "8px",
      paddingBottom: "3px",
    }),
  footer: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 48,
      marginTop: 8,
      paddingLeft: 16,
      paddingRight: 8,
    })
}

const PostTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    post: PropTypes.shape({
      name: PropTypes.string.isRequired,
      postText: PropTypes.string,
      creatorName: PropTypes.string.isRequired,
      totalViews: PropTypes.number.isRequired,
      imageUrl: PropTypes.string
    }).isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
  },
  //@@viewOff:defaultProps

  render({ post, style, handleDelete }) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Box style={style} className={Css.main()}>
        <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.header()}>
          {post.name}
        </Text>
        <div>
          <img src={post.imageUrl} />
        </div>
        <Line significance="subdued" />
        <div>
          <Text className={Css.name()} category="interface" segment="content" type="medium" significance="subdued" colorScheme="building">
            {post.creatorName}
          </Text>
        </div>
        <Box significance="distinct" className={Css.footer()}>
          {`Amount of views: ${post.totalViews}`}
          <div>
            <Button icon="mdi-pencil" significance="subdued" tooltip="Update" />
            <Button icon="mdi-delete" significance="subdued" tooltip="Delete"
              onClick={() => handleDelete(post.id)} />
          </div>
        </Box>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PostTile };
export default PostTile;
//@@viewOff:exports