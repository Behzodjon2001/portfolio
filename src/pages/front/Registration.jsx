import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../../const";
import { Card } from "antd";
import "./home.css";
const Registration = () => {
  const [dataPhoto, setDataPhoto] = useState("");

  useEffect(() => {
    // function sdsd() {
    // dataPortfolioId.map((el) => {
    axios
      .get(
        ENDPOINT +
          "/attach/free/open/" +
          "d68c642b-9483-4377-848f-7539912f6617.jpg",

        {
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        const base64 = btoa(
          new Uint8Array(res.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setDataPhoto(base64);
        // });
      });
    // }
  }, []);
  return (
    <div style={{ marginLeft: 350 }}>
      {/* <!-- ======= Portfolio Details Section ======= --> */}
      <section id="portfolio-details" class="portfolio-details">
        <div class="container">
          <div class="row gy_4_detail">
            <div class="col-lg-8">
              <h1>Portfolio details</h1>
              <Card
                hoverable
                className=""
                style={{
                  width: 400,
                  height: 350,
                }}
              >
                <img
                  style={{ width: 300 }}
                  src={`data:;base64,${dataPhoto}`}
                  alt=""
                />
              </Card>
            </div>

            <div class="col-lg-4">
              <div class="portfolio-info">
                <h3>Project information</h3>
                <ul>
                  <li>
                    <strong>Category</strong>: Web design
                  </li>
                  <li>
                    <strong>Name</strong>: Registration
                  </li>
                  <li>
                    <strong>Project date</strong>: 07 May, 2023
                  </li>
                  <li>
                    <strong>Project URL</strong>:{" "}
                    <a href="flfl.com">www.registration.com</a>
                  </li>
                </ul>
              </div>
              <div class="portfolio-description">
                <h2>Description of the Registration</h2>
                <p>
                  This project is made in React. It has user and admin parts. In
                  this case, you simply go through registration. And Admin can
                  Crud them
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End Portfolio Details Section --> */}
    </div>
  );
};

export default Registration;
