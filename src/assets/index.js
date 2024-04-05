
import CustomSelect2 from "../components/Select/CustomeSelect2/CustomeSelect2";

const [selectedOption, setSelectedOption] = useState("Option 1");
const options = ["Option 1", "Option 2", "Option 3"];

const handleSelectChange = (value) => {
  setSelectedOption(value);
};

<CustomSelect2
  options={options}
  value={selectedOption}
  onChange={handleSelectChange}
/>;
