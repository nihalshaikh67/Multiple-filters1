import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PersonItem from "./components/PersonItem";
import { data } from "./MOCK_DATA";
import FilterBar from "./components/FilterBar";
import { useState } from "react";
import dayjs from "dayjs";
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
function App() {
  const [allData, setAllData] = useState(data);
  const generateGenderDataForDropdown = () => {
    return [...new Set(data.map((item) => item.gender))];
  };

  function handleFilter(filterType, filterValue) {
    const updatedItemList = data.filter((item) => {
      let itemValue;
      if (filterType === "name") {
        itemValue = `${item.first_name} ${item.last_name}`;
      } else if (filterType === "email") {
        itemValue = item.email;
      } else if (filterType === "gender") {
        itemValue = item.gender;
        return itemValue === filterValue;
      }
      return itemValue.toLowerCase().includes(filterValue.toLowerCase());
    });
    setAllData(updatedItemList);
  }

  // function handleFilterDate(date, field) {
  //   const updatedItemList = data.filter((item) => {
  //     if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
  //       return item;
  //     }
  //   });
  //   setAllData(updatedItemList);
  // }
  const handleFilterDate = (date, field) => {
    const filteredData = data.filter((item) => {
      if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
        return item;
      }
    });

    setAllData(filteredData);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <FilterBar
            genders={generateGenderDataForDropdown()}
            onFilter={handleFilter}
            handleFilterDate={handleFilterDate}
          />
        </div>
        <div className="col-sm-9">
          <div className="row mt-5">
            {allData.map((item) => (
              <PersonItem item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
