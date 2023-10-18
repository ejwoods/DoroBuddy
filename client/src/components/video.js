import React, { useState, useEffect } from 'react';
import { parse as parseTime } from 'tinyduration';

// CAN REMOVE - tinyduration test
// const timeToParse = 'PT5M7S'
// const parsedObj = parseTime(timeToParse)
// console.log('checking parsed obj', parsedObj.minutes)

const VideoDisplay = (props) => {
  const [videoState, setVideoState] = useState(['Videos component initial state'])

  useEffect(() => {
    fetch('/api/videos')
      .then(data => {
        console.log('data', data)
        return data.json()
      })
      .then(videos => {
        console.log('videos: ', videos)
        const videoList = [];
        let videoId = 1;
        videos.map((video) => {
          videoList.push(<Video 
            videoName={video.title}
            url={video.url}
            key={'videoItem-' + videoId++}
          />)
        });
        setVideoState(videoList)
      })
  }, []);

  return (
    <article>
      <h3>Video Display:</h3>
      <ul>
        {videoState}
      </ul>
    </article>
  )
}

const Video = ({ videoName, url }) => {
  return (
    <li>
      <section>{videoName}</section>
      <section>{url}</section>
    </li>
  )
}

export default VideoDisplay;