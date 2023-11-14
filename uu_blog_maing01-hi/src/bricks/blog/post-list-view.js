//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
import Config from "./config/config.js";
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
    postList: PropTypes.array.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    postList: [],
  },
  //@@viewOff:defaultProps

  render({ postList, handleDelete }) {
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div >
        {postList.map((post) => (
          <PostTile
            key={post.id}
            post={post}
            style={{ width: 640, margin: "24px auto" }}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PostListView };
export default PostListView;
//@@viewOff:exports
