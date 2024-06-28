
import React from 'react'
import FilmCard from "./FilmCard";
import styles from './FilmList.module.css'

interface FilmComponent {
    overview: string,
    id: number,
    vote_average: number,
    release_date: string,
    title: string,
    genre_ids: number[],
    [key:string]: any
}


  async function getFilms() {
        const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
            cache: "force-cache", 
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

export default async function FilmList() {
    const films = await getFilms()
    const genresList = await getGenres()

    return (
        <div className={styles.filmList}>
            { films.results.map( (film: FilmComponent) => {
                const genres :string[] = []

                //Перебор жанров чтобы отобразить название а не id
                    film.genre_ids.forEach((genre: number) => {
                        genresList.genres.forEach((element:any) => {
                            if (element.id === genre) {
                                genres.push(element.name)
                            }
                        });
                            
                        
                    });
                return <FilmCard key={film.id} title={film.title} desc={film.overview} date={film.release_date} tags={genres} img={film.poster_path}/>
            })
            }
        </div>

    )
  }
