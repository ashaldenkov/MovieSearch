'use client'

import React from 'react'
import { Pagination } from "antd";
import styles from './Pages.module.css'
import { useState, useEffect } from 'react'
import { useRouter  } from 'next/navigation';

export default function Pages() {
  const [data, setData] = useState<any>()
  
  const [currPage, setCurrPage] = useState(1)

  const { push } = useRouter();


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular`, {
        headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTdhYmViMmI4ODRiNWMyZWM0NmFjOWVhMmJjY2ZkMSIsIm5iZiI6MTcxOTI4NDEwNy43NjAxNjMsInN1YiI6IjY2N2EzMGJjNGFmOTM1YTgwY2Y2OTQ4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BYxyk2Wyu7uN44FwhqiRzrdSTcqmV_DL3VI8YXBRFLk`
        }
    }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  useEffect(() => {
    const testURL = window.location.origin
    const url = new URL(testURL)
    url.searchParams.append('page',currPage.toString())
    push(url.toString())
  }, [currPage])

  return (
    <Pagination
    className={styles.pages}
    current={currPage}
    pageSize={20}
    onChange={(e) => setCurrPage(e)}
    showSizeChanger={false}
    total={data ? data.total_pages : 1}/>
  )
}
