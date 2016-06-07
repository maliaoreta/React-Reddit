'use strict';

import styles from './componentStyles/RedditContent.scss';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { black, grey400, grey600 } from 'material-ui/styles/colors';

const style = {
  underlineFocusStyle: {
    borderColor: black,
    borderWidth: '1px'
  },
  underlineStyle: {
    borderColor: grey400,
    borderWidth: '1px'
  },
  inputStyle: {
    color: grey600,
    fontWeight: 300
  },
  inputStyleFocus: {
    color: black,
    fontWeight: 400
  }
}

class RedditContent extends React.Component{
  constructor(props) {
    super (props);

    this.state = {
      giphyAlert: false,
      giphyData: {},
      postURL: '',
      postTitle: '',
      textFieldFocus: false
    }

    this.onMouseDown = this.onMouseDown.bind(this);
    this.getGiphy = this.getGiphy.bind(this);
    this.handlePostTitleClick = this.handlePostTitleClick.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleTextFieldFocus = this.handleTextFieldFocus.bind(this);
  }
  onMouseDown() {
    window.getSelection().empty();
    this.setState({giphyAlert: false})
    this.setState({giphyData: {}})
  }
  handleTextFieldFocus() {
    this.setState({textFieldFocus: !this.state.textFieldFocus})
  }
  getRedditContent() {
    return this.props.redditContent.data.children.map((eachPost) => {
      if (eachPost.data.media) {
        // if post has gif preview
        let gifSrc = eachPost.data.secure_media_embed.content.split(' ');
        gifSrc = gifSrc[2].replace('src=\"', '').replace(gifSrc[gifSrc.length-1], '').replace(/&amp;/g, '&');

        return (
          <div key={eachPost.data.id} className="post">
            <div className="postTitle">
              <a href={eachPost.data.url} onClick={this.handlePostTitleClick}><span>{eachPost.data.title}</span></a>
            </div>
            <iframe className="postPreview" src={gifSrc} scrolling="no" />
          </div>
        )
      }
      else if (eachPost.data.preview) {
        // if post has an image preview
        return (
          <div key={eachPost.data.id} className="post">
            <div className="postTitle">
              <a href={eachPost.data.url} onClick={this.handlePostTitleClick}><span>{eachPost.data.title}</span></a>
            </div>
            <img className="postPreview" src={eachPost.data.preview.images[0].source.url} />
          </div>
        )
      } 
      else {
        return (
          // regular text post
          <div key={eachPost.data.id} className="post">
            <div className="postTitle">
              <a href={eachPost.data.url} onClick={this.handlePostTitleClick}>{eachPost.data.title}</a>
            </div>
          </div>
        )
      }
    })
  }
  getGiphy() {
    let giphyQuery = this.refs.giphyQuery.input.value.replace(/ /g, '+');


    fetch(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${giphyQuery}`)
      .then((response) => response.text())
      .then((responseText) => {
        this.setState({giphyData: JSON.parse(responseText)})
      })
      .catch((error) => {
        console.error(error);
      })
  }
  handlePostTitleClick(event) {
    event.preventDefault();
    this.setState({giphyAlert: true})
    this.setState({postURL: event.currentTarget.getAttribute('href')})
    this.setState({postTitle: event.currentTarget.text})
  }
  handleViewClick() {
    window.location = this.state.postURL;
  }
  render() {
    let displayGiphyAlert = 'none';
    if (this.props.giphyAlert === true) {
      displayGiphyAlert = 'block';
    }

    const actions = [
      <button className="giphyButton" onClick={this.getGiphy}>Giphy This</button>,
      <button className="viewPostButtton" onClick={this.handleViewClick}>View This Post</button> 
    ]

    return (
      <div className="redditContent">
        <Dialog
          title="Giphy"
          actions={actions} 
          modal={false}
          open={this.state.giphyAlert}
          onRequestClose={this.onMouseDown}
          bodyStyle={{ backgroundColor: '#FFFFFF' }}
          titleStyle={{ backgroundColor: '#ADABAC' }}
          actionsContainerStyle={{ backgroundColor: '#ADABAC' }}
        >
          <div className="giphyTextArea">
            <TextField
              defaultValue={this.state.postTitle}
              className="giphyTextArea"
              id="text-field-default"
              ref="giphyQuery"
              underlineFocusStyle={style.underlineFocusStyle}
              underlineStyle={style.underlineStyle}
              inputStyle={this.state.textFieldFocus ? style.inputStyleFocus : style.inputStyle}
              onFocus={this.handleTextFieldFocus}
              onBlur={this.handleTextFieldFocus}
            />
          </div>
          {this.state.giphyData.data ? <img className="giphy" src={this.state.giphyData.data.image_url} /> : null}
        </Dialog>
        {this.props.redditContent.data ? this.getRedditContent() : null}
      </div>
    )
  }
}

export default RedditContent;
