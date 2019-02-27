import React, { Component } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import Observer from 'react-intersection-observer';
import { NavConsumer } from './layout';

import bgImage from '../assets/images/home-hero.jpg';

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videoScriptLoaded: null,
            videoHasPlayed: false,
            videoLoading: false,
            videoPlaying: false,
            videoActive: false,
        }
        this.screen = React.createRef();
        this.onPlayerReady = this.onPlayerReady.bind(this);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
        this.rescaleVideo = this.rescaleVideo.bind(this);
        this.onPlayClick = this.onPlayClick.bind(this);
        this.onStopClick = this.onStopClick.bind(this);
    }

    componentDidMount() {
        this.setState({
            videoScriptLoaded: (window.YT && window.YT.Player) ? true : false
        });
    }

    onStopClick(e) {
        e.preventDefault();
        this.video.stopVideo();
        
        this.setState({
            videoPlaying: false,
            videoActive: false,
            videoLoading: false
        })
        window.removeEventListener('resize', this.rescaleVideo);
    }

    setVideo() {
        const playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
        this.video = new window.YT.Player('tv', {
            events: {
                'onReady': this.onPlayerReady,
                'onStateChange': this.onPlayerStateChange
            },
            playerVars: playerDefaults
        });
        this.setState({
            videoHasPlayed: true
        })
    }

    onPlayClick(e) {
        e.preventDefault();
        
        this.setState({
            videoActive: true,
            videoLoading: true
        });

        if(!this.state.videoScriptLoaded) {
            
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/player_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
            window.onYouTubePlayerAPIReady = () => {
                this.setState({
                    videoScriptLoaded: true
                });

                
                this.setVideo();
                
            }
        } else if (!this.state.videoHasPlayed) {
            this.setVideo();
        } else {
            this.video.playVideo();
        }
        window.addEventListener('resize', this.rescaleVideo);
    }

    onPlayerReady() {
        console.log("Player Ready!");
        this.video.loadVideoById({'videoId': this.props.videoId});
    }

    onPlayerStateChange(e) {
        if(e.data === 1) {
            this.rescaleVideo();
            this.setState({
                videoPlaying: true,
                videoLoading: false
            });
        } else if (e.data === window.YT.PlayerState.ENDED) {
            this.setState({
                videoPlaying: false
            })
        }
    }

    rescaleVideo() {
        const { current } = this.screen;
        let w = current.clientWidth;
        let h = current.clientHeight;
                
        if(w/h > 16/9) {
            this.video.setSize(w, w/16*9);
            current.firstChild.style.left = `-${(current.offsetWidth - w) / 2}px`;
        } else {
            this.video.setSize(h/9*16, h);
            current.firstChild.style.left = `-${(current.offsetWidth - w) / 2}px`;
        }
    }

    render() {
        return (
        <NavConsumer>
        {({ trigger }) => (
            <Observer 
                id="banner"
                tag="section" 
                className={`major ${(this.state.videoPlaying) ? 'active' : ''}`}
                style={{ backgroundImage: `url(https://img.youtube.com/vi/${this.props.videoId}/maxresdefault.jpg)`}}
                threshold={0}
                onChange={(inView) => { trigger(!inView)}}>
                    <div ref={this.screen} className={`tv ${(this.state.videoActive) ? 'on' : ''}`}>
                        <div className="screen-holder">
                            <div className={`screen mute`} id="tv"></div>
                        </div>
                        <a href="?stop=true" aria-label="Stop Video" onClick={this.onStopClick} className="button"><FaStop /></a>
                    </div>
                    <div className="inner">
                        <div className="grid-wrapper">
                        <header className="major col-6">
                            <h1>{this.props.title}</h1>
                        </header>
                        <div className="content col-6">
                            <p>{this.props.introText}</p>
                            <ul className="actions">
                                <li><a href="?play=true" aria-label="Play Video" onClick={this.onPlayClick} className="button"><FaPlay /></a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
            </Observer>
        )}
        </NavConsumer>
        )
    }
}

export default Banner
