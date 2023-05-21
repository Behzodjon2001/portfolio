import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
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
const { Option } = Select;
const { confirm } = Modal;
// const validator = (_, { valid }) => {
//   if (valid) {
//     return Promise.resolve();
//   }
//   return Promise.reject("Invalid phone number");
// };

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 90 }}>
      <Option value="998">+998</Option>
      {/* <Option value="87">+87</Option> */}
    </Select>
  </Form.Item>
);

const Dashboard = () => {
  const columns = [
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Surname",
      key: "surname",
      dataIndex: "surname",
    },
    {
      title: "Username",
      key: "usernames",
      dataIndex: "usernames",
    },
    {
      title: "City",
      key: "city",
      dataIndex: "city",
    },
    {
      title: "Birthday",
      key: "bithday",
      dataIndex: "bithday",
    },
    {
      title: "Phone number",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Age",
      key: "age",
      dataIndex: "age",
    },
    {
      title: "Degree",
      key: "degree",
      dataIndex: "degree",
    },
    {
      title: "Specialist",
      key: "specialist",
      dataIndex: "specialist",
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
  const [data, setData] = useState([]);
  // const [dataUpdate, setDataUpdate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentForm] = Form.useForm();
  // const [setSelectedstudent] = useState(null);
  const dispatch = useDispatch();
  // const { students } = useSelector((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedStudent) {
      studentForm.validateFields().then((values) => {
        // console.log(values);
        dispatch(editStudentAction({ id: selectedStudent, ...values }));
        axios
          .put(ENDPOINT + "/profile/adm/update/" + values.id, values, {
            headers: { Authorization: "Bearer " + token },
          })
          .finally(setLoading(false));
        // window.location.href = "/dashboard";
      });
    } else {
      studentForm.validateFields().then((values) => {
        dispatch(addStudentAction(values));
        sendData("/profile/adm/create", values);
        window.location.href = "/dashboard";
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
    studentForm.resetFields();
  };
  const token = localStorage.getItem(TOKEN);
  const deleteStudent = (id) => {
    console.log(id);
    confirm({
      title: "Do you Want to delete this Student?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        dispatch(deleteStudentAction(id));
        axios.delete(ENDPOINT + "/profile/adm/delete/" + id, {
          headers: { Authorization: "Bearer " + token },
        });
        window.location.href = "/dashboard";
      },
    });
  };
  const editstudent = (id) => {
    showModal();
    setSelectedStudent(id);
    axios.get(ENDPOINT + "/profile/free/one/" + id).then((res) => {
      studentForm.setFieldsValue(res.data);
    });
  };

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem(TOKEN);
    axios
      .get(ENDPOINT + "/profile/adm/all/get", {
        headers: { Authorization: "Bearer " + token },
      })

      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  }, []);
  // console.log(data);
  // window.location.href = "/dashboard";
  // getData();

  return (
    <>
      <Table
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Admin</h1>
            <Button onClick={openFormModal} type="primary">
              Add Admin
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 600 }}
      />
      <Modal
        title="Add admin"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={selectedStudent ? "Save" : "Add"}
      >
        <Form
          form={studentForm}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
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
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="surname" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="usernames"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="usernames" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: selectedStudent ? false : true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="city" />
          </Form.Item>
          <Form.Item name="bithday" label="Birthday" {...config}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              placeholder="(90)1234566"
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item label="InputNumber" name="age">
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Degree"
            name="degree"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="degree" />
          </Form.Item>

          <Form.Item
            label="Specialist"
            name="specialist"
            rules={[
              {
                required: true,
                message: "Please fill this field!",
              },
            ]}
          >
            <Input placeholder="specialist" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Dashboard;
