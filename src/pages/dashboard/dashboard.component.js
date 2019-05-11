import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

import "./dashboard.styles.scss";
import { Button, TYPES } from "../../common/components/button/button.component";

import FlowerThumbnail from "../flower-thumbnail/flower-thumbnail";
import Header from "../../common/header/header.component";
import Footer from "../../common/footer/footer.component";
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
    this.issues = {};
    this.onFilter = this.onFilter.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.renderThumbnails = this.renderThumbnails.bind(this);
    this.renderFallbackMessage = this.renderFallbackMessage.bind(this);
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

  sortByProblems = () => {};

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
            sensors: { humidity, temperature, soilMoisture, light }
          } = active[0].pack;

          if (
            parseFloat(soilMoisture["Sensor data"]) + item.delta <
            item.soilHumidity
          ) {
            this.issues["name"] = item.name;
          }
          if (parseFloat(humidity) + item.delta < item.airHumidity) {
            this.issues["name"] = item.name;
          }
          if (parseFloat(light) + item.delta < item.light) {
            this.issues["name"] = item.name;
          }
          if (parseFloat(temperature) + item.delta < item.airTemperature) {
            this.issues["name"] = item.name;
          }

          return (
            <div className="dashboard--thumbnail__item" key={item._id}>
              <FlowerThumbnail
                name={item.name}
                type={item.type}
                soilMoisture={soilMoisture["Sensor data"]}
                airTemperature={temperature}
                airHumidity={humidity}
                ambientLight={light}
                id={item._id}
                picture={item.img_path}
                disconnected={false}
                issues={this.issues.name === item.name ? true : false}
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
            soilMoisture={item.soilHumidity}
            airTemperature={item.airTemperature}
            airHumidity={item.airHumidity}
            ambientLight={item.light}
            id={item._id}
            picture={item.img_path}
            disconnected={true}
            issues={false}
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
    let renderContent;
    const { filter, flowers, isAscendingSort } = this.state;
    const data = flowers.filter(item =>
      item.name.toLowerCase().match(filter.toLowerCase())
    );

    if (this.state.flowers.length) {
      renderContent = (
        <>
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
              <span className="dashboard--sorting__title">Sort by</span>

              <div className="dashboard--sorting--alphabetical">
                <label>
                  Alphabetical
                  <button
                    className="dashboard--sorting__button"
                    onClick={this.onSort}
                  >
                    <img
                      className={
                        isAscendingSort ? "icon icon--up" : "icon icon--down"
                      }
                      src={isAscendingSort ? ArrowUp : ArrowDown}
                      alt="sort by alphabet"
                    />
                  </button>
                </label>
              </div>
            </div>
            <div className="dashboard--sorting">
              <span className="dashboard--sorting__title">Filter by</span>

              <div className="dashboard--sorting--problematical">
                <label>
                  Problematical
                  <button
                    className="dashboard--sorting__button"
                    onClick={this.sortByProblems}
                  >
                    <img
                      className="icon"
                      src={ArrowUp}
                      alt="show problematical"
                    />
                  </button>
                </label>
              </div>
            </div>
          </section>
          <div className="dashboard--flower-list">
            <h2>Flower list</h2>
            <Link to="/create" className="dashboard__link">
              CREATE FLOWER
            </Link>
            <div className="dashboard--thumbnail">
              {data.length
                ? this.renderThumbnails(data)
                : this.renderFallbackMessage()}
            </div>
          </div>
        </>
      );
    } else {
      renderContent = (
        <div className="empty-dashboard">
          <p className="empty-dashboard__title">You have no flowers</p>
          <div className="empty-dashboard--create">
            <Link to="/create" className="create__link">
              <Button buttonType={TYPES.PRIMARY} title="CREATE FLOWER" />
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard--page">
        <PageTitle title="Dashboard" />
        <Header />
        {renderContent}
        <Footer />
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
