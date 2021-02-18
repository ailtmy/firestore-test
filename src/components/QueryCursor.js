import React from "react";
import { db } from "../../firebase";

const QueryCursor = () => {
  const citiesRef = db.collection("cities");
  const startAt = () => {
    citiesRef
      .orderBy("population")
      .startAt(1000000)
      .get()
      .then((docs) => {
        docs.forEach((doc) => console.log(doc.data()));
      });
  };

  const biggerThansf = () => {
    citiesRef
      .doc("SF")
      .get()
      .then((doc) => {
        citiesRef
          .orderBy("population")
          .startAt(doc)
          .get()
          .then((city) => city.forEach((res) => console.log(res.data())));
      });
  };

  const paginate = () => {
    let first = citiesRef.orderBy("population").limit(2);
    first.get().then((documentSnapshots) => {
      let lastvisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      console.log("last:", lastvisible.data());

      let next = citiesRef
        .orderBy("population")
        .startAfter(lastvisible)
        .limit(2);

      next.get().then((snapshot) => {
        snapshot.forEach((doc) => console.log("next", doc.data()));
      });
    });
  };

  return (
    <>
      <button onClick={() => startAt()}>popOneMillion</button>
      <button onClick={() => biggerThansf()}>bigger than SF</button>
      <button onClick={() => paginate()}>Paginate</button>
    </>
  );
};

export default QueryCursor;
