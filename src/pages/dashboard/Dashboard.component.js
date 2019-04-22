import React from "react";
import { Link } from "react-router-dom";

import "./Dashboard.styles.scss";

import FlowerThumbnail from "../flower-thumbnail/flower-thumbnail";

import ArrowUp from "../../assets/arrow-up.svg";
import ArrowDown from "../../assets/arrow-down.svg";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      flowers: this.props.flowers,
      sortBy: "name",
      isAscendingSort: true
    };

    this.onFilter = this.onFilter.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.renderThumbnails = this.renderThumbnails.bind(this);
    this.renderFallbackMessage = this.renderFallbackMessage.bind(this);
  }

  onFilter(e) {
    this.setState({ filter: e.target.value });
  }

  onSelect(e) {
    this.setState({ sortBy: e.target.value });
  }

  onSort() {
    this.setState(({ flowers, sortBy, isAscendingSort }) => {
      flowers.sort((a, b) => {
        const left = a[sortBy].toLowerCase();
        const right = b[sortBy].toLowerCase();
        const statement = isAscendingSort ? left < right : left > right;

        return statement ? -1 : 1;
      });

      return { flowers, isAscendingSort: !isAscendingSort };
    });
  }

  renderThumbnails(data) {
    return data.map((item, index) => (
      <FlowerThumbnail
        key={index}
        name={item.name}
        temperature={item.temperature}
        humidity={item.humidity}
        light={item.light}
        air={item.air}
        id={item.id}
      />
    ));
  }

  renderFallbackMessage() {
    return !this.state.flowers.length ? (
      <p>There are no flowers yet</p>
    ) : (
      <p>No mathes</p>
    );
  }

  render() {
    const { filter, flowers, isAscendingSort } = this.state;
    const data = flowers.filter(item =>
      item.name.toLowerCase().match(filter.toLowerCase())
    );

    return (
      <section className="dashboard">
        <input
          className="dashboard__search-field"
          type="text"
          placeholder="Search by name"
          value={filter}
          onChange={this.onFilter}
        />

        <div className="dashboard__sorting">
          <span>Sort by</span>

          <select
            className="dashboard__sorting__select"
            value={this.state.sortBy}
            onChange={this.onSelect}
          >
            <option value="name">name</option>
            <option value="type">type</option>
          </select>

          <button className="dashboard__sort-button" onClick={this.onSort}>
            <img className="icon" src={isAscendingSort ? ArrowUp : ArrowDown} />
          </button>
        </div>

        <Link to="/create">Create flower</Link>

        {data.length
          ? this.renderThumbnails(data)
          : this.renderFallbackMessage()}
      </section>
    );
  }
}

Dashboard.defaultProps = {
  flowers: [
    {
      id: 1,
      name: "Flower name",
      temperature: "0",
      humidity: "0",
      light: "0",
      air: "0"
    }
  ]
};

export default Dashboard;
