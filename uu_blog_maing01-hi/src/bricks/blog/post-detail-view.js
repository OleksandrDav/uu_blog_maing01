//@@viewOn:imports
import { createVisualComponent} from "uu5g05";
import Config from "./config/config.js";
import {Block, Box, Button, Grid, Line, Text, UuGds} from "uu5g05-elements";
import {SubmitButton} from "uu5g05-forms";
import {FormEditor} from "uu5richtextg01-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const PostDetailView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PostDetailView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes

  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    postList: [],
  },
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <Box style={style} className={Css.main()}>
        <Text category="interface" type="minor" colorScheme="building" className={Css.header()}>
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
            <Button icon="mdi-pencil" significance="subdued" tooltip="Update"
                    onClick={() => handleUpdate()} />
            <Button icon="mdi-delete" significance="subdued" tooltip="Delete"
                    onClick={() => handleDelete(post.id)} />
          </div>
        </Box>
        <Block>
          //TODO: Add comments
        </Block>
        <Block
          header="Comment"
          headerType="heading"
          footer={
            <Grid
              templateColumns={{ xs: "1fr", s: "auto" }}
              columnGap={UuGds.SpacingPalette.getValue(["fixed", "c"])}
              justifyContent={{ s: "start" }}
              flow="column"
            >
              <SubmitButton>Comment</SubmitButton>
            </Grid>
          }
        >
          <FormEditor name="comment" placeholder="Comment this post" required label="Comment text"/>
        </Block>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PostDetailView };
export default PostDetailView;
//@@viewOff:exports
