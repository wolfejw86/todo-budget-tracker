import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { renderRoutes } from "../imports/ui/Router.jsx";

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById("react-target"));
});
