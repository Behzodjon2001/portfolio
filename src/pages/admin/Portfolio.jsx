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
// import { ExclamationCircleFilled, UploadOutlined } from "@ant-design/icons";
import { ExclamationCircleFilled } from "@ant-design/icons";
import axios from "axios";
import { ENDPOINT, TOKEN } from "../../const";
import { sendData } from "../../server/common";
const { confirm } = Modal;

const Portfolio = () => {
  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Url",
      key: "url",
      dataIndex: "url",
    },
    {
      title: "Photo",
      key: "photoId",
      dataIndex: "photoId",
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
  const [dataUpload, setDataUpload] = useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
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
          .put(ENDPOINT + "/portfolio/adm/update/" + dataUpdate, values, {
            headers: { Authorization: "Bearer " + token },
          })
          .finally(setLoading(false));
        window.location.href = "/portfolio";
      });
    } else {
      studentForms.validateFields().then((values) => {
        dispatch(addStudentAction(values));
        let formData = new FormData();
        formData.append("file", selectedFile);
        async function name() {
          await axios({
            method: "post",
            url: ENDPOINT + "/attach/adm/upload",
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + token,
            },
          }).then((data) => setDataUpload(data.data.id));
          values.photoId = dataUpload;

          await postPortfolio(values);
        }
        name();

        // window.location.href = "/portfolio";
      });
    }
    setIsModalOpen(false);
  };

  async function postPortfolio(values) {
    await sendData("/portfolio/adm/create", values);
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
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
        axios.delete(ENDPOINT + "/portfolio/adm/delete/" + id, {
          headers: { Authorization: "Bearer " + token },
        });
        window.location.href = "/portfolio";
      },
    });
  };
  const editstudent = (id) => {
    showModal();
    setSelectedStudent(id);
    // console.log(id);
    axios.get(ENDPOINT + "/portfolio/free/get/" + id).then((res) => {
      // console.log(res.data);
      studentForms.setFieldsValue(res.data);
      setDataUpdate(id);
    });
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem(TOKEN);
    axios
      .get(ENDPOINT + "/portfolio/free/getAll", {
        headers: { Authorization: "Bearer " + token },
      })

      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   const token = localStorage.getItem(TOKEN);
  //   axios
  //     .get(ENDPOINT + "/attach/adm/getAll", {
  //       headers: { Authorization: "Bearer " + token },
  //     })

  //     .then((res) => setDataUpdate(res.data))
  //     .catch((err) => console.log(err))
  //     .finally(setLoading(false));
  // }, []);
  // console.log(data);
  // window.location.href = "/portfolio";
  // getData();

  return (
    <>
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Portfolio</h1>
            <Button onClick={openFormModal} type="primary">
              Add Portfolio
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 600 }}
      />
      <Modal
        title="Add portfolio"
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
          // onFinish={handleSubmit}
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
            label="Url"
            name="url"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="url" />
          </Form.Item>
          <Form.Item name="photoId" label="Upload">
            <input type="file" id="" onChange={handleFileSelect} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Portfolio;
