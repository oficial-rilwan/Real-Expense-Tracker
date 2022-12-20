import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import categoryColor from "../../utils/categoryColor";

interface CategoryIconProps {
  name: string;
}

const CategoryIcon = ({ name }: CategoryIconProps) => {
  switch (name) {
    case "Bills":
      return <ReceiptLongOutlinedIcon style={{ color: categoryColor(name) }} />;
    case "Car":
      return (
        <DirectionsCarFilledOutlinedIcon
          style={{ color: categoryColor(name) }}
        />
      );

    case "Clothes":
      return <CheckroomOutlinedIcon style={{ color: categoryColor(name) }} />;
    case "Travel":
      return <FlightOutlinedIcon style={{ color: categoryColor(name) }} />;
    case "Food":
      return <LunchDiningOutlinedIcon style={{ color: categoryColor(name) }} />;
    case "Shopping":
      return <ShoppingBagOutlinedIcon style={{ color: categoryColor(name) }} />;
    case "Housing":
      return <HomeOutlinedIcon style={{ color: categoryColor(name) }} />;
    case "Entertainment":
      return <LiquorOutlinedIcon style={{ color: categoryColor(name) }} />;
    case "Phone":
      return <SmartphoneOutlinedIcon style={{ color: categoryColor(name) }} />;
    case "Pets":
      return <PetsOutlinedIcon style={{ color: categoryColor(name) }} />;
    case "Others":
      return (
        <CurrencyExchangeOutlinedIcon style={{ color: categoryColor(name) }} />
      );
    default:
      return (
        <CurrencyExchangeOutlinedIcon style={{ color: categoryColor(name) }} />
      );
  }
};

export default CategoryIcon;
{
}
