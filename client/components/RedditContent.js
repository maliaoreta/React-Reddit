'use strict';

class RedditContent extends React.Component{
  getRedditContent() {
    return this.props.redditContent.data.children.map((eachPost) => {
      return (
        <div>
          {eachPost.data.title}
        </div>
      )
    })
  }
  render() {
    return (
      <div className="redditContent">
        {this.getRedditContent()}
      </div>
    )
  }
}

export default RedditContent;