import Header from "@/components/Pages/Components/Header";
import LoginContent from "@/components/Pages/Components/LoginContent";
import LoginCard from "@/components/Pages/Components/LoginCard";

const Login = () => {
  return (
    <div className="flex items-center flex-col py-10 px-[10%] w-full gap-20">
      <Header />
      <div className="flex items-center justify-between w-full">
        <div className="w-[40%]">
          <LoginContent />
        </div>
        <div className="flex items-center justify-center w-[50%]">
          <LoginCard />
        </div>
      </div>
    </div>
  );
};

export default Login;
