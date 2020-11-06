import { db } from "../index.js";
import { useEffect, useState } from "react";

function DataBase() {
  const [dbData, setDbData] = useState("");
  let obKey;
  let obVal;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.collection("People")
      .get()
      .then((snapshot) => {
        return setDbData(
          snapshot.docs.map((doc) => {
            obKey = Object.keys(doc.data());
            obVal = Object.values(doc.data());
            console.log("keys:", obKey, "values", obVal);
            <h2>{obKey[0]}</h2>;
          })
        );
      });
  };

  return (
    <div>
      {dbData}
      <h1>hello</h1>
    </div>
  );
}

export default DataBase;
