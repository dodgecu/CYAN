import React from "react";
import { Link } from "react-router-dom";

import "./dashboard.styles.scss";

import FlowerThumbnail from "../flower-thumbnail/flower-thumbnail";
import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";

import ArrowUp from "../../assets/arrow-up.svg";
import ArrowDown from "../../assets/arrow-down.svg";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      flowers: [
        {
          id: 1,
          name: "Aloa",
          type: "aloe",
          airTemperature: "87",
          airHumidity: "100",
          ambientLight: "45",
          soilHumidity: "4"
        },
        {
          id: 2,
          name: "Aloe",
          type: "alo",
          airTemperature: "87",
          airHumidity: "13",
          ambientLight: "45",
          soilHumidity: "4"
        }
      ],
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
      <div className="dashboard--thumbnail__item">
        <FlowerThumbnail
          key={index}
          name={item.name}
          type={item.type}
          airTemperature={item.airTemperature}
          airHumidity={item.airHumidity}
          ambientLight={item.ambientLight}
          soilHumidity={item.soilHumidity}
          id={item.id}
        />
      </div>
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
      <div className="dashboard--page">
        <PageTitle title="Dashboard" />
        <Header />
        <section className="dashboard">
          <div className="dashboard__search">
            <label>Search:</label>
            <input
              className="dashboard__search--field"
              type="text"
              placeholder="Search"
              value={filter}
              onChange={this.onFilter}
            />
          </div>

          <div className="dashboard--sorting">
            <span>Sort by</span>

            <div className="dashboard--sorting--alphabetical">
              Alphabetical
              <button
                className="dashboard--sorting__button"
                onClick={this.onSort}
              >
                <img
                  className="icon"
                  src={isAscendingSort ? ArrowUp : ArrowDown}
                />
              </button>
            </div>
          </div>
          <div className="dashboard--sorting">
            <span>Sort by</span>

            <div className="dashboard--sorting--problematical">
              Problematical
              <button
                className="dashboard--sorting__button"
                onClick={this.onSort}
              >
                <img
                  className="icon"
                  src={isAscendingSort ? ArrowUp : ArrowDown}
                />
              </button>
            </div>
          </div>
        </section>
        <div className="dashboard--flower-list">
          <h2>Flower list</h2>
          <Link to="/create-flower" className="dashboard__link">
            CREATE FLOWER
          </Link>
          <div className="dashboard--thumbnail">
            {data.length
              ? this.renderThumbnails(data)
              : this.renderFallbackMessage()}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
