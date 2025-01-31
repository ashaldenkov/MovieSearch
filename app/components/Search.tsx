'use client'
import styles from "./Search.module.css";
import { useState, useEffect } from 'react'
import SearchCard from "./SearchCard";
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'

  function debounce(callback:any, delay:number) {
    let timeoutId:any;
  
    return function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    }
  }

const Search = ({genresList}:any) => {
    //loading states
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState<any>()

    //controlled input
    const [text, setText] = useState('')

    //searchbar visibility
    const [searchVisible, setSearchVisible] = useState(true)

    const currentSearchParams = useSearchParams();

    //search refresh on input changes
    useEffect(() => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/search/movie?query=${text}`, {
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

    const handleRatedClick = () => {

        const updatedSearchParams = new URLSearchParams(currentSearchParams.toString())
        updatedSearchParams.set("rated", 'show')
        updatedSearchParams.delete("page")

        window.history.pushState(null, "", "?" + updatedSearchParams.toString())
    }
    const handleSearchClick = () => {

        const updatedSearchParams = new URLSearchParams(currentSearchParams.toString())
        updatedSearchParams.delete("rated")
        updatedSearchParams.delete("page")

        window.history.pushState(null, "", "?" + updatedSearchParams.toString())
    }
    

  return (
    <div className={styles.container}>
        {/* ----------------- navigation ----------------- */}
        <div className={styles.tab}>
            <button className={`${styles.searchBtn} ${!currentSearchParams.get('rated') ? styles.active : ''}`} onClick={() => {
                setSearchVisible(true)
                handleSearchClick()
                }}>
            Search
            </button>
            <button className={`${styles.ratedBtn} ${currentSearchParams.get('rated') ? styles.active : ''}`} onClick={() => {
                setSearchVisible(false)
                handleRatedClick()
                }}>
            Rated
            </button>
        </div>

        {/* ----------------- searchBar ----------------- */}

        {
            searchVisible ? (
            <div>
                <form className={styles.form}>
                    <input className={`${styles.input} ${isLoading ? styles.loader : ''}`}
                    placeholder="Type to search..."
                    onChange={(e) => debounce(setText(e.target.value), 1000)}
                    value={text}
                    />
                    { text ? (
                        <Image alt='clear' 
                        className={styles.imgClear} 
                        width={24}
                        height={24}
                        onClick={()=> setText('')}
                        src="https://img.icons8.com/ios/50/clear-symbol--v1.png"
                        />  
                    )
                    : null
                    }
              
                </form>

                <div className={styles.searchResults}>

                {data ? data.results.slice(0,4).map( (film: any) => {
                            const genreList :string[] = []
                            //Перебор жанров чтобы отобразить название а не id
                                film?.genre_ids.forEach((genre: number) => {
                                    genresList.genres.forEach((element:any) => {
                                        if (element.id === genre) {
                                            genreList.push(element.name)
                                        }
                                    });
                                });
                            return <SearchCard key={film.id} film={film} genreList={genreList}/>
                        })
                        : null
                }
                { !data?.results.length && !isLoading ? (text ? <div className={styles.notFound}>No matches found! Try another search combination</div> : null) : null}
                </div>
            </div>
            ) : null
        }

    </div>
  )
}

export default Search