// import { v4 as uuidv4 } from "uuid";
// import { Home } from "../../const";
// import { DELETESTUDENT, EDITSTUDENT } from "../types";
// // const initialState = JSON.parse(localStorage.getItem(Home)) || [];

// export const studentReducer = (state, action) => {
//   let newState = state;
//   switch (action.type) {
//     case "addStudent":
//       newState.push({ ...action.data, id: uuidv4() });
//       break;
//     case EDITSTUDENT:
//       newState = newState.map((t) => {
//         if (t.id === action.data.id) {
//           return { ...t, ...action.data };
//         } else {
//           return t;
//         }
//       });
//       break;
//     case DELETESTUDENT:
//       newState = newState.filter((t) => t.id !== action.data);
//       break;
//     default:
//   }
//   localStorage.setItem(Home, JSON.stringify(newState));
//   return newState;
// };
