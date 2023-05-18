import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Badge, Dropdown } from "antd";
import { HashLink as Link } from "react-router-hash-link";
import {
  ProjectOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CarryOutOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import BoardModal from "../../pages/Forms/FormsModal/FormsForBoard/BoardModal";
import BoardModalEdit from "../../pages/Forms/FormsModal/FormsForBoard/BoardModalEdit";
import {
  setBoardActive,
  deleteBoard,
} from "../../slices/BoardSlice/BoardsSlice";
import { toggleModal } from "../../slices/ModalSlice";
import ProgressComponent from "./ProgressComponent";
import styles from "./SideBar.module.css";

const SideBar = () => {
  const { boards } = useSelector((store) => store.boards);
  const board = boards.find((board) => board.isActive);
  const overdueCol = board?.columns.find((column) => column.name === "overdue");
  const [name, setName] = useState();
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    const board = boards.find((board) => board.id === event.currentTarget.id);
    handleEdit(board.name);
    dispatch(toggleModal({ modal: "isOpenBoardEdit" }));
  };

  const handleEdit = (board) => {
    setName(board);
  };

  const getItems = () => {
    let items = [
      {
        label: (
          <span className={styles.count}>ALL BOARDS: {boards.length}</span>
        ),
        key: "title",
        disabled: true,
      },
      { type: "divider" },
    ];
    boards.map((board, index) => {
      const item = {
        label: (
          <Button
            type="link"
            className={`boardBtn ${board.isActive ? "active" : ""}`}
          >
            <span className="drop-btn">
              {board.isActive ? (
                <SyncOutlined spin className={styles.icon} />
              ) : (
                <ProjectOutlined className={styles.icon} />
              )}
              {board.name}
            </span>
          </Button>
        ),
        children: [
          {
            label: (
              <Button
                id={index}
                type="link"
                onClick={() => {
                  dispatch(setBoardActive({ index }));
                }}
              >
                <CarryOutOutlined />
                <span className="drop-btn">Open this</span>
              </Button>
            ),
            key: `${index}-0`,
          },
          {
            label: (
              <Button id={board.id} type="link" onClick={handleOpen}>
                <EditOutlined />
                <span className="drop-btn">Edit board</span>
              </Button>
            ),
            key: `${index}-1`,
          },
          {
            label: (
              <Button
                type="link"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteBoard({ index: index }));
                }}
                danger
              >
                <DeleteOutlined />
                <span className="drop-btn">Delete Board</span>
              </Button>
            ),
            key: `${index}-2`,
          },
        ],
        key: index,
      };
      return items.push(item);
    });
    return items;
  };
  const items = getItems();

  return (
    <>
      {board ? (
        <div className={styles.wrapBg}>
          <div className="container">
            <div className={styles.sidebar}>
              <div className={styles.btnsSet}>
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                  type="button"
                  size="large"
                >
                  <Button
                    type="text"
                    className={`${styles.addBoard} ${styles.side}`}
                    icon={<MenuUnfoldOutlined />}
                  >
                    <span className="hide">BOARDS</span>
                  </Button>
                </Dropdown>
                <Button
                  type="text"
                  className={`${styles.addBoard} ${styles.side}`}
                  icon={<AppstoreAddOutlined />}
                  onClick={() =>
                    dispatch(toggleModal({ modal: "isOpenAddBoard" }))
                  }
                >
                  <span className="hide">ADD NEW</span>
                </Button>
                {board && overdueCol.tasks.length > 0 ? (
                  <div className={styles.hideOverdue}>
                    <Badge
                      count={overdueCol.tasks.length}
                      color="#ff7072e3"
                      offset={[-3, 5]}
                    >
                      <Link to="#overdue">
                        <Button
                          type="text"
                          className={`${styles.addBoard} ${styles.side}`}
                          icon={<ClockCircleOutlined />}
                        >
                          <span className="hide">OVERDUE</span>
                        </Button>
                      </Link>
                    </Badge>
                  </div>
                ) : null}
              </div>
              <ProgressComponent />
            </div>
          </div>
        </div>
      ) : null}
      <BoardModal />
      <BoardModalEdit board={name} />
    </>
  );
};

export default SideBar;