/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to WAITNBUY, your ultimate destination for the latest
            fashion trends in clothing. Whether you're shopping for men, women,
            or kids, we've got you covered with an exclusive range of topwear,
            bottomwear, and winter essentials. Our collection features the
            latest in fashion, ensuring that you stay stylish all year round.
            From casual wear to formal attire, WAITNBUY brings the best of
            fashion to your doorstep.
          </p>
          <p>
            At WAITNBUY, we pride ourselves on offering a variety of categories,
            including trendy t-shirts, shirts, jeans, trousers, dresses,
            jackets, sweaters, and much more. Our carefully curated collections
            cater to the fashion needs of men, women, and kids alike, making
            sure there's something for everyone. With a focus on comfort,
            quality, and style, WAITNBUY ensures that your wardrobe stays
            updated with the freshest looks of the season.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At WAITNBUY, our mission is to bring the latest fashion trends to
            everyone, making stylish and comfortable clothing accessible to all.
            We strive to provide a seamless online shopping experience with a
            diverse selection of high-quality apparel for men, women, and kids.
            Our goal is to empower our customers to express their individuality
            and confidence through fashion, offering pieces that cater to every
            style and occasion. We are committed to ensuring customer
            satisfaction, staying at the forefront of fashion innovation, and
            delivering the best in clothing at affordable prices.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At WAITNBUY, we are committed to delivering high-quality apparel.
            Each product goes through rigorous quality checks to ensure
            durability, comfort, and style. We ensure that our customers receive
            the best value for their money without compromising on quality.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            At WAITNBUY, we make shopping for your favorite clothing easy and
            hassle-free. Our user-friendly platform allows you to browse the
            latest fashion, find the right sizes, and enjoy a smooth shopping
            experience from the comfort of your home. With secure payment
            options and fast delivery, we ensure that shopping with us is as
            convenient as possible.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            We believe in providing exceptional customer service at WAITNBUY.
            Our support team is always ready to assist, ensuring every shopping
            experience is smooth and satisfying. We prioritize transparency and
            responsiveness to make sure every customer interaction is seamless.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;
