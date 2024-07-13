import styles from "./page.module.css";
import FilmList  from "./components/FilmList";
import { Suspense } from 'react'
import Loading from "./loading";
import Pages from './components/Pages'
import Search from "./components/Search";
import { cookies } from 'next/headers'


export default async function Home({params,searchParams,}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const session = cookies().get('sessionID')?.value || ''
  return (
    <main>
        <div className={styles.container}>
          <Search/>
          <Suspense fallback={<Loading/>}>
            <FilmList page={searchParams?.page} rated={searchParams?.rated} session={session}/>
          </Suspense>
          <Pages rated={searchParams?.rated} session={session}/>
        </div>
    </main>
  );
}
