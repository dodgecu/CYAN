import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import FlowerCard from './flower-card/FlowerCard.component';

import "./Dashboard.styles.scss";

// import FicusImage from './images/ficus.png';
// import CactusImage from './images/cactus.png';
// import AloeImage from './images/aloe.png';
// import PetuniaImage from './images/petunia.png';

// import ArrowUp from './images/arrow-up.svg';
// import ArrowDown from './images/arrow-down.svg';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      flowers: this.props.flowers,
      sortBy: "name",
      isAscendingSort: true,
      activeSort: {
        name: false,
        type: false
      }
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
    // return data.map((item, index) => <FlowerCard key={index} flower={item} />);
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

          <select value={this.state.value} onChange={this.onSelect}>
            <option value="name">name</option>
            <option value="type">type</option>
          </select>

          <button className="dashboard__sort-button" onClick={this.onSort}>
            <img src={isAscendingSort ? ArrowUp : ArrowDown} />
          </button>
        </div>

        <a href="/create">Create flower</a>

        {data.length
          ? this.renderThumbnails(data)
          : this.renderFallbackMessage()}
      </section>
    );
  }
}

Dashboard.defaultProps = {
  flowers: [
    { name: "Vasok", type: "Cactus" },
    { name: "Veronica", type: "Aloe vera" },
    { name: "Stepan", type: "Ficus" },
    { name: "Oksana Mykolaivna", type: "Petunia" },
    { name: "Yuriy Vasylovych", type: "Cactus" },
    { name: "Ficus Sergey", type: "Ficus" },
    { name: "Allo Ya Vera", type: "Aloe vera" },
    { name: "Lyudka", type: "Petunia" }
  ]
};

export default Dashboard;
