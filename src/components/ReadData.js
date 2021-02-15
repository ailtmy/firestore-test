import React from "react";
import { db } from "../../firebase";

const ReadData = () => {
  const citiesDataSet = () => {
    var citiesRef = db.collection("cities");

    citiesRef.doc("SF").set({
      name: "San Francisco",
      state: "CA",
      country: "USA",
      capital: false,
      population: 860000,
      regions: ["west_coast", "norcal"]
    });
    citiesRef.doc("LA").set({
      name: "Los Angeles",
      state: "CA",
      country: "USA",
      capital: false,
      population: 3900000,
      regions: ["west_coast", "socal"]
    });
    citiesRef.doc("DC").set({
      name: "Washington, D.C.",
      state: null,
      country: "USA",
      capital: true,
      population: 680000,
      regions: ["east_coast"]
    });
    citiesRef.doc("TOK").set({
      name: "Tokyo",
      state: null,
      country: "Japan",
      capital: true,
      population: 9000000,
      regions: ["kanto", "honshu"]
    });
    citiesRef.doc("BJ").set({
      name: "Beijing",
      state: null,
      country: "China",
      capital: true,
      population: 21500000,
      regions: ["jingjinji", "hebei"]
    });
  };

  const docRead = () => {
    const docRef = db.collection("cities").doc("SF");
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data: ", doc.data());
        } else {
          console.log("No such document");
        }
      })
      .catch((error) => {
        console.log("Error getting document: ", error);
      });
  };

  const docCacheRead = () => {
    const docRef = db.collection("cities").doc("SF");

    // Valid options for source are 'server', 'cache', or
    const getOptions = {
      source: "cache"
    };

    docRef
      .get(getOptions)
      .then((doc) => {
        console.log("Cached document data: ", doc.data());
      })
      .catch((err) => {
        console.log("Error getting cached document: ", err);
      });
  };

  const someDocRead = () => {
    db.collection("cities")
      .where("capital", "==", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "---", doc.data());
        });
      })
      .catch((err) => {
        console.log("Error getting documents: ", err);
      });
  };

  const sfListener = () => {
    db.collection("cities")
      .doc("SF")
      .onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
      });
  };

  const someCAListener = () => {
    db.collection("cities")
      .where("state", "==", "CA")
      .onSnapshot((querySnapshot) => {
        let cities = [];
        querySnapshot.forEach((doc) => {
          cities.push(doc.data().name);
        });
        console.log("Current cities in CA: ", cities.join(","));
      });
  };

  return (
    <>
      <div>
        <button onClick={() => citiesDataSet()}>都市データセット</button>
        <button onClick={() => docRead()}>SFデータ取得</button>
        <button onClick={() => docCacheRead()}>SFキャッシュデータ取得</button>
        <button onClick={() => someDocRead()}>複数データ取得</button>
        <button onClick={() => sfListener()}>
          サンフランシスコ変更リスナー
        </button>
        <button onClick={() => someCAListener()}>CA city</button>
      </div>
    </>
  );
};

export default ReadData;
