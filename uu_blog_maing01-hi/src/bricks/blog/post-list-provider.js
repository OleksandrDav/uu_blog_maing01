//@@viewOn:imports
import { createComponent, useState, Utils } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const initialPostList = [
  {
    id: "5fb245tgr",
    name: "Post 1",
    postText: "Some very long post text",
    creatorName: "Oleksandr Davydovskyi",
    totalViews: "34",
    imageUrl: "https://loremflickr.com/640/360"
  },
  {
    id: "5hg36yd",
    name: "Post 2",
    postText: "Another post text here",
    creatorName: "Emily Johnson",
    totalViews: "45",
    imageUrl: "https://loremflickr.com/640/360"
  },
  {
    id: "98sjwmd",
    name: "Post 3",
    postText: "Lorem ipsum dolor sit amet",
    creatorName: "Daniel Brown",
    totalViews: "22",
    imageUrl: "https://loremflickr.com/640/360"
  }
  // Add more objects as needed
];
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const PostListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PostListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [postList, setPostList] = useState(initialPostList);

    function handleDelete(postId) {
      const updatedPostList = postList.filter((post) => post.id !== postId)
      setPostList(updatedPostList)
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const value = { postList, handleDelete };
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PostListProvider };
export default PostListProvider;
//@@viewOff:exports
