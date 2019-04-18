import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FlowerThumbnail from "../flower-thumbnail/flower-thumbnail";

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
        id: 1,
        name: false
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

          <select value={this.state.value} onChange={this.onSelect}>
            <option value="name">name</option>
            <option value="type">type</option>
          </select>

          <button className="dashboard__sort-button" onClick={this.onSort}>
            {/* <img src={isAscendingSort ? ArrowUp : ArrowDown} /> */}
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
    {
      id: 1,
      name: "Vasok",
      temperature: "60",
      humidity: "30",
      light: "12",
      air: "37"
    },
    {
      id: 2,
      name: "Veronica",
      temperature: "60",
      humidity: "30",
      light: "12",
      air: "37"
    },
    {
      id: 3,
      name: "Stepan",
      temperature: "60",
      humidity: "30",
      light: "12",
      air: "37"
    },
    {
      id: 4,
      name: "Oksana Mykolaivna",
      temperature: "60",
      humidity: "30",
      light: "12",
      air: "37"
    },
    {
      id: 5,
      name: "Yuriy Vasylovych",
      temperature: "60",
      humidity: "30",
      light: "12",
      air: "37"
    },
    {
      id: 6,
      name: "Ficus Sergey",
      temperature: "60",
      humidity: "30",
      light: "12",
      air: "37"
    },
    {
      id: 7,
      name: "Allo Ya Vera",
      temperature: "60",
      humidity: "30",
      light: "12",
      air: "37"
    },
    {
      id: 8,
      name: "Lyudka",
      temperature: "60",
      humidity: "30",
      light: "12",
      air: "37"
    }
  ]
};

export default Dashboard;
