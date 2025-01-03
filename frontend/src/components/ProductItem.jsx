import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div>
      <Link className="text-gray cursor-pointer" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img
            className="h-72 w-full object-cover hover:scale-110 transition ease-in-out"
            src={image[0]}
            alt=""
          />
          <p className="pt-3 pb-1 text-sm">{name}</p>
          <p className="text-sm font-medium">
            {currency}
            {price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
