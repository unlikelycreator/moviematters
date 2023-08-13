import React from "react";

import facebook from "../Pages/media/facebook.png";
import Instagram from "../Pages/media/instagram.png";
import Twitter from "../Pages/media/twitter.png";
import Website from "../Pages/media/internet.png";
import "./css/Screen.css";
import "./css/Contact.css";
function ContactScreen() {
  return (
    <div className="screen">
      <div className="contact-container">
        <div className="contact-description">
          <h2>Welcome to MovieOn</h2>
          <p>
            MovieOn is a platform for exploring movie details, ratings, and
            reviews. It's built as a hobby project and is open source under the
            MIT License. You can find the source code on GitHub.
          </p>
          <p>Connect with us on social media:</p>
          <div className="social-icons">
            <button className="social-icon">
              <img src={facebook} alt="facebook logo" />
            </button>
            <button className="social-icon">
              <img src={Instagram} alt="Instagram logo" />
            </button>
            <button className="social-icon">
              <img src={Twitter} alt="Twitter logo" />
            </button>
            <button className="social-icon">
              <img src={Website} alt="Website logo" />
            </button>
          </div>
        </div>
        <div className="contact-form">
          <h2>Contact Us</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input
              className="contact-input"
              type="text"
              id="name"
              name="name"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              className="contact-input"
              type="email"
              id="email"
              name="email"
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              className="contact-input"
              id="message"
              name="message"
              rows="4"
              required
            ></textarea>

            <button className="contact-button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactScreen;
