import NavBarUser from "../components/Headers/NavBarHomeUser/NavBarUser";
import MainTasksSpace from "./MainTasksSpace";
import FooterComponent from "../components/Footer/FooterComponent";

const HomeUser = () => {
  return (
    <>
      <NavBarUser />
      <main>
        <MainTasksSpace />
      </main>
      <FooterComponent />
    </>
  );
};

export default HomeUser;