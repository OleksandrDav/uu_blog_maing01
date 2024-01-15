//@@viewOn:imports
import {createVisualComponent, PropTypes, useMemo, useState} from "uu5g05";
import Config from "./config/config.js";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import PostTile from "./post-tile.js";
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

const PostListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PostListView",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    postDataList: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    postDataList: undefined
  },
  //@@viewOff:defaultProps

  render({ postDataList }) {
    console.log(postDataList)
    //@@viewOn:private
    const [sortOptions, setSortOptions] = useState(true);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render


    return (
      /*<div >
        {postList.map((post) => (
          <PostTile
            key={post.id}
            post={post}
            style={{ width: 640, margin: "24px auto" }}
            handleDelete={handleDelete}
          />
        ))}
      </div>*/
    <Uu5Tiles.ControllerProvider data={postDataList.data || []}>
      <Uu5TilesElements.Grid tileMinWidth={300} tileMaxWidth={400}>
        {PostTile}
      </Uu5TilesElements.Grid>
    </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PostListView };
export default PostListView;
//@@viewOff:exports
