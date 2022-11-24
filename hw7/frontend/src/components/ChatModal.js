import { Modal, Form, Input} from 'antd';

const ChatModal = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new chat room"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOK={() =>{
        form
          .validateFields()
          .then((values) =>{
            form.resetFields();
            onCreate(values);
          })
          .catch((e) =>{
            window.alert(e);
          })
      }}
    >
      <Form form={form} layout='vertical'
            name="form_in_modal">
        <Form.Item>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
  
  
   