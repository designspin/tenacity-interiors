import React, { Component } from 'react'

class Banner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videoPlaying: false
        }
        this.screen = React.createRef();
        this.onPlayerReady = this.onPlayerReady.bind(this);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
        this.rescaleVideo = this.rescaleVideo.bind(this);
    }
    componentDidMount() {
        const playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/player_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        window.onYouTubePlayerAPIReady = () => {
            this.video = new window.YT.Player('tv', {
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                },
                playerVars: playerDefaults
            });

            this.rescaleVideo();
        }

        window.addEventListener('resize', this.rescaleVideo);

        
    }

    onPlayerReady() {
        this.video.loadVideoById({'videoId':'h5Nma9lOACg', 'endSeconds': 34});
        this.video.mute();
    }

    onPlayerStateChange(e) {
        if(e.data === 1) {
            this.setState({
                videoPlaying: true
            });
        } else if (e.data === window.YT.PlayerState.ENDED) {
            this.video.playVideo();
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
            <section id="banner" className={`major ${(this.state.videoPlaying) ? 'active' : ''}`}>
                <div ref={this.screen} className={`tv`}>
                    <div className={`screen mute`} id="tv"></div>
                </div>
                <div className="inner">
                    <div className="grid-wrapper">
                    <header className="major col-6">
                        <h1>Individually designed furniture by skilled Norfolk master craftsmen</h1>
                    </header>
                    <div className="content col-6">
                        <p>For professional or personal interior design projects, for any property, Tenacity Interiors offers a rare combination of skills to create perfect fitted and free-standing furniture. Based in Great Massingham, Norfolk, inspired designers, experienced cabinetmakers and specialist finishers will create bespoke furniture which is as unique as you.</p>
                        <ul className="actions">
                            <li><a href="#one" className="button"><i className="icon fa-play"></i></a></li>
                        </ul>
                    </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Banner
