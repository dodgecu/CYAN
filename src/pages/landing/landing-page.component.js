import React from "react";
import { Link } from "react-router-dom";

import "./landing-page.styles.scss";

const landing = () => {
  return (
    <>
      <header className="landing-header">
        <div className="landing-header__head-logo">
          <h1 className="landing-header__head-logo--title">Cyander</h1>
          <p className="landing-header__head-logo--tagline">
            My first online garden app
          </p>
        </div>
        <blockquote className="landing-header__quote">
          "In the spring, at the end of the day, you should smell like dirt." —
          <cite className="landing-header__quote--cite">Margaret Atwood</cite>
        </blockquote>
      </header>
      <main className="main">
        <article className="area tracking">
          <h2 className="headline tracking__headline">Keep tracking</h2>
          <div className="content">
            <div className="content__description">
              Watch flower parameters update in real time
            </div>
            <div className="content__body">
              <div className="demo-scales">
                <span className="demo-scales__tooltip">Soil moisture</span>
                <div className="demo-scales__scales-block">
                  <div className="demo-scales__scales-block--soil" />
                </div>
                <span className="demo-scales__tooltip">Air humidity</span>
                <div className="demo-scales__scales-block">
                  <div className="demo-scales__scales-block--airhumidity" />
                </div>
                <span className="demo-scales__tooltip">Air temperature</span>
                <div className="demo-scales__scales-block">
                  <div className="demo-scales__scales-block--temperature" />
                </div>
                <span className="demo-scales__tooltip">Ambient light</span>
                <div className="demo-scales__scales-block">
                  <div className="demo-scales__scales-block--light" />
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="area alerts">
          <h2 className="headline alert__headline">Alert System</h2>
          <div className="content">
            <div className="content__description">
              Receive alerts when your plant is thirsty or in bad condition
            </div>
            <div className="content__body">
              <div className="alerts">
                <i className="material-icons alerts__alert">warning</i>
                <img
                  className="alerts__thumb"
                  src={require("../../assets/plant-image.png")}
                  alt=""
                />
              </div>
            </div>
          </div>
        </article>
        <article className="area realtime">
          <h2 className="headline realtime__headline">Realtime updates</h2>
          <div className="content">
            <div className="content__description">
              Receive real time data and suggestions on flower conditions
            </div>
            <div className="content__body">
              <div className="realtime__numbers">
                <div className="realtime__numbers--light">Light</div>
                <div className="realtime__numbers--moisture">Humidity</div>
                <div className="realtime__numbers--temperature">Temp</div>
              </div>
            </div>
          </div>
        </article>
        <article className="area statistics">
          <h2 className="headline statistics__headline">Statics</h2>
          <div className="content">
            <div className="content__description">
              Explore the details and history of flower life
            </div>
            <div className="content__body">
              <img
                className="statistics__chart"
                src={require("../../assets/charts.png")}
                alt=""
              />
            </div>
          </div>
        </article>
      </main>
      <footer className="landing-footer">
        <Link className="landing-footer__trybtn" to="/home">
          Try now
        </Link>
        <div className="landing-footer__copyright">
          &copy; CYAN TEAM {new Date().getFullYear()}
        </div>
      </footer>
    </>
  );
};

export default landing;
