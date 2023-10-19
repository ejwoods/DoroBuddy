import React, { useState, useEffect } from 'react';
import { parse as parseTime } from 'tinyduration';


const VideoDisplay = (props) => {
  const [videoState, setVideoState] = useState(['Videos component initial state'])
  
  const InputSection = (props) => {
    // const handleClick = () => {
    //   fetch('/api/videos/submit', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       "playlistId": "PL77GLSNDp6v77qkYUzsUGv8-csaX-M3ui"
    //     }),
    //     headers: { 'content-type': 'application/json' }
    //   })
    //     .then(response => {
    //       console.log('response in json..', response)
    //       return response.json()
    //     })  // parsing JSON string from response body into useable JS
    //     .then(videos => {
    //       // console.log('videos: ', videos)
    //       const videoList = [];
    //       let videoId = 1;
    //       videos.map((video) => {
    //         const dur = parseTime(video.Duration)
    //         // console.log('curr vid dur', dur)
    //         if (dur.minutes < 5) {
    //             videoList.push(<Video 
    //               videoName={video.Name}
    //               url={'https://www.youtube.com/watch?v=' + video.Id}
    //               duration={`${dur.minutes} minutes ${dur.seconds} seconds`}
    //               key={'videoItem-' + videoId++}
    //               />)
    //         }
    //       });
    //       console.log('video list: ',  videoList)
    //       setVideoState(videoList)
    //     })
    //     .catch((err) => console.warn(err))
    // }

    // useEffect(() => {
    //   const fetchVideos = () => {
    //     fetch('/api/videos/submit', {
    //     method: 'POST', // need to set correct content headers on this
    //     body: JSON.stringify({
    //       "playlistId": "PL77GLSNDp6v77qkYUzsUGv8-csaX-M3ui"
    //     }),
    //     headers: { 'content-type': 'application/json' }
    //   })
    //     .then(response => {
    //       console.log('response in json..', response)
    //       return response.json()
    //     })  // parsing JSON string from response body into usuable JS
    //     .then(videos => {
    //       // console.log('videos: ', videos)
    //       const videoList = [];
    //       let videoId = 1;
    //       videos.map((video) => {
    //         const dur = parseTime(video.Duration)
    //         // console.log('curr vid dur', dur)
    //         if (dur.minutes < 5) {
    //             videoList.push(<Video 
    //               videoName={video.Name}
    //               url={'https://www.youtube.com/watch?v=' + video.Id}
    //               duration={`${dur.minutes} minutes ${dur.seconds} seconds`}
    //               key={'videoItem-' + videoId++}
    //               />)
    //         }
    //       });
    //       console.log('video list: ',  videoList)
    //       setVideoState(videoList)
    //     })
    //     .catch((err) => console.warn(err))
    //   }
  
    //   fetchVideos();
  
    // }, []);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('e', e)

      const form = e.target;
      // console.log('form', form)
      const formData = new FormData(form);
      // console.log('form data?', formData)
      const formJson = Object.fromEntries(formData.entries());
      console.log('formJson?', formJson)
      // fetch
      fetch('/api/videos/submit', {
        method: 'POST',
        body: JSON.stringify({
          "playlistId": formJson.textinput
        }),
        headers: { 'content-type': 'application/json' }
      })
        .then(response => {
          console.log('response in json..', response)
          return response.json()
        })  // parsing JSON string from response body into useable JS
        .then(videos => {
          // console.log('videos: ', videos)
          const videoList = [];
          let videoId = 1;
          videos.map((video) => {
            const dur = parseTime(video.Duration)
            // console.log('curr vid dur', dur)
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
    }


    

    return (
      <article>
        <h3>Let's find some videos</h3>
        <form method='POST' onSubmit={handleSubmit}>
          <label htmlFor='plInput'>
            Input your playlist id: <input name='textinput' type='text' id='plInput'/>
          </label>
          <button type='submit'>Submit</button><br/>
          <label htmlFor='minuteRange'> 
            This doesn't do anything! <input type='range' min='1' max='15' id='minuteRange'/>
          </label>
          
        </form>
      </article>
    )
  }
  

  

  return (
    <article>
      <InputSection />
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

export { VideoDisplay };