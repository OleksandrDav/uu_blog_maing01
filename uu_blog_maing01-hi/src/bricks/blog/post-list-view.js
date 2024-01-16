//@@viewOn:imports
import {createVisualComponent, PropTypes} from "uu5g05";
import Config from "./config/config.js";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesElements from "uu5tilesg02-elements";
import PostTile from "./post-tile.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
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
    //@@viewOn:private
    const sorterList = [
      {
        key: "Popularity ↑",
        sort: (post1, post2) => post1.totalViews - post2.totalViews,
        label: "Popularity ↑"
      },
      {
        key: "Popularity ↓",
        sort: (post1, post2) => post2.totalViews - post1.totalViews,
        label: "Popularity ↓"
      },
      {
        key: "Date ↑",
        sort: (post1, post2) => post1.sys.cts - post2.sys.cts,
        label: "Date ↑"
      },
      {
        key: "Date ↓",
        sort: (post1, post2) => post2.sys.cts - post1.sys.cts,
        label: "Date ↓"
      }
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render


    return (

    <Uu5Tiles.ControllerProvider data={postDataList.data || []} sorterDefinitionList={sorterList}>
      <div className={Css.main()}>
        <Uu5TilesElements.Grid tileMinWidth={800} tileMaxWidth={1200} >
          {PostTile}
        </Uu5TilesElements.Grid>
      </div>
    </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PostListView };
export default PostListView;
//@@viewOff:exports
