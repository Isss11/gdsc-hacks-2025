import applicationLogo from "../assets/apple-bite.png";

const Header = () => {
  return (
    <header>
      <div id="title-banner">
        <img
          src={applicationLogo}
          alt="LeftoverMesh Logo"
          id="title-logo"
        ></img>
        <h1 id="title-font">LeftoverMesh</h1>
      </div>
    </header>
  );
};

export default Header;
