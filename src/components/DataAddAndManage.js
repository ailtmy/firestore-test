import React from "react";
import { db } from "../../firebase";

const DataAddAndManage = () => {
  const newData = () => {
    db.collection("users")
      .add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
      })
      .then((docRef) => {
        console.log("Document written with ID:", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document:", error);
      });
  };

  const addData = () => {
    db.collection("users")
      .add({
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document: ", error);
      });
  };

  const readData = () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      });
  };

  const getMessage = async () => {
    const res = await db
      .collection("rooms")
      .doc("roomA")
      .collection("messages")
      .doc("message1");
    console.log(res);
  };

  const updateData = () => {
    let frankDocRef = db.collection("users").doc("frank");
    frankDocRef.set({
      name: "Frank",
      favorites: { food: "Pizza", color: "Blue", subject: "racess" },
      age: 12
    });
    frankDocRef
      .update({ age: 13, "favorites.color": "Red" })
      .then(() => console.log("Document successfully updated!"));
  };

  const transaction = () => {
    let sfDocRef = db.collection("cities").doc("SF");
    db.runTransaction((transaction) => {
      return transaction.get(sfDocRef).then((sfDoc) => {
        if (!sfDoc.exists) {
          throw Error("Document does not exist!");
        }

        let newPopulation = sfDoc.data().population + 1;
        if (newPopulation <= 3000000) {
          transaction.update(sfDocRef, { population: newPopulation });
          return newPopulation;
        } else {
          return Promise.reject("Sorry! Population is too big!");
        }
      });
    })
      .then((newPopulation) => {
        console.log("Population increased to ", newPopulation);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const batch = () => {
    let batch = db.batch();
    const nycRef = db.collection("cities").doc("NYC");
    batch.set(nycRef, { name: "New York City" });

    const sfRef = db.collection("cities").doc("SF");
    batch.update(sfRef, { population: 1000000 });

    const laRef = db.collection("cities").doc("LA");
    batch.delete(laRef);

    batch.commit().then(() => {
      console.log("batch success!");
    });
  };
  return (
    <div className="App">
      <button onClick={() => newData()}>新規作成</button>
      <button onClick={() => addData()}>データ追加</button>
      <button onClick={() => readData()}>データ読み込み</button>
      <button onClick={() => getMessage()}>リファレンス</button>
      <br />
      <button onClick={() => updateData()}>ネストフィールド更新</button>
      <button onClick={() => transaction()}>トランザクション更新</button>
      <button onClick={() => batch()}>バッチ処理</button>
    </div>
  );
};

export default DataAddAndManage;
