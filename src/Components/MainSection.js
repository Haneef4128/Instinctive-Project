import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, addStudent, updateStudent, deleteStudent } from "../redux/studentsSlice";
import Search from "../assets/Search.png";
import { DateTimePicker } from "react-widgets";
import { DatePicker } from "antd";
import moment from "moment";
import "react-widgets/styles.css";
import Help from "../assets/Help.png";
import Message from "../assets/Message.png";
import Settings from "../assets/Settings1.png";
import Notification from "../assets/Notificaton.png";
import User from "../assets/User.png";
import Add from "../assets/Add.png";
import Dropdown from "../assets/Dropdown.png";
import { Button } from "react-bootstrap";
import Boy from "../assets/boy.svg";
import Girl from "../assets/girl.svg";
import { Modal, Form, Input, Select, Switch } from "antd";

function MainSection() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const studentStatus = useSelector((state) => state.students.status);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newInstinctive, setNewInstinctive] = useState({
    name: "",
    cohort: "",
    courses: "",
    dateJoined: "",
    lastLogin: "",
    status: false,
  });

  useEffect(() => {
    if (studentStatus === 'idle') {
      dispatch(fetchStudents());
    }
  }, [studentStatus, dispatch]);

  const onFinish = async (values) => {
    const courseMapping = {
      science: "CBSE 9 Science",
      maths: "CBSE 9 Math",
    };
    const formattedValues = {
      ...values,
      courses: values.courses.map((course) => courseMapping[course]).join(", "), // Convert courses array to comma-separated string
      dateJoined: values.dateJoined ? values.dateJoined.toISOString() : "",
      lastLogin: values.lastLogin ? values.lastLogin.toISOString() : "",
      status: values.status !== undefined ? values.status : false, // Ensure the status is boolean
    };

    try {
      await dispatch(addStudent(formattedValues)).unwrap();
      setOpen(false); // Close modal
      form.resetFields(); // Reset form fields
    } catch (error) {
      console.error("Error creating instinctive:", error);
    }
  };

  const handleAdd = () => {
    setSelectedStudent(null);
    setNewInstinctive({
      name: '',
      cohort: '',
      courses: [],
      dateJoined: null,
      lastLogin: null,
      status: false,
    });
    form.setFieldsValue({
      name: '',
      cohort: '',
      courses: [],
      dateJoined: null,
      lastLogin: null,
      status: false,
    });
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      await onFinish();
      setOpen(false);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleDelete = async (student) => {
    try {
      await dispatch(deleteStudent(student.id)).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleUpdate = async (values) => {
    const updatedStudent = {
      ...selectedStudent,
      ...values,
      courses: values.courses.join(", "),
      dateJoined: values.dateJoined.toISOString(),
      lastLogin: values.lastLogin.toISOString(),
    };

    try {
      await dispatch(updateStudent(updatedStudent)).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!date.getTime()) return "Invalid Date";
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}. ${month}. ${year}`;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (!date.getTime()) return "Invalid Date";
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${day}. ${month}. ${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="main-section">
      <main className="ml-0 md:ml-64 p-4 md:p-8 py-6 flex-1 bg-rightGray">
      <div className="w-full md:max-w-[1200px] h-auto flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
          <div className="w-full md:w-[614px] h-[48px] rounded-[12px] px-4 md:px-[20px] bg-white flex items-center">
            <div className="w-[157px] h-[20px] gap-[10px] flex">
              <div className="w-[18px] h-[18px]">
                <img src={Search} alt="Search" className="w-[18px] h-[18px]" />
              </div>
              <div className="flex-1">
                <p className="w-[129px] h-[20px] font-noto text-[14px] font-medium leading-[20px] text-left text-searchGray">
                  Search your course
                </p>
              </div>
            </div>
          </div>

          <div className="w-[473px] h-[48px] flex items-center gap-[40px] justify-end">
            <div className="w-[24px] h-[24px]">
              <img
                src={Help} alt="Help"
                className="w-[24px] h-[24px] left-[2px] relative"
                
              />
            </div>

            <div className="relative w-[24px] h-[24px]">
              <img
                src={Message} alt="Message"
                className="w-[20px] h-[19.5px] top-[3px] left-[2px] relative"
                
              />
              <div className="absolute top-0 right-[-3px] w-[11px] h-[11px] border-2 border-solid border-[#FFFFFF] bg-redDot rounded-full"></div>
            </div>

            <div className="w-[24px] h-[24px]">
              <img
                src={Settings}
                className="w-[18px] h-[17px] top-[3.5px] left-[3px] relative"
                alt="Settings"
              />
            </div>

            <div className="relative w-[24px] h-[24px]">
              <img
                src={Notification}
                className="w-[17px] h-[20px] top-[2px] left-[3.5px] relative"
                alt="Notification"
              />
              <div className="absolute top-0 right-0 w-[11px] h-[11px] border-2 border-solid border-[#FFFFFF] bg-redDot rounded-full"></div>
            </div>

            <div className="w-[217px] h-[48px] gap-[20px] flex items-center">
              <div className="w-[48px] h-[48px]">
                <img
                  src={User}
                  className="w-[44px] h-[44px] top-[4px] left-[4px] rounded-[8px] relative"
                  alt="Notification"
                />
              </div>
              <div className="w-[149px] h-[26px] font-noto text-[18px] leading-[26px] text-left underline-from-font decoration-skip-ink-none">
                Adeline H. Dancy
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[664px] top-[20px] rounded-[15px] bg-white relative">
  <div className="flex flex-wrap gap-2 px-4 pt-4 items-center justify-between">
    {/* Left Section: AY 2024-25 and CBSE 9 */}
    <div className="flex flex-wrap gap-2">
      {/* AY 2024-25 Dropdown */}
      <div className="flex items-center w-auto h-[38px] rounded-[6px] py-[7px] px-[15px] gap-[10px] bg-bodyGray">
        <p className="font-noto text-[16px] font-bold leading-[22px] text-bodyText">
          AY 2024-25
        </p>
        <img src={Dropdown} className="w-[24px] h-[24px]" alt="Dropdown" />
      </div>

      {/* CBSE 9 Dropdown */}
      <div className="flex items-center w-auto h-[38px] rounded-[6px] py-[7px] px-[15px] gap-[10px] bg-bodyGray">
        <p className="font-noto text-[16px] font-bold leading-[22px] text-bodyText">
          CBSE 9
        </p>
        <img src={Dropdown} className="w-[24px] h-[24px]" alt="Dropdown" />
      </div>
    </div>

    {/* Right Section: Add New Student */}
    <div
      onClick={() => handleAdd()}
      className="flex items-center w-auto h-[36px] rounded-[6px] py-[7px] px-[15px] gap-[10px] bg-bodyGray cursor-pointer ml-auto"
    >
      <img src={Add} className="w-[15.62px] h-[15.62px]" alt="Add" />
      <button className="font-noto text-[16px] font-bold leading-[22px] text-bodyText">
        Add new student
      </button>
    </div>
    </div>

          <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
          >
            <Form
              name="basic"
              className="mt-8"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ minWidth: "100%" }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="Student Name"
                name="name"
                rules={[{ required: true, message: "Please input your Name!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Cohort"
                name="cohort"
                rules={[
                  { required: true, message: "Please input your Cohort!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Courses"
                name="courses"
                rules={[
                  { required: true, message: "Please select the courses!" },
                ]}
              >
                <Select mode="multiple" placeholder="Select courses">
                  <Select.Option value="science">Science</Select.Option>
                  <Select.Option value="maths">Maths</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Date Joined"
                name="dateJoined"
                rules={[
                  { required: true, message: "Please select the Date Joined!" },
                ]}
              >
                <DateTimePicker
                  value={newInstinctive.dateJoined}
                  onChange={(date) => setNewInstinctive({ ...newInstinctive, dateJoined: date })}
                  format="MMM dd, yyyy"
                />
              </Form.Item>

              <Form.Item
                label="Last Login"
                name="lastLogin"
                rules={[
                  {
                    required: true,
                    message: "Please select the Last Login date and time!",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm A"
                  value={newInstinctive.lastLogin ? moment(newInstinctive.lastLogin) : null}
                  onChange={(date) => setNewInstinctive({ ...newInstinctive, lastLogin: date })}
                />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                valuePropName="checked"
              >
                <Switch
                  checked={newInstinctive.status}
                  onChange={(checked) => {
                    console.log(checked);
                    setNewInstinctive({ ...newInstinctive, status: checked });
                  }}
                  onColor="#86d3ff"
                  offColor="#ffcccb"
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button variant="primary" type="submit" className="w-[80px] h-[30px] bg-blue-600 text-white font-noto text-[16px] font-bold leading-[22px] rounded text-center">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <div className="top-12 relative w-[97%] ml-auto mr-auto">
            <table className="table-auto border-collapse w-full text-left">
              <thead>
                <tr>
                  <th className="relative border-b font-bold w-[180px] h-[16px]  font-noto text-[12px] leading-[16.34px] text-left pb-4">
                    Student Name
                  </th>
                  <th className="relative border-b font-bold w-[46.85px] h-[16px] font-noto text-[12px] leading-[16.34px] text-left pb-4">
                    Cohort
                  </th>
                  <th className="relative border-b font-bold w-[100px] h-[16px] font-noto text-[12px] leading-[16.34px] text-left pb-4">
                    Courses
                  </th>
                  <th className="relative border-b font-bold w-[100px] h-[16px] font-noto text-[12px] leading-[16.34px] text-left pb-4">
                    Date Joined
                  </th>
                  <th className="relative border-b font-bold w-[100px] h-[16px] font-noto text-[12px] leading-[16.34px] text-left pb-4">
                    Last login
                  </th>
                  <th className="relative border-b font-bold w-[97.04px] h-[16px] font-noto text-[12px] leading-[16.34px] text-center pb-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="h-[40px] border-b relative" onClick={() => handleRowClick(student)}>
                    {/* Student Name */}
                    <td className="w-[124.93px] h-[16px] font-noto text-[12px] font-normal leading-[16.34px] text-left">
                      {student.name}
                    </td>

                    {/* Cohort */}
                    <td className="w-[124.93px] h-[16px] font-noto text-[12px] font-normal leading-[16.34px] text-left">
                      {student.cohort}
                    </td>

                    {/* Courses */}
                    <td className="flex gap-2">
                      {student.courses.split(", ").map((course, index) => (
                        <div
                          key={index}
                          className="w-[134.97px] h-[24px] top-2 relative rounded-[6px] py-[2px] px-[8px] pl-[4px] gap-[4px] bg-tableGray flex items-center"
                        >
                          {/* Conditional Logo */}
                          <img
                            src={course.includes("Math") ? Girl : Boy}
                            className="w-[20px] h-[20px] rounded-[4px]"
                            alt="Course Logo"
                          />
                          <div className="w-[85px] h-[16px] gap-[2px] font-noto text-[12px] font-medium leading-[16.34px] text-left">
                            {course}
                          </div>
                        </div>
                      ))}
                    </td>

                    <td className="border-b w-[82.54px] h-[16px] font-noto text-[12px] font-normal leading-[16.34px] text-left">
                      {formatDate(student.dateJoined)}
                    </td>

                    <td className="border-b w-[110px] h-[16px] font-noto text-[12px] font-normal leading-[16.34px] text-left">
                      {formatDateTime(student.lastLogin)}
                    </td>

                    {/* Status */}
                    <td className="border-b w-[136.08px] h-[16px] font-noto text-[12px] font-normal leading-[16.34px] text-center">
                      <div
                        className={`w-[14.4px] h-[15px] mx-auto ${
                          student.status ? "bg-tableGreen" : "bg-red-500"
                        } rounded-full`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Modal
            title={`Manage Student - ${selectedStudent?.name}`}
            visible={isModalOpen}
            onCancel={handleModalClose}
            footer={null}
            key={selectedStudent?.id}
          >
            <Form
              form={form}
              initialValues={{
                name: selectedStudent?.name,
                cohort: selectedStudent?.cohort,
                courses: selectedStudent?.courses.split(", "),
                dateJoined: moment(selectedStudent?.dateJoined),
                lastLogin: moment(selectedStudent?.lastLogin),
                status: selectedStudent?.status,
              }}
              onFinish={handleUpdate}
            >
              <Form.Item label="Name" name="name">
                <Input />
              </Form.Item>

              <Form.Item label="Cohort" name="cohort">
                <Input />
              </Form.Item>

              <Form.Item label="Courses" name="courses">
                <Select
                  mode="multiple"
                  options={[
                    { label: "CBSE 9 Science", value: "science" },
                    { label: "CBSE 9 Math", value: "maths" },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Date Joined" name="dateJoined">
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>

              <Form.Item label="Last Login" name="lastLogin">
                <DatePicker showTime format="YYYY-MM-DD HH:mm A" />
              </Form.Item>

              <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch />
              </Form.Item>

              <div className="flex items-center gap-4">
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-[50px] h-[30px] bg-blue-600 text-white font-noto text-[16px] leading-[22px] rounded text-center">
                    Edit
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="danger"
                    onClick={() => handleDelete(selectedStudent)} className="w-[70px] h-[30px] bg-red-600 text-white font-noto text-[16px] leading-[22px] rounded text-center"
                  >
                    Delete
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default MainSection;