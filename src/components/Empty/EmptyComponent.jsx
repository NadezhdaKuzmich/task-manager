import { useDispatch } from "react-redux";
import { Button, Tooltip, Empty } from "antd";
import { toggleModal } from "../../slices/ModalSlice";
import styles from "./EmptyComponent.module.css";

const EmptyComponent = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.emptyContainer}>
      <Empty
        imageStyle={{
          height: 200,
        }}
        description={
          <span>
            This Board is empty.
            <br />
            <strong>Create new one to get started.</strong>
          </span>
        }
      >
        <Tooltip
          placement="bottom"
          title="Add new board"
          color="#fff"
          overlayInnerStyle={{ color: "#8fa5eb" }}
        >
          <Button
            type="primary"
            className={styles.btn}
            onClick={() => dispatch(toggleModal({ modal: "isOpenAddBoard" }))}
          >
            Create Now
          </Button>
        </Tooltip>
      </Empty>
    </div>
  );
};

export default EmptyComponent;