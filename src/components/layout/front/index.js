import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const index = ({ children }) => {
  return (
    <>
      <div className="d-flex">
        <Header />
        <main> {children} </main> <Footer />
      </div>{" "}
    </>
  );
};

export default index;
