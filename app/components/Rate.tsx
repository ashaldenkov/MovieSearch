'use client'
import ReactStars from 'react-stars'
import styles from './Rate.module.css'
import { useState, useEffect } from 'react'


interface rateComponent {
    id: number;
    rating?:number;
  }

const Rate = ({ id, rating }: rateComponent) => {
    //handle rating changes
    const ratingChanged = (newRating: any) => {
        setStarsValue(newRating)
      }
    
    const [skipCount, setSkipCount] = useState(true);

    const [starsValue, setStarsValue] = useState(rating)
    
      useEffect(() => {
        setStarsValue(rating)
      },[rating])

    useEffect(() => {
        const getSession = async () => {
            try {
               const session = await fetch('http://localhost:3000/api/', {
                method: "GET"
                })
                return session.json();
            } catch (err) {
                alert('An error happened during gaining sessionID')
            }
          };
          const postData = async () => {
            try {
                const sessionID = await getSession()
                fetch(`https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${sessionID.sessionID}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTdhYmViMmI4ODRiNWMyZWM0NmFjOWVhMmJjY2ZkMSIsIm5iZiI6MTcxOTI4NDEwNy43NjAxNjMsInN1YiI6IjY2N2EzMGJjNGFmOTM1YTgwY2Y2OTQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BYxyk2Wyu7uN44FwhqiRzrdSTcqmV_DL3VI8YXBRFLk`
                        },
                    body: JSON.stringify({"value":starsValue})
                })
            } catch (err) {
                alert('An error happened during gaining sessionID')
            }
          };

          //skip initial rendering not to post 0 rating
        if (skipCount) setSkipCount(false);
        if (!skipCount) {
          if (rating !== 0) {
            postData()
          }
        }

      }, [starsValue])

  return (
    <div>
      <ReactStars 
        count={10} 
        size={24} 
        half={false}
        value={starsValue}
        className={styles.stars}
        onChange={ratingChanged}
        color1={'#F0F0F0'}
        color2={'#FADB14'} /> 
    </div>
  )
}

export default Rate