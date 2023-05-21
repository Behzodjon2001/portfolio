import { ADDSTUDENT, DELETESTUDENT, EDITSTUDENT } from "../types";

export const editStudentAction = (data) => {
  return {
    type: EDITSTUDENT,
    data,
  };
};

export const addStudentAction = (data) => {
  return {
    type: ADDSTUDENT,
    data,
  };
};

export const deleteStudentAction = (data) => {
  return {
    type: DELETESTUDENT,
    data,
  };
};
