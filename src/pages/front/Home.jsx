import React from "react";
import Typed from "typed.js";
import axios from "axios";
import { Button, Card, Form, Input } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { ENDPOINT } from "../../const";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { sendData } from "../../server/common";
import { toast } from "react-toastify";
import portfolio_img2 from "../../assets/images/photo_2023-05-02_00-55-53.jpg";
import portfolio_img1 from "../../assets/images/portfolio_img1.jpg";
import resume_download from "../../assets/images/resume.pdf";
import "./homescss.scss";
import "./home.css";
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Home = () => {
  const [studentForm] = Form.useForm();
  const el = useRef(null);
  const [data, setData] = useState([]);
  const [dataSkills, setDataSkills] = useState([]);
  const [dataExperiences, setDataExperiences] = useState([]);
  const [dataPortfolioId, setDataPortfolioId] = useState([]);
  // const [setDataPhoto] = useState("");
  const [dataPhoto2, setDataPhoto2] = useState("");
  const [dataPhoto3, setDataPhoto3] = useState("");
  const [dataPhoto4, setDataPhoto4] = useState("");
  const [dataPhoto5, setDataPhoto5] = useState("");
  const dispatch = useDispatch();
  const onFinish = () => {
    console.log("Received values of form: ");
    studentForm.validateFields().then((values) => {
      console.log(values);
      dispatch({ type: "addStudent", data: values });
      // window.location.href = "/finished";
      sendData("/message/all/create", values)
        .then((res) => {
          window.location.href = "/";
        })
        .catch(() => {
          toast.error("Nimadir Xato");
        });
    });
  };

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Frontend Developer", "Backend Developer"], // Strings to display
      // Speed settings, try diffrent values untill you get good results
      startDelay: 300,
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    // const token = localStorage.getItem(TOKEN);
    axios
      .get(ENDPOINT + "/profile/free/all/get/admin", {
        // headers: { Authorization: "Bearer " + token },
      })
      .then((res) => setData(res.data));
    // .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(ENDPOINT + "/skills/free/getAll", {})
      .then((res) => setDataSkills(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(ENDPOINT + "/experiences/free/getAll", {})
      .then((res) => setDataExperiences(res.data));
  }, []);

  useEffect(() => {
    const fetchBusinesses = () => {
      axios
        .get(ENDPOINT + "/portfolio/free/getAll")
        .then((res) => setDataPortfolioId(res.data.photoId));
    };
    fetchBusinesses();
  }, []);

  // useEffect(() => {
  //   // function sdsd() {
  //   // dataPortfolioId.map((el) => {
  //   axios
  //     .get(
  //       ENDPOINT +
  //         "/attach/free/open/" +
  //         "4e79843a-08df-4a2a-a5d0-86668268443e.jpg",

  //       {
  //         responseType: "arraybuffer",
  //       }
  //     )
  //     .then((res) => {
  //       const base64 = btoa(
  //         new Uint8Array(res.data).reduce(
  //           (data, byte) => data + String.fromCharCode(byte),
  //           ""
  //         )
  //       );
  //       setDataPhoto(base64);
  //       // });
  //     });
  //   // }
  // }, []);
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
        setDataPhoto2(base64);
        // });
      });
    // }
  }, []);

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
        setDataPhoto3(base64);
        // });
      });
    // }
  }, []);

  useEffect(() => {
    // function sdsd() {
    // dataPortfolioId.map((el) => {
    axios
      .get(
        ENDPOINT +
          "/attach/free/open/" +
          "ac34b45d-66c2-4dfd-8e6e-aaffa12ef2b5.png",

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
        setDataPhoto4(base64);
        // });
      });
    // }
  }, []);

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
        setDataPhoto5(base64);
        // });
      });
    // }
  }, []);

  const onReset = () => {
    studentForm.resetFields();
  };

  return (
    <div className="position-relative">
      {/* <i className="bi bi-list mobile-nav-toggle d-xl-none"></i> */}
      <div className="header_home">
        <div className="container">
          <nav>
            <div>
              <img
                className="portfolio_img1 img-fluid rounded-circle"
                src={portfolio_img1}
                alt=""
              />
            </div>
            <div>
              <h1 className="name_header">Behzod Malikov</h1>
            </div>
            <div className="mt-3 text-center all_icon_header">
              <div>
                <a href="https://twitter.com/Behzodjon_M">
                  <i className="fa-brands fa-twitter icon_header"></i>
                </a>
              </div>
              <div>
                <a href="https://www.facebook.com/profile.php?id=100084407770055">
                  <i className="fa-brands fa-facebook icon_header"></i>
                </a>
              </div>
              <div>
                <a href="https://www.instagram.com/behzod_0908m/">
                  <i className="fa-brands fa-instagram icon_header"></i>
                </a>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/behzodjon-malikov-437ab0246/">
                  <i className="fa-brands fa-linkedin icon_header"></i>
                </a>
              </div>
            </div>
          </nav>
          <nav id="navbar" className="nav-menu navbar">
            <ul className="menus_tartib">
              <li>
                <a href="#hero" className="nav-link scrollto active">
                  <i className="fa-solid fa-house"></i>
                  <span className="span_padding">Home</span>
                </a>
              </li>
              <li>
                <a href="#about" className="nav-link scrollto">
                  <i className="fa-solid fa-user"></i>
                  <span className="span_padding">About</span>
                </a>
              </li>
              <li>
                <a href="#resume" className="nav-link scrollto">
                  <i className="fa-solid fa-file"></i>{" "}
                  <span className="span_padding">Resume</span>
                </a>
              </li>
              <li>
                <a href="#portfolio" className="nav-link scrollto">
                  <i className="fas fa-briefcase"></i>
                  <span className="span_padding">Portfolio</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="nav-link scrollto">
                  <i className="fa-solid fa-envelope"></i>{" "}
                  <span className="span_padding">Contact</span>
                </a>
              </li>
              <li>
                <a href="#application" className="nav-link scrollto">
                  <i className="fa-solid fa-envelope"></i>{" "}
                  <span className="span_padding">About App</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="nav-link scrollto">
                  <span style={{ color: "red" }} className="span_padding">
                    Admin panel kirish uchun <br /> tepada Login ga kiring
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="container">
        <section
          id="hero"
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="hero-container" data-aos="fade-in">
            <h1>Behzod Malikov</h1>
            <p>
              I'm <span ref={el}></span>
            </p>
          </div>
        </section>
      </div>
      <main id="main">
        {/* About Section  */}
        <section id="about" className="about">
          <div className="container">
            <div className="section-title">
              <h2>About</h2>
              <p>
                I started programming because I was very interested in computer
                technology. I entered the field of programming in September
                2021. Almost 1 year of backend and I learned the frontend for 5
                months. My goal is to become a good programmer and benefit my
                country.
              </p>
            </div>

            <div className="row about_me">
              <div className="col-lg-4" data-aos="fade-right">
                <img src={portfolio_img2} className="img-fluid2" alt="" />
              </div>
              <div
                className="col-lg-8 pt-4 pt-lg-0 content"
                data-aos="fade-left"
              >
                <h3>{data.specialist}</h3>
                <p className="fst-italic">
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <ul>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Birthday:</strong> <span>{data.bithday}</span>
                      </li>

                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Phone:</strong> <span>{data.phone}</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>City:</strong> <span>{data.city}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Age:</strong> <span>{data.age}</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Degree:</strong> <span>{data.degree}</span>
                      </li>
                      <li>
                        <i className="bi bi-chevron-right"></i>{" "}
                        <strong>Email:</strong> <span>{data.email}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p>
                  My hobby is reading books. Reading a book is one of my
                  favorite pass times and since I work with words for a living
                  it is also one of my favorite work tasks. There are no words
                  that can describe my admiration and respect for the written
                  word and the modest book that houses them. Even though great
                  thinker of antiquity like Socrates despised the written word
                  calling it unresponsive and dead we have to give out thanks to
                  its ability to conserve knowledge for generations.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* End About Section  */}
        {/* Skills Section */}
        <section id="skills" className="skills section-bg">
          <div className="container">
            <div className="section-title">
              <h2>Skills</h2>
              <p>
                I learned the first backend i.e. Java. I couldn't find a job in
                Java and realized that I had to work on myself. <br /> Because
                practice develops a person. I also started to learn Frontend
                because both of them make beautiful <br /> projects
              </p>
            </div>

            <div className="skils_css_row">
              <div className="front_skills_css ">
                {dataSkills.map((el) => (
                  <div className="w3-container">
                    <div className="">
                      <div className="html_css">
                        <h5>{el.name}</h5>
                        <h5>{el.percentage}%</h5>
                      </div>
                      <div className="w3-light-grey height_line">
                        <div
                          className="w3-container w3-blue height_line  higth w3-center"
                          style={{ width: `${el.percentage}%` }}
                        >
                          <span className="span_90_foiz">{el.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* End Skills Section */}
        {/* Resume Section */}
        <section id="resume" className="resume download_files_relative">
          <div className="container">
            <div className="section-title">
              <h2>Resume</h2>
            </div>
            <a
              style={{ marginLeft: 1000 }}
              className="download_file"
              href={resume_download}
              download
            >
              <Button type="primary">Download resume</Button>
            </a>
            <div
              style={{ marginTop: "-40px" }}
              className="row resume_sumary_profes"
            >
              <div className="col-lg-6" data-aos="fade-up">
                <h3 className="resume-title">Education</h3>
                {dataExperiences.map((el) => (
                  <div className="resume-item">
                    <h4>{el.companyName}</h4>
                    <h5>
                      {el.startDate} - {el.endDate}
                    </h5>
                    <p>
                      <em>{el.speciality}</em>
                    </p>
                    <p>{el.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* End Resume Section */}

        {/* Portfolio Section  */}
        <section id="portfolio" className="portfolio section-bg">
          <div className="container">
            <h2>{dataPortfolioId}</h2>
            <div className="section-title">
              <h2>Portfolio</h2>
            </div>

            <div className="row" data-aos="fade-up">
              <div className="col-lg-12 card_portfolio_css">
                <NavLink to="/registration">
                  <Card
                    hoverable
                    style={{
                      width: 340,
                    }}
                    cover={
                      <img
                        alt="example"
                        className="img_portfolio"
                        src={`data:;base64,${dataPhoto2}`}
                      />
                    }
                  >
                    <h3>registration</h3>
                    {/* <a href="#">registration.com</a> */}
                  </Card>
                </NavLink>
                <NavLink to="/kudapizza">
                  <Card
                    hoverable
                    style={{
                      width: 340,
                    }}
                    cover={
                      <img
                        alt="example"
                        className="img_portfolio"
                        src={`data:;base64,${dataPhoto3}`}
                      />
                    }
                  >
                    <h3>Куда pizza</h3>
                    {/* <a href="https://zingy-starburst-319248.netlify.app/">
                    kuda-pizza.com
                  </a> */}
                  </Card>
                </NavLink>
                <NavLink to="/leangroup">
                  <Card
                    hoverable
                    style={{
                      width: 340,
                    }}
                    cover={
                      <img
                        alt="example"
                        className="img_portfolio"
                        src={`data:;base64,${dataPhoto4}`}
                      />
                    }
                  >
                    <h3>Leangroup clone</h3>
                    {/* <a href="https://dynamic-gumption-c4e410.netlify.app/">
                    leanfroup.klon.com
                  </a> */}
                  </Card>
                </NavLink>
                <NavLink to="/teachers_list">
                  <Card
                    hoverable
                    style={{
                      width: 340,
                    }}
                    cover={
                      <img
                        alt="example"
                        className="img_portfolio"
                        src={`data:;base64,${dataPhoto5}`}
                      />
                    }
                  >
                    <h3>Teachers list</h3>
                    {/* <a href="https://dynamic-gumption-c4e410.netlify.app/">
                    leanfroup.klon.com
                  </a> */}
                  </Card>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
        {/* End Portfolio Section */}

        {/* ======= Contact Section =======  */}
        <section id="contact" className="contact">
          <div className="container">
            <div className="section-title">
              <h2>Contact</h2>
              <p>
                Magnam dolores commodi suscipit. Necessitatibus eius consequatur
                ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
                quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
                Quia fugiat sit in iste officiis commodi quidem hic quas.
              </p>
            </div>

            <div className="row contact_flex_card" data-aos="fade-in">
              <div className="col-lg-5 d-flex align-items-stretch">
                <Card
                  hoverable
                  className="card_responsive info"
                  style={{
                    width: 490,
                    height: 650,
                  }}
                >
                  <div className="address">
                    <i class="fa-solid fa-location-dot"></i>
                    <h4>Location:</h4>
                    <p>Toshkent shahar, qora-qamish 2/1</p>
                  </div>

                  <div className="email">
                    <i class="fa-solid fa-envelope"></i>
                    <h4>Email:</h4>
                    <p>malikovbehzod2001@gmail.com</p>
                  </div>

                  <div className="phone">
                    <i class="fa-solid fa-mobile"></i>
                    <h4>Call:</h4>
                    <p>+99891 464 0908</p>
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3043.3728601543476!2d69.224328215051!3d41.35874620555566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suz!2s!4v1683292116106!5m2!1suz!2s"
                    width="600"
                    height="450"
                    title="location_me"
                    style={{ border: 0, width: "100%", height: "290px" }}
                    allowfullscreen=""
                    frameborder="0"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Card>
              </div>

              <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                <Form
                  {...formItemLayout}
                  form={studentForm}
                  name="register"
                  onFinish={onFinish}
                  className="form_responsive"
                  style={{
                    maxWidth: 830,
                    // paddingTop: "-40px",
                    margin: "0 auto",
                  }}
                >
                  <div className="cards">
                    <Card
                      hoverable
                      className="card_responsive"
                      style={{
                        width: 660,
                        height: 650,
                      }}
                    >
                      {/* <div className="name_and_email"> */}
                      <Form.Item
                        name="names"
                        label="Name"
                        style={{ marginLeft: "-220px" }}
                        // tooltip="What do you want others to call you?"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Name!",
                            whitespace: true,
                          },
                        ]}
                      >
                        <div className="familiya_imya">
                          <Input
                            placeholder="Мой ответ"
                            // className="input_fullname"
                            style={{
                              width: "490px",
                              height: "50px",
                            }}
                          />
                        </div>
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="Email"
                        style={{ marginLeft: "-220px" }}
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                          {
                            required: true,
                            message: "Please input your E-mail!",
                            whitespace: true,
                          },
                        ]}
                      >
                        {/* <p>Your Email</p> */}
                        <Input
                          name="email"
                          type="text"
                          id=""
                          placeholder="Мой ответ"
                          // className="input_header_responsive"
                          style={{
                            // border: "1px solid blue",
                            borderRadius: "5px",
                            width: "490px",
                            height: "50px",
                          }}
                        />
                      </Form.Item>
                      {/* </div> */}

                      <Form.Item
                        label="Subject"
                        name="subject"
                        style={{ marginLeft: "-220px" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your Subject!",
                            whitespace: true,
                          },
                        ]}
                      >
                        {/* <p>Subject</p> */}
                        <Input
                          type="text"
                          id=""
                          name="subject"
                          placeholder="Мой ответ"
                          className="input_fullname"
                          style={{
                            borderRadius: "5px",
                            width: "490px",
                            height: "50px",
                            marginLeft: "-5px",
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        style={{ marginLeft: "-255px" }}
                        className="textArea_style"
                        name="message"
                        label="Message"
                        rules={[
                          {
                            // required: true,
                            message: "Please input your Message!",
                            whitespace: true,
                          },
                        ]}
                      >
                        {/* <p>Message</p> */}
                        <div className="div_input_message">
                          <TextArea
                            style={{ borderRadius: "5px", width: "490px" }}
                            required
                            name="message"
                            id=""
                            cols="93"
                            rows="10"
                          />
                        </div>
                      </Form.Item>

                      <div className="message_otpravit">
                        <Form.Item
                          {...tailFormItemLayout}
                          className="registers"
                        >
                          <Button
                            className="otpravit_back"
                            type="primary"
                            htmlType="submit"
                          >
                            <div className="btn-otpravit">Отправить</div>
                          </Button>
                        </Form.Item>
                        <Button
                          className="ochistetformu"
                          htmlType="button"
                          onClick={onReset}
                        >
                          <div className="ochitit_harf">Очистить форму</div>
                        </Button>
                      </div>
                    </Card>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>
        {/* End Contact Section  */}
        {/* ======= Application Section =======  */}
        <section id="application" className="contact">
          <div className="container">
            <div className="section-title">
              <h2>About Application</h2>
            </div>
            I made both Frontend and Backend of this Portfolio project myself.
            The frontend part is made in ReactJs. I used additional HTML, Css
            JavaScript and Ant design library. Backend part is made in Spring
            boot and data is stored in PortgresQl database. This project has an
            Admin and User section. When you enter the site, you will enter the
            User section. You enter the username and password specified in Login
            to enter the Admin section.
          </div>
        </section>
        {/* End application Section  */}
      </main>
      <script src="../../assets/vendor/purecounter/purecounter_vanilla.js"></script>
      <script src="../../assets/vendor/aos/aos.js"></script>
      <script src="../../assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="../../assets/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="../../assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
      <script src="../../assets/vendor/swiper/swiper-bundle.min.js"></script>
      <script src="../../assets/vendor/typed.js/typed.min.js"></script>
      <script src="../../assets/vendor/waypoints/noframework.waypoints.js"></script>
      <script src="../../assets/vendor/php-email-form/validate.js"></script>

      <script src="../../assets/js/main.js"></script>
      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    </div>
  );
};

export default Home;
