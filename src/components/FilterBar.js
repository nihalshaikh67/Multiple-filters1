import { useState } from "react";

const FilterBar = ({ genders, onFilter, handleFilterDate }) => {
  console.log(genders);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    gender: "",
    from: "",
    to: ""
  });

  const handleInputs = (field) => (e) => {
    const { value } = e.target;

    setFilters({
      ...filters,
      [field]: value
    });
    switch (field) {
      case "name":
        onFilter("name", value);
        break;
      case "email":
        onFilter("email", value);
        break;
      case "gender":
        onFilter("gender", value);
        break;
      case "from":
        handleFilterDate(value, "from");
        break;
      case "to":
        onFilter("name", value);
        break;

      default:
        break;
    }
  };
  return (
    <div className="row my-5">
      <div className="col">
        <h4 className="border-bottom">Filters</h4>
      </div>
      <div className="col-sm-12 my-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={filters.name}
          onChange={handleInputs("name")}
        />
      </div>

      <div className="col-sm-12 my-2">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          onChange={handleInputs("email")}
        />
      </div>

      <div className="col-sm-12 my-2">
        <label htmlFor="gender">Gender</label>
        <select
          className="form-control"
          id="gender"
          onChange={handleInputs("gender")}
        >
          <option value={""}>{"Select"}</option>
          {genders.map((elm) => {
            return (
              <option key={elm} value={elm}>
                {elm}
              </option>
            );
          })}
        </select>
      </div>

      <div className="col-sm-12 my-2">
        <label htmlFor="startDate">From</label>
        <input
          type="date"
          className="form-control"
          id="startDate"
          onChange={handleInputs("from")}
        />
      </div>
      <div className="col-sm-12 my-2">
        <label htmlFor="endDate">To</label>
        <input type="date" className="form-control" id="endDate" />
      </div>
    </div>
  );
};

export default FilterBar;
