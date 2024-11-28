import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Discover the best deals and latest trends with us. Shop with
            confidence and enjoy seamless online shopping experiences.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-9876543210</li>
            <li>contact@waitnbuy.com</li>
          </ul>
        </div>
        <div className="col-span-3">
          <hr />
          <p className="py-5 text-sm text-center">
            Copyright 2024@ waitnbuy.com - All Right Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
