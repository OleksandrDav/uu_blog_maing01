//@@viewOn:imports
import {createVisualComponent, useSession} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import {useSystemData} from "uu_plus4u5g02";
//@@viewOff:imports

//@@viewOn:constants
const Css = {
  buttons: () => Config.Css.css({
    margin: "5px",
  }),
};
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const {data: systemData} = useSystemData()
    const itemList = [
      //button that sends user to the home page
      { component: <Uu5Elements.Button className={Css.buttons()} colorScheme="blue" icon="uugds-home" href="home"/>
      },
      { component: <Uu5Elements.Button className={Css.buttons()} colorScheme="blue" href="home">
            Popular</Uu5Elements.Button>
      },
      { component: <Uu5Elements.Input className={Css.buttons()} colorScheme="blue" placeholder="Search..." /> },
      { component: <Uu5Elements.Button className={Css.buttons()} colorScheme="blue" href="home" onClick={() => {
           }}>Search!</Uu5Elements.Button>
      }
    ];

    //get user authentication
    const identity = useSession();
    if (identity.state === "authenticated") {
      itemList.push({ component: <Uu5Elements.Button className={Css.buttons()} colorScheme="green" href="createpost">
          New Post</Uu5Elements.Button>
      });

    }

    const label = systemData?.asidData.name;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return(
      <div className={Config.Css.css({ padding: "16px", display: "flex" })}>
        <Uu5Elements.Text
          category="story"
          segment="heading"
          type="h1"
          colorScheme="building"
          {...props}
        >
          { label }
        </Uu5Elements.Text>
        <Uu5Elements.ActionGroup view={"short"} itemList={itemList} {...props}/>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
