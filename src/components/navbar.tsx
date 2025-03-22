import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex md:flex-row flex-col gap-8 md:gap-0 justify-between items-center">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={100}
        height={100}
        className="w-15 h-15"
      />

      <div className="text-4xl font-bold text-center underline underline-offset-6 relative z-10">
        AI on Mantle
      </div>
    </div>
  );
};

export default Navbar;
