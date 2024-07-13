import React from 'react'
import FilmCard from "./FilmCard";
import styles from './FilmList.module.css'
import { v4 as uuidv4 } from 'uuid';
import { notFound } from 'next/navigation'


interface FilmComponent {
    overview: string,
    id: number,
    vote_average: number,
    release_date: string,
    title: string,
    rating: number,
    genre_ids: number[],
    [key:string]: any
}
interface ListProps {
    session: string;
    page: any;
    rated: any;
}

async function getFilms(page: number) {
    if (!page) page = 1
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, {
            headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTdhYmViMmI4ODRiNWMyZWM0NmFjOWVhMmJjY2ZkMSIsIm5iZiI6MTcxOTI4NDEwNy43NjAxNjMsInN1YiI6IjY2N2EzMGJjNGFmOTM1YTgwY2Y2OTQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BYxyk2Wyu7uN44FwhqiRzrdSTcqmV_DL3VI8YXBRFLk`
            }
        }
        )
        if (!res.ok) {
            notFound()
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

async function getRatedFilms(session: string) {
    const res = await fetch(`https://api.themoviedb.org/3/guest_session/${session}/rated/movies`, {
        cache: 'no-store',
        next: { tags: ['rated'] },
        headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTdhYmViMmI4ODRiNWMyZWM0NmFjOWVhMmJjY2ZkMSIsIm5iZiI6MTcxOTI4NDEwNy43NjAxNjMsInN1YiI6IjY2N2EzMGJjNGFmOTM1YTgwY2Y2OTQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BYxyk2Wyu7uN44FwhqiRzrdSTcqmV_DL3VI8YXBRFLk`
        }
    }
    )
    if (!res.ok) {
        return 'No data found, try to rate some films first!'
    }
      
    return res.json();
}


export default async function FilmList({ page, rated, session}: ListProps) {
    const films = await getFilms(page)
    const genresList = await getGenres()
    const ratedFilms = await getRatedFilms(session)

    return (
        <div className={styles.filmList}>
            { !rated ? (
        films.results.map( (film: FilmComponent) => {
            const genres :string[] = []
            ratedFilms.results?.forEach((ratedFilm: FilmComponent) => {
                if (film.id == ratedFilm.id) {
                    return film.rating = ratedFilm.rating
                }
            })
            //Перебор жанров чтобы отобразить название а не id
                film.genre_ids.forEach((genre: number) => {
                    genresList.genres.forEach((element:any) => {
                        if (element.id === genre) {
                            genres.push(element.name)
                        }
                    });
                });
            return <FilmCard 
            key={uuidv4()} 
            title={film.title} 
            desc={film.overview} 
            date={film.release_date} 
            tags={genres} 
            img={film.poster_path} 
            yourRating={film.rating} 
            rating={Math.floor(film.vote_average * 10) / 10} 
            id={film.id}/>
        })
            ) : ( 
        typeof(ratedFilms) == 'string' ? ratedFilms :
        ratedFilms.results.map( (ratedFilm: FilmComponent) => {
            const genres :string[] = []

            //Перебор жанров чтобы отобразить название а не id
            ratedFilm.genre_ids.forEach((genre: number) => {
                    genresList.genres.forEach((element:any) => {
                        if (element.id === genre) {
                            genres.push(element.name)
                        }
                    });
                });
            return <FilmCard 
            key={uuidv4()} 
            title={ratedFilm.title} 
            desc={ratedFilm.overview} 
            date={ratedFilm.release_date} 
            tags={genres} 
            img={ratedFilm.poster_path} 
            rating={Math.floor(ratedFilm.vote_average * 10) / 10} 
            yourRating={ratedFilm.rating} 
            id={ratedFilm.id}/>  
        })
            ) 
            }
        </div>

    )
  }
