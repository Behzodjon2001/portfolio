// import React, { useEffect, useState } from "react";
// import "./home.css";
// import axios from "axios";
// import { ENDPOINT } from "../../const";
// import { Card } from "antd";
// const KunUz = () => {
//   const [dataPhoto, setDataPhoto] = useState("");

//   useEffect(() => {
//     // function sdsd() {
//     // dataPortfolioId.map((el) => {
//     axios
//       .get(
//         ENDPOINT +
//           "/attach/free/open/" +
//           "4e79843a-08df-4a2a-a5d0-86668268443e.jpg",

//         {
//           responseType: "arraybuffer",
//         }
//       )
//       .then((res) => {
//         const base64 = btoa(
//           new Uint8Array(res.data).reduce(
//             (data, byte) => data + String.fromCharCode(byte),
//             ""
//           )
//         );
//         setDataPhoto(base64);
//         // });
//       });
//     // }
//   }, []);
//   return (
//     <div style={{ marginLeft: 350 }}>
//       {/* <!-- ======= Portfolio Details Section ======= --> */}
//       <section id="portfolio-details" class="portfolio-details">
//         <div class="container">
//           <div class="row gy_4_detail">
//             <div class="col-lg-8">
//               <h1>Portfolio details</h1>
//               <Card
//                 hoverable
//                 className=""
//                 style={{
//                   width: 400,
//                   height: 350,
//                 }}
//               >
//                 <img
//                   style={{ width: 300 }}
//                   src={`data:;base64,${dataPhoto}`}
//                   alt=""
//                 />
//               </Card>
//             </div>

//             <div class="col-lg-4">
//               <div class="portfolio-info">
//                 <h3>Project information</h3>
//                 <ul>
//                   <li>
//                     <strong>Category</strong>: Web design
//                   </li>
//                   <li>
//                     <strong>Name</strong>: Кun Uz
//                   </li>
//                   <li>
//                     <strong>Project date</strong>: 07 May, 2023
//                   </li>
//                   <li>
//                     {/* <strong>Project URL</strong>: <a href="#">www.kunuz.com</a> */}
//                   </li>
//                 </ul>
//               </div>
//               <div class="portfolio-description">
//                 <h2>This is an example of portfolio detail</h2>
//                 <p>
//                   Autem ipsum nam porro corporis rerum. Quis eos dolorem eos
//                   itaque inventore commodi labore quia quia. Exercitationem
//                   repudiandae officiis neque suscipit non officia eaque itaque
//                   enim. Voluptatem officia accusantium nesciunt est omnis
//                   tempora consectetur dignissimos. Sequi nulla at esse enim cum
//                   deserunt eius.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* <!-- End Portfolio Details Section --> */}
//     </div>
//   );
// };

// export default KunUz;
