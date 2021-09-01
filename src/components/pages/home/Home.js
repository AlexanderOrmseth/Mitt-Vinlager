import { useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="main-content home-content">
      {!user?.email && (
        <section>
          <p>
            Logg inn med din Google-Konto for å begynne og bruke Mitt Vinlager.
          </p>
          <p className="bm">
            Denne appen bruker cookies og vil ikke fungere uten.
          </p>
        </section>
      )}

      <section>
        <p className="stack">
          Mitt Vinlager er en nettbasert vinkjeller-app laget med
          <span className="stack-icon react">React</span>
          <span className="stack-icon node">Node</span>
          <span className="stack-icon express">Express</span> og
          <span className="stack-icon mongodb">MongoDB</span>
        </p>
        <p>
          Dette er i hovedsak et personelig prosjekt for å styrke mitt portfolio
          som utvikler, men appen er velfungerende og åpen for alle som ønsker å
          ta den i bruk.
        </p>
      </section>
      <section>
        <h3 className="titleh3">Kontakt</h3>
        <p>
          Ta kontakt om feil oppstår, eller om du har forslag til forbedringer.
        </p>
        <p>mittvinlager@gmail.com</p>
      </section>
    </div>
  );
};

export default Home;
