import { db } from "../index.js";
import { useEffect, useState } from "react";
import "../style.css";

const DataBase = () => {
  const [people, setPeople] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedSurname, setUpdatedSurname] = useState("");
  const [hidUpdate, setHidUpdate] = useState(true);
  const [hidNormal, setHidNormal] = useState(false);
  const [id, setID] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    db.collection("People")
      .get()
      .then((snapshot) => {
        setPeople(
          snapshot.docs.map((doc) => {
            return (
              <div key={doc.id}>
                <li>
                  {Object.values(doc.data()["First Name"])}
                  {"  "}
                  {Object.values(doc.data()["Surname"])}
                  <button name={doc.id} onClick={editData} id="delBtn">
                    Edit
                  </button>
                  <button name={doc.id} onClick={deleteData}>
                    Delete
                  </button>
                </li>
              </div>
            );
          })
        );
      });
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    db.collection("People").doc(id).update({
      "First Name": { updatedFirstName },
      Surname: { updatedSurname },
    });
    setHidNormal(false);
    setHidUpdate(true);
    setUpdatedFirstName("");
    setUpdatedSurname("");
    setTimeout(function () {
      getData();
    }, 250);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection("People").add({
      "First Name": { firstName },
      Surname: { surname },
    });
    getData();
    setFirstName("");
    setSurname("");
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };
  const handleUpdateFirstNameChange = (event) => {
    setUpdatedFirstName(event.target.value);
  };
  const handleUpdateSurnameChange = (event) => {
    setUpdatedSurname(event.target.value);
  };

  const deleteData = (event) => {
    let id = event.target.name;
    db.collection("People").doc(id).delete();
    setTimeout(function () {
      getData();
    }, 250);
  };
  const editData = (event) => {
    setHidNormal(true);
    setHidUpdate(false);

    setID(event.target.name);
  };

  const stopEditing = () => {
    setHidNormal(false);
    setHidUpdate(true);
  };
  return (
    <div>
      <h1>Your data on Fire Store</h1>
      <ul>{people}</ul>
      <div hidden={hidUpdate}>
        <form onSubmit={handleUpdateSubmit}>
          <input
            type="text"
            placeholder="Update First Name"
            value={updatedFirstName}
            onChange={handleUpdateFirstNameChange}
          />
          <input
            type="text"
            placeholder="Update Surname"
            value={updatedSurname}
            onChange={handleUpdateSurnameChange}
          />
          <button className="green" type="submit">
            Update Data
          </button>
        </form>
        <button onClick={stopEditing}>Stop Editing</button>
      </div>

      <form hidden={hidNormal} onSubmit={handleSubmit}>
        <input
          type="text"
          name="First Name"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
        <input
          onChange={handleSurnameChange}
          value={surname}
          type="text"
          name="Surname"
          placeholder="Surname"
        />
        <button className="green" type="submit">
          Add Data
        </button>
      </form>
    </div>
  );
};
export default DataBase;
