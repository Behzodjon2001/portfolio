import { Button, Form, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import PhoneInput from "antd-phone-input";

import {
  addStudentAction,
  deleteStudentAction,
  editStudentAction,
} from "../../redux/action/studentAction";
// import { deleteStudentAction } from "../redux/action/studentAction";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { ENDPOINT, TOKEN } from "../../const";
import { sendData } from "../../server/common";
const { confirm } = Modal;

const Experiences = () => {
  const columns = [
    {
      title: "Company Name",
      key: "companyName",
      dataIndex: "companyName",
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Speciality",
      key: "speciality",
      dataIndex: "speciality",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },

    {
      width: 200,
      title: "Actions",
      render: (row) => (
        <>
          <Button type="primary" onClick={() => editstudent(row.id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deleteStudent(row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  const [studentForms] = Form.useForm();
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  // const [dataUpdate, setDataUpdate] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedStudent) {
      studentForms.validateFields().then((values) => {
        dispatch(editStudentAction({ id: selectedStudent, ...values }));
        // console.log(values);
        console.log(values);
        // console.log(dataUpdate);
        axios
          .put(ENDPOINT + "/experiences/adm/update/" + dataUpdate, values, {
            headers: { Authorization: "Bearer " + token },
          })
          .finally(setLoading(false));
        window.location.href = "/experiences";
      });
    } else {
      studentForms.validateFields().then((values) => {
        dispatch(addStudentAction(values));
        sendData("/experiences/adm/create", values);
        window.location.href = "/experiences";
      });
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const openFormModal = () => {
    showModal();
    setSelectedStudent(null);
    studentForms.resetFields();
  };
  const token = localStorage.getItem(TOKEN);
  const deleteStudent = (id) => {
    console.log(id);
    confirm({
      title: "Do you Want to delete this Student?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteStudentAction(id));
        axios.delete(ENDPOINT + "/experiences/adm/delete/" + id, {
          headers: { Authorization: "Bearer " + token },
        });
        window.location.href = "/experiences";
      },
    });
  };
  const editstudent = (id) => {
    showModal();
    setSelectedStudent(id);
    console.log(id);
    axios.get(ENDPOINT + "/experiences/free/get/" + id).then((res) => {
      console.log(res.data);
      studentForms.setFieldsValue(res.data);
      setDataUpdate(id);
    });
    // let Student = data.find((t) => t.id === id);
    // studentForms.setFieldsValue(Student);
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem(TOKEN);
    axios
      .get(ENDPOINT + "/experiences/free/getAll", {
        headers: { Authorization: "Bearer " + token },
      })

      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);
  // console.log(data);
  // window.location.href = "/experiences";
  // getData();

  return (
    <>
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Experiences</h1>
            <Button onClick={openFormModal} type="primary">
              Add Experiences
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 600 }}
      />
      <Modal
        title="Add experiences"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selectedStudent ? "Save" : "Add"}
      >
        <Form
          form={studentForms}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="companyName" />
          </Form.Item>
          <Form.Item
            label="Start date"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="01.2000" />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="01.2000" />
          </Form.Item>
          <Form.Item
            label="Speciality"
            name="speciality"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="speciality" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Experiences;
