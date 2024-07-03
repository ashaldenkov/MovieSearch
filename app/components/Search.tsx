'use client'
import styles from "./Search.module.css";
import { useState, useEffect } from 'react'
import SearchCard from "./SearchCard";
import { Spin, ConfigProvider } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

  function debounce(callback:any, delay:number) {
    let timeoutId:any;
  
    return function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    }
  }
  
  async function getGenres() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list', {
        headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTdhYmViMmI4ODRiNWMyZWM0NmFjOWVhMmJjY2ZkMSIsIm5iZiI6MTcxOTI4NDEwNy43NjAxNjMsInN1YiI6IjY2N2EzMGJjNGFmOTM1YTgwY2Y2OTQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BYxyk2Wyu7uN44FwhqiRzrdSTcqmV_DL3VI8YXBRFLk`
        }
    }
    )
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json();
}



const Search = () => {
    //классы для кнопок и переключения активного значения
    const [firstIsActive, setFirstIsActive] = useState(true);
    const firstClassname = firstIsActive
    ? `${styles.searchBtn} ${styles.active}`
    : styles.searchBtn;
    const secondClassname = firstIsActive
    ? styles.ratedBtn
    : `${styles.ratedBtn} ${styles.active}`;

//переменные для поиска и загрузки
    const [data, setData] = useState<any>()
    const [isLoading, setLoading] = useState(false)
    const [text, setText] = useState('')
    const [genres, setGenres] = useState<any>()

//обновление поиска при изменении инпута
    useEffect(() => {
        new Promise(resolve => setTimeout(resolve,10000))
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/search/movie?query=${text}`, {
            cache: "no-store", 
            headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTdhYmViMmI4ODRiNWMyZWM0NmFjOWVhMmJjY2ZkMSIsIm5iZiI6MTcxOTI4NDEwNy43NjAxNjMsInN1YiI6IjY2N2EzMGJjNGFmOTM1YTgwY2Y2OTQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BYxyk2Wyu7uN44FwhqiRzrdSTcqmV_DL3VI8YXBRFLk`
            }
        }
        )
          .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            return res.json()})
          .then((data) => {
            setData(data)
            setLoading(false)
          })
      }, [text])
//загрузка жанров для карточек
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/movie/list', {
            headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTdhYmViMmI4ODRiNWMyZWM0NmFjOWVhMmJjY2ZkMSIsIm5iZiI6MTcxOTI4NDEwNy43NjAxNjMsInN1YiI6IjY2N2EzMGJjNGFmOTM1YTgwY2Y2OTQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BYxyk2Wyu7uN44FwhqiRzrdSTcqmV_DL3VI8YXBRFLk`
            }
        }
        )
        .then((res) => res.json())
        .then((data) => {
            setGenres(data)
        })
    }, [])

  return (
    <div className={styles.container}>
        <div className={styles.tab}>
            <button className={firstClassname} onClick={() => setFirstIsActive(true)}>Search</button>
            <button className={secondClassname} onClick={() => setFirstIsActive(false)}>Rated</button>
        </div>
        <form>
            <input className={styles.input}
            placeholder="Type to search..."
            onChange={(e) => debounce(setText(e.target.value), 1000)}
            value={text}
            />
        </form>
        <div className={styles.searchResults}>
        { isLoading ? <Spin
            wrapperClassName={styles.spin}
            indicator={<LoadingOutlined spin />}
            > </Spin>
            : null 
        }
        {data ? data.results.slice(0,4).map( (film: any) => {
                    const genreList :string[] = []
                    //Перебор жанров чтобы отобразить название а не id
                        film.genre_ids.forEach((genre: number) => {
                            genres.genres.forEach((element:any) => {
                                if (element.id === genre) {
                                    genreList.push(element.name)
                                }
                            });
                        });
                    return <SearchCard key={film.id} film={film} genreList={genreList}/>
                })
                : null
        }
        { !data?.results.length ? (text ? <div className={styles.notFound}>No matches found! Try another search combination</div> : null) : null}
        </div>
    </div>
  )
}

export default Search