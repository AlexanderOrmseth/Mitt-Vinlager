import { useEffect, useState } from "react";
// redux
import { getWine } from "../../../actions/wine";
import { useSelector, useDispatch } from "react-redux";
import DrankTable from "./DrankTable";
import AmountTable from "./AmountTable";
import UserInfo from "./UserInfo";
import TypesTable from "./TypesTable";

import "./Overview.css";

const Overview = () => {
  const wine = useSelector((state) => state.wine);
  //const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [drank, setDrank] = useState([]);
  const [wineInfo, setWineInfo] = useState([]);
  const [typeInfo, setTypeInfo] = useState([]);

  useEffect(() => {
    if (!wine) {
      dispatch(getWine());
    }
    // might be unnecessary
    if (wine) {
      setDrank(makeList());
      setWineInfo(wineInfoArr());
      setTypeInfo(typesArr());
    }
  }, [wine]);

  const wineInfoArr = () => {
    const inStorageArr = wine.filter((item) => item.amount > 0);
    //const notInStorageArr = wine.filter((item) => item.amount === 0);
    const sumPriceInStorage = inStorageArr.reduce(
      (sum, currentElement) =>
        sum + currentElement.price * currentElement.amount,
      0
    );
    const sumBottles = (arr) =>
      arr.reduce((sum, currentElement) => sum + currentElement.amount, 0);

    return {
      definition: "På lager",
      sumPrice: sumPriceInStorage,
      sumBottles: sumBottles(inStorageArr),
      uniqueBottles: inStorageArr.length,
    };
  };

  const makeList = () => {
    if (!wine) {
      return [];
    }
    const list = wine.filter((item) => item.drank.length > 0);

    if (!list || !list.length > 0) {
      return [];
    }

    let drankedList = [];
    list.forEach((item) =>
      item.drank.forEach((date) => {
        drankedList = [
          ...drankedList,
          {
            id: item._id,
            name: item.name,
            date: date,
            year: item.year,
            type: item.type,
            price: item.price,
          },
        ];
      })
    );
    return drankedList.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const typesArr = () => {
    const inStorageArr = wine.filter((item) => item.amount > 0);
    if (!inStorageArr.length > 0) {
      return [];
    }
    let uniqueTypes = [
      ...new Set(inStorageArr.map((item) => item.type.toLowerCase())),
    ];

    return uniqueTypes
      .map((type) => {
        let ofTypeArr = inStorageArr.filter(
          (item) => item.type.toLowerCase() === type
        );
        const amount = ofTypeArr.reduce(
          (sum, currentElement) => sum + currentElement.amount,
          0
        );
        const sumPrice = ofTypeArr.reduce(
          (sum, currentElement) =>
            sum + currentElement.amount * currentElement.price,
          0
        );
        return { type, amount, sumPrice };
      })
      .sort((a, b) => b.amount - a.amount);
  };

  return (
    <div className="overview-grid">
      <UserInfo savedWine={wine?.length} />
      <div className="amount-block fff-block cpd">
        <h3 className="titleh3">Antall</h3>
        <AmountTable typeInfo={typeInfo} wineInfo={wineInfo} />
      </div>

      {wine && (
        <>
          <div className="types-block fff-block cpd">
            <h3 className="titleh3">Typer</h3>
            <TypesTable typeInfo={typeInfo} />
          </div>
          <div className="drank-block fff-block cpd">
            <h3 className="titleh3">Sist drukket</h3>
            <DrankTable drank={drank} />
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
