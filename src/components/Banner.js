import React, { Component } from 'react';
import { FaPlay, FaStop, FaExpand } from 'react-icons/fa';
import Observer from 'react-intersection-observer';
import { NavConsumer } from './layout';
import YouTube from 'react-youtube';

class Banner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerReady: false,
      playing: false,
      player: false
    }

    this._onReady = this._onReady.bind(this);
    this._onEnd = this._onEnd.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this.onPlayClick = this.onPlayClick.bind(this);

    document.addEventListener('webkitfullscreenchange', this.fullScreenExit.bind(this), false);
    document.addEventListener('fullscreenchange', this.fullScreenExit.bind(this), false);
    document.addEventListener('mozfullscreenchange', this.fullScreenExit.bind(this), false);
    document.addEventListener('MSFullscreenChange', this.fullScreenExit.bind(this), false);
  }

  _onReady(e) {
    e.target.mute();
    e.target.playVideo();

    this.setState({
      playerReady: true,
      playing: false,
      player: e.target
    });
  }

  _onEnd(e) {
    e.target.playVideo();
  }

  _onPlay(e) {
    this.setState({ playing: true })
  }

  fullScreenExit() {
    if(this.state.player.isMuted()) {
      this.state.player.unMute();
    } else {
      this.state.player.mute();
    }
  }

  onPlayClick() {  
    if(this.state.player) {
      let iFrame = document.querySelector('.video-iframe');
      let requestFullScreen = iFrame.requestFullScreen || iFrame.mozRequestFullScreen || iFrame.webkitRequestFullScreen;
      
      if(requestFullScreen) {
        
        requestFullScreen.bind(iFrame)();
        this.state.player.unMute();

        
      }

    }
  }

  render() {
    const videoOptions = {
      playerVars: {
        autoplay: 0,
        controls: 0,
        rel: 0,
        showinfo: 0
      }
    }

    return (
    <NavConsumer>
      {({ trigger }) => (
          <Observer 
              id="banner"
              tag="section" 
              className={`major`}
              threshold={0}
              style={{ backgroundImage: !this.state.playing ? `url(https://img.youtube.com/vi/${this.props.videoId}/maxresdefault.jpg)` : 'none'}}
              onChange={(inView) => { trigger(!inView)}}>
              <div className="video-background">
                <div className="video-foreground">
                  <YouTube
                    videoId={this.props.videoId}
                    opts={videoOptions}
                    className="video-iframe"
                    onReady={this._onReady}
                    onEnd={this._onEnd}
                    onPlay={this._onPlay}
                  />      
                </div>
              </div>     
              <div className="inner">
                  <div className="grid-wrapper">
                  <header className="major col-6">
                      <h1>{this.props.title}</h1>
                  </header>
                  <div className="content col-6">
                      <p>{this.props.introText}</p>
                      {this.state.playing &&
                        <ul className="actions">
                            <li><button onClick={this.onPlayClick} className="button"><FaPlay /></button></li>
                        </ul>
                      }
                  </div>
                  </div>
              </div> 
          </Observer>
      )}
    </NavConsumer>
    );
  }
}

export default Banner;