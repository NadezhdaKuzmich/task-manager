import { useSelector, useDispatch } from "react-redux";
import { Modal, Descriptions, Tag, Button, message, Popconfirm } from "antd";
import {
  SyncOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { deleteTask } from "../../../../slices/BoardSlice/BoardsSlice";
import { toggleModal } from "../../../../slices/ModalSlice";

const DetailsTask = ({
  id,
  title,
  date,
  description,
  status,
  limit,
  responsible,
}) => {
  const { isOpenDetailsTask } = useSelector((store) => store.modal);
  const { boards } = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const dispatch = useDispatch();

  const chooseTag = (status) => {
    switch (status) {
      case "todo":
        return <Tag color="geekblue">todo</Tag>;
      case "in progress":
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">
            in progress
          </Tag>
        );
      case "done":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            done
          </Tag>
        );
      case "overdue":
        return (
          <Tag icon={<ExclamationCircleOutlined />} color="error">
            warning
          </Tag>
        );

      default:
        return false;
    }
  };

  const handleEdit = () => {
    dispatch(toggleModal({ modal: "isOpenDetailsTask" }));
    dispatch(toggleModal({ modal: "isOpenEditTask" }));
  };

  const handleDelete = () => {
    dispatch(deleteTask({ id: id, status: status }));
    dispatch(toggleModal({ modal: "isOpenDetailsTask" }));
    message.success("Task deleted!");
  };

  const cancel = (e) => {
    dispatch(toggleModal({ modal: "isOpenDetailsTask" }));
    message.error("Click on No");
  };

  return (
    <Modal
      title={<span className="title-modal">Details of task:</span>}
      centered
      open={isOpenDetailsTask}
      onCancel={() => dispatch(toggleModal({ modal: "isOpenDetailsTask" }))}
      bodyStyle={{ padding: "12px 0 0" }}
      className="modal-detail"
      width={500}
      footer={null}
    >
      <Descriptions column={1} size="middle">
        <Descriptions.Item label="Title" labelStyle={{ color: "#6f738c" }}>
          <h3 className="title-description">{title}</h3>
        </Descriptions.Item>
        <Descriptions.Item label="Status" labelStyle={{ color: "#6f738c" }}>
          {chooseTag(status)}
        </Descriptions.Item>
        <Descriptions.Item label="Author" labelStyle={{ color: "#6f738c" }}>
          <p className="descript">{board ? board.author : null}</p>
        </Descriptions.Item>
        <Descriptions.Item label="Deadline" labelStyle={{ color: "#6f738c" }}>
          <span className="date">
            {new Date(date).toLocaleString()} -{" "}
            {new Date(limit).toLocaleString()}
          </span>
        </Descriptions.Item>
        <Descriptions.Item
          label="Responsible"
          labelStyle={{ color: "#6f738c" }}
        >
          {responsible ? (
            <div>
              {responsible.map((user, i) => (
                <Tag color="geekblue" key={i}>
                  {user}
                </Tag>
              ))}
            </div>
          ) : (
            "not assigned"
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label="Description"
          labelStyle={{ color: "#6f738c" }}
        >
          <p className="descript">{description}</p>
        </Descriptions.Item>
      </Descriptions>
      <div className="footer-modal-task">
        <Button
          type="text"
          size="small"
          className="edit-modal-btn"
          icon={<EditOutlined />}
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={handleDelete}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" size="small" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </div>
    </Modal>
  );
};

export default DetailsTask;