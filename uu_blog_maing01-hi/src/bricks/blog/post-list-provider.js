//@@viewOn:imports
import {createComponent, useCallback, useDataList, useState, Utils} from "uu5g05";
import Config from "./config/config.js";
import Calls from "../../calls.js";
//@@viewOff:imports

//@@viewOn:constants
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

  render({ children }) {
    //@@viewOn:private
    const pageSize = 10;

    const postDataList = useDataList({
      pageSize,
      handlerMap: {
        load: Calls.postsLoad,
      },
      itemHandlerMap: {
        delete: Calls.postDelete,
      }
    });
    //const { state, data, newData, errorData, pendingData, handlerMap, errorMap } = postDataList;

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return typeof children === "function" ? children({ postDataList }) : postDataList;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PostListProvider };
export default PostListProvider;
//@@viewOff:exports
