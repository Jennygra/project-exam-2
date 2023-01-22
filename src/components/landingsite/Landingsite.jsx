import Banner from "./Banner";
import RegisterForm from "../register/RegisterForm";

function Landingsite() {
  return (
    <>
      <Banner />
      <p className="text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <RegisterForm />
    </>
  );
}

export default Landingsite;
