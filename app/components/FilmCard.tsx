import React from 'react'
import styles from './FilmCard.module.css'
import Image from 'next/image'
import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';

interface myCard {
  title: string;
  desc: string;
  tags: string[];
  date: string;
  img: string;
}

const TagList =({ list }: { list: string[] }) => {
    return list.map((tag: string) => {
      return (
        <div key={uuidv4()} className={styles.tag}>{tag}</div>
      )
    })
}

const FilmCard = ({ title, desc, tags, date, img }: myCard) => {

  //truncate description
  const maxLength = 180
  let truncDesc
  if (desc.length > maxLength) {
  truncDesc = desc.substring(0, maxLength);
  truncDesc = truncDesc.substring(0, Math.min(truncDesc.length, truncDesc.lastIndexOf(" "))) + '...'
  } else {
    truncDesc = desc
  }



  return (
    <div className={styles.cardContainer}>
      <Image alt='filmImg' 
      className={styles.previewImg} 
      width={900}
      height={1600}
      src={`https://image.tmdb.org/t/p/w500${img}`}
      />
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.date}>{format(date, 'LLLL dd, yyyy')}</div>
        <div className={styles.tags}>
          <TagList list={tags}/>
        </div>
        <div className={styles.description}>{truncDesc}</div>
      </div>
    </div>
  )
}

export default FilmCard