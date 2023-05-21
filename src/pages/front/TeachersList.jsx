import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { ENDPOINT } from "../../const";
import { Card } from "antd";
const TeachersList = () => {
  const [dataPhoto, setDataPhoto] = useState("");

  useEffect(() => {
    // function sdsd() {
    // dataPortfolioId.map((el) => {
    axios
      .get(
        ENDPOINT +
          "/attach/free/open/" +
          "587c0906-2642-44c6-a5c1-a3dcfcac17fb.png",

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
                    <strong>Name</strong>: Teachers list
                  </li>
                  <li>
                    <strong>Project date</strong>: 07 May, 2023
                  </li>
                  <li>
                    <strong>Project URL</strong>:{" "}
                    <a href="https://apiteacherstudent.netlify.app">
                      teachers_list
                    </a>
                  </li>
                </ul>
              </div>
              <div class="portfolio-description">
                <h2>Description of the Teachers list</h2>
                <p>
                  This project is made in React. You can easily add, edit and
                  delete teachers. I used a ready made backend when doing this
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

export default TeachersList;
