import styles from "./page.module.css";
import FilmList  from "./components/FilmList";
import { Suspense } from 'react'
import Loading from "./loading";
import Pages from './components/Pages'
import Search from "./components/Search";

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  return (
    <main>
      <div className={styles.container}>
        <Search/>
        <Suspense fallback={<Loading/>}>
          <FilmList page={searchParams?.page}/>
        </Suspense>
        <Pages/>
      </div>
    </main>
  );
}
