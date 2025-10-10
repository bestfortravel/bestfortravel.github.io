import React    from "react";
import template from "./Feed.jsx";

class Feed extends React.Component {
  render() {
    return template.call(this);
  }
}

export default Feed;
