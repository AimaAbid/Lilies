import React from "react";
import "../styles/LandingPage.css";
import Navbar from "../Components/Navbar";
import NoodlesImage from "../assets/noodles.png";
import Badges from "../assets/Badges.png";
import Burger from "../assets/burger.png";
import Meatballs from "../assets/meatballs.png";
import Shrimp from "../assets/shrimpnoodles.png";
import BadgesVertical from "../assets/BadgesVertical.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faYoutube,
	faInstagram,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function LandingPage() {
	return (
		<div className="container">
			<nav>
				<Navbar />
			</nav>
			<main>
				<section className="order-anytime">
					<div className="order-anytime-text">
						<div className="order-anytime-heading">
							Order <span className="yellow-500-text">food</span> anytime,
							anywhere
						</div>
						<div className="order-anytime-normal-text">
							Browse from our list of specials to place your order and have food
							delivered to you in no time. Affordable, tasty and fast!
						</div>

						<div className="badges">
							<img src={Badges} alt="badges" />
						</div>
					</div>

					<div className="order-anytime-image">
						<img src={NoodlesImage} alt="" />
					</div>
				</section>

				<section>
					<div className="special-meals-heading">Special Meals of the day!</div>
					<div className="special-meals-normal-text">
						Check our sepecials of the day and get discounts on all our meals
						and swift delivery to what ever location within Ilorin.
					</div>
					<div className="container-three-dishes">
						<div>
							<img src={Burger} alt="burger" className="food-image" />
							<p className="dishes-heading">Stir fry Pasta</p>
							<p className="dishes-text">
								Stir fry burger yada yada yada because of Sesan
							</p>
						</div>
						<div>
							<img src={Meatballs} alt="meatballs" className="food-image" />
							<p className="dishes-heading">Meat Balls</p>
							<p className="dishes-text">
								Stir fry meatballs yada yada yada because of Sesan
							</p>
						</div>
						<div>
							<img src={Shrimp} alt="shrimp" className="food-image" />
							<p className="dishes-heading">Stir fry Pasta</p>
							<p className="dishes-text">
								Stir fry pasta yada yada yada because of Sesan
							</p>
						</div>
					</div>
				</section>

				<section className="get-notified">
					<div>
						{" "}
						<div className="get-notified-heading">
							Get notified when we update!
						</div>
						<div className="get-notified-text">
							Get notified when we add new items to our specials menu, update
							our price list of have promos!
						</div>
					</div>

					<div className="get-notified-input-group">
						<input
							type="email"
							name=""
							id=""
							className="get-notified-input"
							placeholder="gregphillips@gmail.com"
						/>
						<button className="get-notified-btn">Get notified</button>
					</div>
				</section>
			</main>

			<footer>
				<div className="footer-container">
					{" "}
					<section className="footer-links">
						<div className="footer-col">
							<div className="footer-link-heading">Company</div>
							<div className="footer-link-text">About Us</div>
							<div className="footer-link-text">Career</div>
							<div className="footer-link-text">Contact Us</div>
						</div>
						<div className="footer-col">
							<div className="footer-link-heading">Support</div>
							<div className="footer-link-text"> Help Center</div>
							<div className="footer-link-text">Safety Center</div>
						</div>
						<div className="footer-col">
							<div className="footer-link-heading">Legal</div>
							<div className="footer-link-text">Cookies Policy</div>
							<div className="footer-link-text">Privacy Policy</div>
							<div className="footer-link-text">Terms of Service</div>
							<div className="footer-link-text">Dispute resolution</div>
						</div>
						<div className="footer-col">
							<div>
								<img src={BadgesVertical} alt="badges" />
							</div>
						</div>
					</section>
					<hr className="divider" />
					<section className="footer-contact">
						<div className="footer-text">
							© 2021 LILIES, All rights reserved
						</div>
						<div className="icon-footer-color">
							<div>
								<Link to="https://www.youtube.com/@iquasarsoftwaresolutions1002">
									{" "}
									<FontAwesomeIcon icon={faYoutube} />
								</Link>
							</div>
							<div>
								<Link to="https://www.instagram.com/iquasarsoftwaresolutions/?hl=en">
									<FontAwesomeIcon icon={faInstagram} />
								</Link>
							</div>
							<div>
								{" "}
								<Link to="https://x.com/i/flow/login?redirect_after_login=%2Fiquasarllc">
									{" "}
									<FontAwesomeIcon icon={faTwitter} />
								</Link>
							</div>
						</div>
					</section>
				</div>
			</footer>
		</div>
	);
}
