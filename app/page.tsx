import styles from "./page.module.css";
import FilmList  from "./components/FilmList";



export default function Home({films, genresList} :any) {

  return (
    <main>
      <div className={styles.container}>
        <FilmList />
      </div>
    </main>
  );
}
