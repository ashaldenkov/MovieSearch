import React from 'react'
import styles from "./SearchCard.module.css";
import Image from 'next/image'
import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';


interface myCard {
    overview: string,
    id: number,
    vote_average: number,
    release_date: string,
    title: string,
    poster_path: string,
    genre_ids: number[],
    [key:string]: any,
}

const TagList =({ list }: { list: string[] }) => {
    return list.map((tag: string) => {
      return (
        <div key={uuidv4()} className={styles.tag}>{tag}</div>
      )
    })
}

const SearchCard = ({ film, genreList}: { film: myCard, genreList:string[] }) => {
  return (
    <div className={styles.container}>
            <Image alt='filmImg' 
            className={styles.previewImg} 
            width={900}
            height={1600}
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
        />
        <div className={styles.overview}>
            <div className={styles.title}>{film.title}</div>
            <div className={styles.date}>{film.release_date ? format(film.release_date, 'LLLL dd, yyyy') : null}</div>
            <div className={styles.tags}>
                <TagList list={genreList}/>
            </div>
            <div className={styles.description}>{film.overview}</div>

        </div>

    </div>
  )
}

export default SearchCard

const card = {
    "adult": false,
    "backdrop_path": "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
    "genre_ids": [
        16,
        10751,
        12,
        35
    ],
    "id": 1022789,
    "original_language": "en",
    "original_title": "Inside Out 2",
    "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    "popularity": 6206.176,
    "poster_path": "/t7bhjraXuN4hd3yZVBVVhP3BdX0.jpg",
    "release_date": "2024-06-11",
    "title": "Inside Out 2",
    "video": false,
    "vote_average": 7.8,
    "vote_count": 1140
}