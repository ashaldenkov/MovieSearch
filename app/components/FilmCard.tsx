import React from 'react'
import styles from './FilmCard.module.css'
import Image from 'next/image'
import { format, isValid } from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import Rate from './Rate';

interface myCard {
  title: string;
  desc: string;
  tags: string[];
  date: string;
  img: string;
  rating: number;
  yourRating?: number;
  id: number;
}

const TagList =({ list }: { list: string[] }) => {
    return list.map((tag: string) => {
      return (
        <div key={uuidv4()} className={styles.tag}>{tag}</div>
      )
    })
}

const FilmCard = ({ title, desc, tags, date, img, rating, id, yourRating }: myCard) => {

  //truncate description
  const maxLength = 130
  let truncDesc
  if (desc.length > maxLength) {
  truncDesc = desc.substring(0, maxLength);
  truncDesc = truncDesc.substring(0, Math.min(truncDesc.length, truncDesc.lastIndexOf(" "))) + '...'
  } else {
    truncDesc = desc
  }

  const ratingColor = (num: number) => {
    if (num <= 3) {
      return 'bad'
    }
    if (num > 3 && num <= 5) {
      return 'low'
    }
    if (num > 5 && num <= 7) {
      return 'med'
    }
    else {
      return 'high'
    }
  }
  const itemColor = ratingColor(rating)

  return (
    <div className={styles.cardContainer}>
      <Image alt='filmImg' 
      className={styles.previewImg} 
      width={900}
      height={1600}
      src={`https://image.tmdb.org/t/p/w500${img}`}
      />
      <div className={styles.info}>
        <div className={styles.titleAndRating}>
          <div className={styles.title}>{title}</div>
          <div className={styles.rating} data-color={itemColor}>{rating}</div>
        </div>
        
        <div className={styles.date}>{date ? format(date, 'LLLL dd, yyyy') : 'Date not found'}</div>
        <div className={styles.tags}>
          <TagList list={tags}/>
        </div>
        <div className={styles.description}>{truncDesc}</div>
        <Rate id={id} rating={yourRating}/>
      </div>
    </div>
  )
}

export default FilmCard