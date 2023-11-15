//@@viewOn:imports
import { createVisualComponent, Utils, Content, useRef } from "uu5g05";
import { Block, Grid, UuGds } from "uu5g05-elements";
import { Form, FormFile, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import { FormEditor } from "uu5richtextg01-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      fontFamily: "Arial, sans-serif",
      maxWidth: "1000px",
      margin: "5px auto",
      padding: "5px",
      backgroundColor: "#f4f4f4",
      borderRadius: "10px",
    }),
  paper: () =>
    Config.Css.css({
      backgroundColor: "#fff",
      height: "80vh",
      margin: "30px",
      padding: "30px",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
    }),
  button: () =>
    Config.Css.css({
      padding: "10px 20px",
      marginRight: "15px",
      border: "1px solid #333",
      cursor: "pointer",
      borderRadius: "4px",
      backgroundColor: "#fff",
      textTransform: "uppercase",
      borderColor: "rgba(83, 194, 250, 0.8)",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }),
  image: () =>
    Config.Css.css({
      width: "100%",
      marginBottom: "20px",
    }),
  title: () =>
    Config.Css.css({
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "18px",
      boxSizing: "border-box",
    }),
  editor: () =>
    Config.Css.css({
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "18px",
      boxSizing: "border-box",
    }),
  buttonUpload: () =>
    Config.Css.css({
      padding: "10px 20px",
      marginRight: "15px",
      border: "1px solid #333",
      cursor: "pointer",
      borderRadius: "4px",
      backgroundColor: "rgba(83, 194, 250, 0.8)",
      textTransform: "uppercase",
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }),
  footer: () =>
    Config.Css.css({
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
    function handleSubmit({ data }) {
      console.log(data.value.file);
      console.log(data.value.title);
      console.log(data.value.post);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <Form onSubmit={handleSubmit}>
        <div className={Css.main()}>
          <div className={Css.paper()}>
            <Block
              header="Create a new post"
              headerType="heading"
              info="Create a new post and upload it to the blog."
              footer={
                <Grid
                  templateColumns={{ xs: "1fr", s: "auto" }}
                  columnGap={UuGds.SpacingPalette.getValue(["fixed", "c"])}
                  justifyContent={{ s: "start" }}
                  flow="column"
                >
                  <SubmitButton>Upload</SubmitButton>
                  <CancelButton />
                </Grid>
              }
            >
              <Grid>
                <FormFile name="file" label="File" accept="image/*" placeholder="Choose an image" />
                <FormText name="title" placeholder="Post title..." required label="Post title" />
                <FormEditor name="post" placeholder="Write the text of the post..." required label="Post text" />
              </Grid>
            </Block>
          </div>
        </div>
      </Form>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreatePost };
export default CreatePost;
//@@viewOff:exports