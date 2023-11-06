//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import PostListProvider from "../bricks/blog/post-list-provider.js";
import PostListView from "../bricks/blog/post-list-view.js";
//@@viewOff:imports

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  render() {
    //@@viewOn:private
    
    //@@vieOff:private

    //@@viewOn:render
    return (
      <>
        <PostListProvider>
          {({ postList, handleDelete }) => (
              <PostListView 
              postList={postList} 
              handleDelete={handleDelete}
               />
            )
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