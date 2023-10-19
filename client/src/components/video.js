import React, { useState, useEffect } from 'react';
import { parse as parseTime } from 'tinyduration';

// CAN REMOVE - tinyduration test
// const timeToParse = 'PT5M7S'
// const parsedObj = parseTime(timeToParse)
// console.log('checking parsed obj', parsedObj.minutes)

const VideoDisplay = (props) => {
  const [videoState, setVideoState] = useState(['Videos component initial state'])


  useEffect(() => {
    fetch('/api/videos/submit', {
      method: 'POST', // need to set correct content headers on this
      body: JSON.stringify({
        "playlistId": "PL77GLSNDp6v77qkYUzsUGv8-csaX-M3ui"
      }),
      headers: { 'content-type': 'application/json' }
    })
      .then(response => {
        console.log('response in json..', response)
        return response.json()
      })  // parsing JSON string from response body into usuable JS
      .then(videos => {
        console.log(typeof videos)
        console.log('videos: ', videos)
        const videoList = [];
        let videoId = 1;
        videos.map((video) => {
          const dur = parseTime(video.Duration)
          console.log('curr vid dur', dur)
          if (dur.minutes < 5) {
              videoList.push(<Video 
                videoName={video.Name}
                url={'https://www.youtube.com/watch?v=' + video.Id}
                duration={`${dur.minutes} minutes ${dur.seconds} seconds`}
                key={'videoItem-' + videoId++}
                />)
          }
        });
        console.log('video list: ',  videoList)
        setVideoState(videoList)
      })
      .catch((err) => console.warn(err))
  }, []);

  return (
    <article>
      <h3>Here are your videos:</h3>
      <ul>
        {videoState}
      </ul>
    </article>
  )
}

const Video = ({ videoName, url, duration }) => {
  return (
    <li>
      <a href={url}>{videoName}</a>
      {/* <a>{url}</a> */}
      <section>{duration}</section>
    </li>
  )
}

export default VideoDisplay;