import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Modal, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../../Context/useAuth'; // Update the path as per your file structure
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreatePost = () => {
  const { user } = useAuth(); // Get user object from context
  const userId = user?.userId; // Extract userId from user object
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = () => {
    setIsModalVisible(true); // Show confirmation modal
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      const response = await axios.post(`https://localhost:7228/api/Owner/create-post/${userId}`, values);
      console.log(response.data); // Handle success response
      message.success('Post created successfully!');
      setIsModalVisible(false); // Hide modal
      // Reset form fields
      form.resetFields();
      // Navigate to /vehicle-post
      navigate('/vehicle-post');
    } catch (error) {
      console.error('Error creating post:', error); // Handle error
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  return (
    <>
    <Form
      className='w-1/2 mx-auto bg-white p-6 rounded-lg shadow-md'
      style={{ marginTop: '35px', marginBottom: '35px' }}
      labelCol={{
        xs: { span: 24 },
        sm: { span: 6 },
      }}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 14 },
      }}
      layout="horizontal"
      initialValues={{ remember: true }}
      onFinish={onFinish} // Handle form submission
      form={form} // Pass the form instance
    >
      <Form.Item
        label="Vehicle Name"
        name="VehicleName"
        rules={[{ required: true, message: 'Please input the vehicle name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Fuel Type"
        name="VehicleFuel"
        rules={[{ required: true, message: 'Please input the fuel type!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Vehicle Type"
        name="VehicleType"
        rules={[{ required: true, message: 'Please input the vehicle type!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Manufacturing Year"
        name="VehicleYear"
        rules={[{ required: true, message: 'Please input the manufacturing year!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Number of Seats"
        name="VehicleSeat"
        rules={[{ required: true, message: 'Please input the number of seats!' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Title"
        name="Title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="Description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      {/* <Form.Item
        label="Image"
        name="Image"
        rules={[{ required: true, message: 'Please input the image!' }]}
      >
        <Input type="file" />
      </Form.Item> */}

      <Form.Item
        label="Category"
        name="Category"
        rules={[{ required: true, message: 'Please select the category!' }]}
      >
        <Select>
          <Option value="Car">Car</Option>
          <Option value="Motorbike">Motorbike</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Price"
        name="Price"
        rules={[{ required: true, message: 'Please input the price!' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Address"
        name="Address"
        rules={[{ required: true, message: 'Please input the address!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="PlaceId"
        name="PlaceId"
        rules={[{ required: true, message: 'Please input the place ID!' }]}
        extra={<a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" style={{ marginTop: '8px', display: 'block' }}>Take your Place ID</a>}
        >
        <Input />
      </Form.Item>

     
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button className='bg-sky-500 hover:bg-sky-700' type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
    {/* Confirmation Modal */}

      <Modal
        title="Confirmation"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ // Style the OK button
          className: 'bg-sky-500 hover:bg-sky-700', // Add your button styles here
        }}
        cancelButtonProps={{ // Style the Cancel button
          className: 'bg-red-500 hover:bg-red-700', // Add your button styles here
        }}
      >
        <p>Are you sure you want to add this post?</p>
      </Modal>
    </>
  );
};

export default CreatePost;
