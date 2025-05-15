import Image from "next/image";
import React from "react";

const Advertisement = () => {
  return (
    <div className="px-5 lg:px-0">
      <Image
        src={"/assets/o-ads-space.png"}
        alt="Advertising Banner"
        width={500}
        height={500}
        className="mx-auto"
      />
    </div>
  );
};

export default Advertisement;
