//@@viewOn:imports
import { createVisualComponent, Utils, Content, useRef } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1000px',
    margin: '5px auto',
    padding: '5px',
    backgroundColor: '#f4f4f4',
    borderRadius: "10px",
  }),
  paper: () => Config.Css.css({
    backgroundColor: '#fff',
    height: "80vh",
    margin: '30px',
    padding: '30px',
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column"
  }),
  button: () => Config.Css.css({
    padding: '10px 20px',
    marginRight: '15px',
    border: '1px solid #333',
    cursor: 'pointer',
    borderRadius: '4px',
    backgroundColor: '#fff',
    textTransform: 'uppercase',
    borderColor: 'rgba(83, 194, 250, 0.8)',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  }),
  image: () => Config.Css.css({
    width: '100%',
    marginBottom: '20px',
  }),
  title: () => Config.Css.css({
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '18px',
    boxSizing: 'border-box',
  }),
  editor: () => Config.Css.css({
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '18px',
    boxSizing: 'border-box',
  }),
  buttonUpload: () => Config.Css.css({
    padding: '10px 20px',
    marginRight: '15px',
    border: '1px solid #333',
    cursor: 'pointer',
    borderRadius: '4px',
    backgroundColor: 'rgba(83, 194, 250, 0.8)',
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  }),
  footer: () => Config.Css.css({
    marginTop: "auto",
  }),
};

//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const CreatePost = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreatePost",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    const inputFileRef = useRef(null)
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div className={Css.main()}>
        <div className={Css.paper()}>
          <div>
            <button className={Css.button()} onClick={() => inputFileRef.current.click()}>
              Upload Image
            </button>
            <input
              type="file"
              ref={inputFileRef}
              style={{ display: 'none' }}
            />
          </div>
          <button
            className={Css.button()}
            style={{ display: 'none' }}
            id="removeButton"
          >
            Delete
          </button>
          <img
            className={Css.image()}
            id="uploadedImage"
            style={{ display: 'none' }}
            alt="Uploaded"
          />
          <br />
          <input
            className={Css.title()}
            type="text"
            placeholder="Post title..."
          />
          <textarea
            className={Css.editor()}
            id="editor"
            placeholder="Write the text of the post..."
          ></textarea>
          <div className={Css.footer()}>
            <button className={Css.buttonUpload()}>Upload Post</button>
            <a href="/">
              <button className={Css.button()}>Cancel</button>
            </a>
          </div>
        </div>
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreatePost };
export default CreatePost;
//@@viewOff:exports
