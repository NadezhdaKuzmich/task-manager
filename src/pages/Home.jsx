import NavBar from "../components/Headers/NavigationHome/NavBarHome";
import MainContent from "../components/Main/MainContent";
import FooterComponent from "../components/Footer/FooterComponent";

const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        <MainContent />
      </main>
      <FooterComponent />
    </>
  );
};

export default Home;