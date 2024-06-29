import styles from "./page.module.css";
import FilmList  from "./components/FilmList";
import { Suspense } from 'react'
import Loading from "./loading";

export default function Home() {

  return (
    <main>
      <div className={styles.container}>
      <Suspense fallback={<Loading/>}>
        <FilmList />
      </Suspense>
      </div>
    </main>
  );
}
