//@@viewOn:imports
import {createVisualComponent, PropTypes, useRoute, Utils} from "uu5g05";
import {Box, Text, Line, Button, Grid} from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import {Link} from "uu5g05-elements";
//@@viewOff:imports

const Css = {

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
    //@@viewOff:private

    //@@viewOn:render
    //TODO fix image source
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
                setRoute("post", {id: data.data.id}) }} colorScheme="building">
                {data.data.title}
              </Link>
              <div>
                <img src="https://picsum.photos/320/330" alt="image" onClick={() => {
                  setRoute("post", {id: data.data.id}) }}/>
              </div>
              <Line significance="subdued" />
              <div>
                <Text category="interface" segment="content" type="medium" significance="subdued" colorScheme="building">
                  {data.data.creatorName}
                </Text>
              </div>
              <Box significance="distinct">
                {`Amount of views: ${data.data.totalViews}`}
                <div>
                  <Button icon="mdi-pencil" significance="subdued" tooltip="Update"/>
                  <Button icon="mdi-delete" significance="subdued" tooltip="Delete"/>
                </div>
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
