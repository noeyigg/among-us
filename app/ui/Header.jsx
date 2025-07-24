import Link from "next/link";
import React from "react";

const Header = ( {today }) => {
  return (
    <>
    {/* <div>로고자리</div> */}
    <div></div>
    <div>
        {/* <Link href="/logout"></Link> */}
    </div>
    <span className="text-2xl font-semibold mb-6">{today}</span>
    </>
  );
};

export default Header;

