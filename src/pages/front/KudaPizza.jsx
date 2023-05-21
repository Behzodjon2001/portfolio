import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { ENDPOINT } from "../../const";
import { Card } from "antd";
const KudaPizza = () => {
  const [dataPhoto, setDataPhoto] = useState("");

  useEffect(() => {
    // function sdsd() {
    // dataPortfolioId.map((el) => {
    axios
      .get(
        ENDPOINT +
          "/attach/free/open/" +
          "159cee24-0809-4761-b957-411d824b141f.png",

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
                  style={{ width: 400, marginLeft: -24 }}
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
                    <strong>Name</strong>: Куда Pizza
                  </li>

                  <li>
                    <strong>Project date</strong>: 07 May, 2023
                  </li>
                  <li>
                    <strong>Project URL</strong>:{" "}
                    <a href="https://zingy-starburst-319248.netlify.app/">
                      kuda_pizza_clone
                    </a>
                  </li>
                </ul>
              </div>
              <div class="portfolio-description">
                <h2>Description of the pizza project</h2>
                <p>
                  This project is posted on netlify made in react. Basically you{" "}
                  <br />
                  can choose a pizza and take it out
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

export default KudaPizza;
