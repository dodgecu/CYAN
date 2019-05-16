import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";

import axios from "axios";

import "./dashboard.styles.scss";
import { Button, TYPES } from "../../common/components/button/button.component";

import FlowerThumbnail from "../flower-thumbnail/flower-thumbnail";
import Header from "../../common/header/header.component";
import Footer from "../../common/footer/footer.component";
import PageTitle from "../../common/page-title/page-title.component";

import { fetchSensors } from "../../common/sensors/sensors.middleware";
import { renderSensorData, checkSensors } from "./dashboard-sensors.validate";

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
      isAscendingSort: true,
      isProblematicSort: true
    };
    this.activeSensors = [];
    this.issues = [];
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

  sortByProblems = () => {
    if (this.issues.length) {
      const flower = this.issues
        .map(flow => flow.id)
        .reduce((obj, current) => {
          obj[current] ? obj[current]++ : (obj[current] = 2);
          return obj;
        }, {});

      const order = Object.keys(flower).sort((a, b) => flower[b] - flower[a]);

      this.setState(({ flowers, isProblematicSort }) => {
        const itemsToFilter = flowers.filter(
          flower => flower.package_id !== ""
        );
        const rest = flowers.filter(flower => flower.package_id === "");

        if (isProblematicSort) {
          itemsToFilter.sort(
            (a, b) => order.indexOf(a._id) - order.indexOf(b._id)
          );
        } else {
          itemsToFilter.sort(
            (a, b) => order.indexOf(b._id) - order.indexOf(a._id)
          );
        }
        const filtered = [...itemsToFilter, ...rest];

        return { flowers: filtered, isProblematicSort: !isProblematicSort };
      });
    }
  };

  shouldComponentUpdate() {
    this.activeSensors.length = 0;
    const { sensors } = this.props;
    if (sensors.dh22Err || sensors.soilErr || sensors.socketErr) {
      this.activeSensors.push(sensors);
      return true;
    }
    if (
      sensors.every(
        sensor =>
          Object.entries(sensor).length !== 0 && sensor.constructor === Object
      )
    ) {
      for (let sensor of sensors) {
        this.activeSensors.push(sensor);
      }
      return true;
    }

    return false;
  }

  renderThumbnails(data) {
    this.issues.length = 0;
    return data.map((flower, i) => {
      const sensorData = renderSensorData(
        this.activeSensors,
        flower.package_id
      );

      const {
        airHumidity,
        airTemperature,
        soilHumidity,
        delta,
        light
      } = flower;
      if (sensorData.connected) {
        if (sensorData.sensorHumidity + delta < airHumidity) {
          this.issues.push({ id: flower._id, problematic: true });
        }
        if (sensorData.sensorTemperature + delta < airTemperature) {
          this.issues.push({ id: flower._id, problematic: true });
        }
        if (sensorData.sensorSoilMoisture + delta < soilHumidity) {
          this.issues.push({ id: flower._id, problematic: true });
        }
        if (sensorData.sensorLight + delta < light) {
          this.issues.push({ id: flower._id, problematic: true });
        }
      }
      this.issues.push({ id: flower._id, problematic: false });

      const [currentFlower] = this.issues.filter(id => id.id === flower._id);

      return (
        <div className="dashboard--thumbnail__item" key={flower._id}>
          <FlowerThumbnail
            name={flower.name}
            type={flower.type}
            soilMoisture={sensorData.sensorSoilMoisture}
            airTemperature={sensorData.sensorTemperature}
            airHumidity={sensorData.sensorHumidity}
            ambientLight={sensorData.sensorLight}
            id={flower._id}
            picture={flower.img_path}
            disconnected={!sensorData.connected}
            issues={currentFlower.problematic}
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
    const { filter, flowers, isAscendingSort, isProblematicSort } = this.state;
    const data = flowers.filter(item =>
      item.name.toLowerCase().match(filter.toLowerCase())
    );

    if (this.state.flowers.length) {
      renderContent = (
        <>
          <section className="dashboard">
            <div className="dashboard__search">
              <label className="dashboard__search__title">Search</label>
              <input
                data-tip="Search for flowers..."
                className="dashboard__search--field"
                type="text"
                placeholder="Flower name..."
                value={filter}
                onChange={this.onFilter}
              />
            </div>

            <div className="dashboard--sorting">
              <span className="dashboard--sorting__title">Sort by</span>

              <div className="dashboard--sorting--alphabetical">
                <label onClick={this.onSort} data-tip="Sort flowers by name">
                  Alphabetical
                  <button className="dashboard--sorting__button">
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

              <div className="dashboard--sorting--filter">
                <label className="dashboard--sorting--filter--problematical">
                  <span>Problematical</span>

                  <input type="checkbox" onClick={this.sortByProblems} />
                </label>
                <label className="dashboard--sorting--filter--disconnected">
                  <span>Disconnected</span>
                  <input type="checkbox" onClick={this.sortByProblems} />
                </label>
              </div>
            </div>
          </section>
          <div className="dashboard--flower-list">
            <h2 className="dashboard--flower-list__title">Flower list</h2>
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
        <ReactTooltip />
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
