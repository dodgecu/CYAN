import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

import "./dashboard.styles.scss";

import FlowerThumbnail from "../flower-thumbnail/flower-thumbnail";
import Header from "../../common/header/header.component";
import PageTitle from "../../common/page-title/page-title.component";

import { fetchSensors } from "../../common/sensors/sensors.middleware";

import { backendUrl } from "../../constants/backendUrl";

import ArrowUp from "../../assets/arrow-up.svg";
import ArrowDown from "../../assets/arrow-down.svg";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      flowers: [],
      sortBy: "name",
      isAscendingSort: true
    };

    this.onFilter = this.onFilter.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.renderThumbnails = this.renderThumbnails.bind(this);
    this.renderFallbackMessage = this.renderFallbackMessage.bind(this);
    this.fil = this.fil.bind(this);
  }

  componentDidMount() {
    this.props.fetchSensors();
    const curretnUser = JSON.parse(`${localStorage.getItem("state")}`)
      .authReducer.user.id;

    axios
      .get(`${backendUrl}/user-flowers?id=${curretnUser}`)
      .then(flower => {
        flower.data.forEach(current => {
          this.setState(state => {
            const flowers = state.flowers.push(current);
            return flowers;
          });
        });
      })
      .catch(err => err);
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

  fil() {
    this.flowers.filter(flower => flower.issues.length !== 0);
  }

  renderThumbnails(data) {
    return data.map(item => {
      const flowerId = parseInt(item.package_id);
      const active = this.props.sensors.filter(item => {
        if (item.pack !== undefined) {
          return item.pack.package_id === flowerId;
        }
        return item;
      });
      if (active.length > 0) {
        if (active[0].pack !== undefined) {
          const {
            sensors: { humidity, temperature, soilMoisture }
          } = active[0].pack;

          return (
            <div className="dashboard--thumbnail__item" key={item._id}>
              <FlowerThumbnail
                name={item.name}
                type={item.type}
                soilHumidity={soilMoisture["Sensor data"]}
                airTemperature={temperature}
                airHumidity={humidity}
                ambientLight={temperature}
                id={item._id}
              />
            </div>
          );
        }
      }
      return (
        <div className="dashboard--thumbnail__item" key={item._id}>
          <FlowerThumbnail
            name={item.name}
            type={item.type}
            soilHumidity={item.soilHumidity}
            airTemperature={item.airTemperature}
            airHumidity={item.airHumidity}
            ambientLight={item.light}
            id={item._id}
          />
        </div>
      );
    });
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
              <label>
                Alphabetical
                <button
                  className="dashboard--sorting__button"
                  onClick={this.onSort}
                >
                  <img
                    className="icon"
                    src={isAscendingSort ? ArrowUp : ArrowDown}
                    alt=""
                  />
                </button>
              </label>
            </div>
          </div>
          <div className="dashboard--sorting">
            <span>Filter by</span>

            <div className="dashboard--sorting--problematical">
              <label>
                Problematical
                <input type="checkbox" onClick={this.fil} />
              </label>
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

const mapStateToProps = state => {
  return state.sensors;
};
export default connect(
  mapStateToProps,
  { fetchSensors }
)(Dashboard);
