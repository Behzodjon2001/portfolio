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

const Skills = () => {
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Percentage",
      key: "percentage",
      dataIndex: "percentage",
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
          .put(ENDPOINT + "/skills/adm/update/" + dataUpdate, values, {
            headers: { Authorization: "Bearer " + token },
          })
          .finally(setLoading(false));
        window.location.href = "/skills";
      });
    } else {
      studentForms.validateFields().then((values) => {
        dispatch(addStudentAction(values));
        sendData("/skills/adm/create", values);
        window.location.href = "/skills";
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
        axios.delete(ENDPOINT + "/skills/adm/delete/" + id, {
          headers: { Authorization: "Bearer " + token },
        });
        // window.location.href = "/skills";
      },
    });
  };
  const editstudent = (id) => {
    showModal();
    setSelectedStudent(id);
    console.log(id);
    axios.get(ENDPOINT + "/skills/free/get/" + id).then((res) => {
      console.log(res.data);
      studentForms.setFieldsValue(res.data);
      setDataUpdate(id);
    });
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem(TOKEN);
    axios
      .get(ENDPOINT + "/skills/free/getAll", {
        headers: { Authorization: "Bearer " + token },
      })

      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);
  // console.log(data);
  // window.location.href = "/skills";
  // getData();

  return (
    <>
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Skills</h1>
            <Button onClick={openFormModal} type="primary">
              Add Skill
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 600 }}
      />
      <Modal
        title="Add skills"
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            label="Percentage"
            name="percentage"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="percentage" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Skills;
