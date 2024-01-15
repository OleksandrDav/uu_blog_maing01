//@@viewOn:imports
import {createVisualComponent, useState} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import { useSystemData, useSubAppData, useSubApp } from "uu_plus4u5g02";
import Config from "./config/config.js";
import PostListProvider from "../bricks/blog/post-list-provider.js";
import PostListView from "../bricks/blog/post-list-view.js";
import RouteBar from "../bricks/route-bar";
import {Select} from "uu5g05-forms";
//@@viewOff:imports

const Css = {
  SortBar: () => Config.Css.css({
    padding: "8px",
    width: "150px",
  }),
  SortDiv: () => Config.Css.css({
    display: "flex",
    justifyContent: "flex-end",
  })
}

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  render() {
    //@@viewOn:private
    const {data: systemData} = useSystemData()
    console.log(systemData);

    const [sortOption, setSortOption] = useState("Date ↓");
    //@@vieOff:private

    //@@viewOn:render
    return (
      <>
        <RouteBar>
          UU Blogs
        </RouteBar>
        <div className={Css.SortDiv()} >
          <Select value={sortOption} className={Css.SortBar()} itemList={[
            { value: "Popularity ↑" },
            { value: "Popularity ↓" },
            { value: "Date ↑" },
            { value: "Date ↓" },
          ]} onChange={(e) => setSortOption(e.data.value)}
          />
        </div>
        <PostListProvider>
          {({ postDataList }) => {
            console.log(postDataList)
            return (
            <div>
            <PostListView
              postDataList={postDataList}
            />
            </div>
          )}
          }
        </PostListProvider>
      </>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
