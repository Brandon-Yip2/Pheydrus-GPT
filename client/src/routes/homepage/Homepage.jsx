import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { HERO_IMAGE, HERO_BG_IMAGE, ORBITAL_IMAGE, AVATAR_BOT, AVATAR_HUMAN_1, AVATAR_HUMAN_2, HERO_BG_COLOR } from "../../lib/config";
import { useState } from "react";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <div className="homepage">
      <img src={ORBITAL_IMAGE} alt="" className="orbital" />
      <div className="left">
        <h1>Pheydrus-GPT</h1>
        <h2>Supercharge your CMO workflow for Pheydrus</h2>
        <h3>
          As your virtual CMO, Pluto helps you quickly craft on-brand Instagram
          posts, captions, and campaign concepts—aligned to your voice and goals.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer" style={{ backgroundColor: HERO_BG_COLOR }}>
          <div className="bgContainer">
            <div className="bg" style={{ backgroundImage: `url(${HERO_BG_IMAGE})` }}></div>
          </div>
          <img src={HERO_IMAGE} alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? AVATAR_HUMAN_1
                  : typingStatus === "human2"
                  ? AVATAR_HUMAN_2
                  : AVATAR_BOT
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                "Human: What does The Star tarot card signify?",
                2000,
                () => { setTypingStatus("bot"); },
                "Bot: The Star symbolizes hope, renewal, and clear guidance ahead.",
                2200,
                () => { setTypingStatus("human2"); },
                "Human2: Pull a 3-card spread for guidance (past/present/future).",
                2200,
                () => { setTypingStatus("bot"); },
                "Bot: Past: The Tower — upheaval. Present: The Star — healing. Future: The Sun — success.",
                2600,
                () => { setTypingStatus("human1"); },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
