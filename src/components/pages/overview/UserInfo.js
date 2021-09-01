import { useSelector } from "react-redux";
import { dateToString } from "../../functions/common";
import { PlusSquare } from "react-feather";
import { Link } from "react-router-dom";
import { AtSign, User, Clock, Archive } from "react-feather";
const UserInfo = ({ savedWine }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="profile-block fff-block cpd">
      <h3 className="titleh3">Profil</h3>
      <p>
        <span>
          <User strokeWidth={2} size={18} />
          Navn:
        </span>
        {user?.name}
      </p>
      <p>
        <span>
          <AtSign strokeWidth={2} size={18} />
          Email:
        </span>
        {user?.email}
      </p>
      <p>
        <span>
          <Clock strokeWidth={2} size={18} />
          Opprettet:
        </span>
        {dateToString(new Date(user?.createdAt))}
      </p>
      <p>
        <span>
          <Archive strokeWidth={2} size={18} />
          Vinsamling:
        </span>
        {savedWine && savedWine > 0 ? `${savedWine} lagret` : "Ingen lagret"}
      </p>

      {(!savedWine || savedWine < 1) && (
        <div className="profile-actions">
          <Link className="button-link" to="/wine/add">
            <button className="button icon">
              <PlusSquare size={18} />
              Legg til vin
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
