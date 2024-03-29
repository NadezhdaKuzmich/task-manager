import styles from "./MainContent.module.css";
import Button from "../Buttons/Button";
import photo from '../../images/1.jpg';

const MainContent = () => {
  return (
    <div className="container">
      <div className={styles.mainWrap}>
        <div className={styles.promo}>
          <div className={styles.title}>
            <h1>
              Lorem ipsum <br /> dolor sit amet.
            </h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            reiciendis magnam eveniet, voluptatem est corrupti.
          </p>
          <Button hide="block" text="Try it" />
        </div>
        <img src={photo} alt="task management" className={styles.image} />
      </div>
    </div>
  );
};

export default MainContent;