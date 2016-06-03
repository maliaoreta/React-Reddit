'use strict';

class RedditContent extends React.Component{
  getRedditContent() {
    return this.props.redditContent.data.children.map((eachPost) => {
      if (eachPost.data.preview) {
        return (
          <div className="post">
            <div className="postTitle" style={{fontWeight: 'bold'}}>{eachPost.data.title}</div>
            <img src={eachPost.data.preview.images[0].source.url} style={{height: 500, width: 500}} />
          </div>
        )
      } else {
        return (
          <div className="postTitle" style={{fontWeight: 'bold'}}>
            {eachPost.data.title}
          </div>
        )
      }
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