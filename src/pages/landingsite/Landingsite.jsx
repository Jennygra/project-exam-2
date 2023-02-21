import Banner from "./Banner";
import RegisterForm from "../register/RegisterForm";

// This is the landingsite(home) for non logged in users

function Landingsite() {
  return (
    <>
      <Banner />

      <div className="landingsite-text">
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="landingsite-form">
        <RegisterForm />
      </div>
    </>
  );
}

export default Landingsite;
