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
import TextArea from "antd/es/input/TextArea";
const { confirm } = Modal;

const Messages = () => {
  const columns = [
    {
      title: "Name",
      key: "names",
      dataIndex: "names",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Subject",
      key: "subject",
      dataIndex: "subject",
    },
    {
      title: "Messages",
      key: "message",
      dataIndex: "message",
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
          .put(ENDPOINT + "/message/adm/update/" + dataUpdate, values, {
            headers: { Authorization: "Bearer " + token },
          })
          .finally(setLoading(false));
        window.location.href = "/messages";
      });
    } else {
      studentForms.validateFields().then((values) => {
        dispatch(addStudentAction(values));
        sendData("/message/all/create", values);
        window.location.href = "/messages";
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
      title: "Do you Want to delete this Message?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteStudentAction(id));
        axios.delete(ENDPOINT + "/message/adm/delete/" + id, {
          headers: { Authorization: "Bearer " + token },
        });
        window.location.href = "/messages";
      },
    });
  };
  const editstudent = (id) => {
    showModal();
    setSelectedStudent(id);
    console.log(id);
    axios.get(ENDPOINT + "/message/free/get/" + id).then((res) => {
      console.log(res.data);
      studentForms.setFieldsValue(res.data);
      setDataUpdate(id);
    });
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem(TOKEN);
    axios
      .get(ENDPOINT + "/message/free/getAll", {
        headers: { Authorization: "Bearer " + token },
      })

      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);
  // console.log(data);
  // window.location.href = "/message";
  // getData();

  return (
    <>
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Message</h1>
            <Button onClick={openFormModal} type="primary">
              Add Message
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 600 }}
      />
      <Modal
        title="Add message"
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
            name="names"
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="subject" />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <TextArea placeholder="message" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Messages;
