import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";


const Footer = () => {
  return (
    <footer className="login_footer">
      <div className="login_footer_wrap">
        <Link>English (UK)</Link>
        <Link>বাংলা</Link>
        <Link>অসমীয়া</Link>
        <Link>हिन्दी</Link>
        <Link>Bahasa Indonesia</Link>
        <Link>नेपाली</Link>
        <Link>العربية</Link>
        <Link>中文(简体)</Link>
        <Link>Bahasa Melayu</Link>
        <Link>Português (Brasil)</Link>
        <Link>Español</Link>
        <Link className="footer_square">
          <GoPlus className="square" />
        </Link>
      </div>
      <div className="footer_splitter"></div>
      <div className="login_footer_wrap">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log in</Link>
        <Link to="/messenger">Messenger</Link>
        <Link to="/facebook-lite">Facebook Lite</Link>
        <Link to="/video">Video</Link>
        <Link to="/places">Places</Link>
        <Link to="/games">Games</Link>
        <Link to="/marketplace">Marketplace</Link>
        <Link to="/meta-pay">Meta Pay</Link>
        <Link to="/meta-store">Meta Store</Link>
        <Link to="/meta-quest">Meta Quest</Link>
        <Link to="/imagine-with-meta-ai">Imagine with Meta AI</Link>
        <Link to="/instagram">Instagram</Link>
        <Link to="/threads">Threads</Link>
        <Link to="/fundraisers">Fundraisers</Link>
        <Link to="/services">Services</Link>
        <Link to="/voting-information-centre">Voting Information Centre</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/privacy-centre">Privacy Centre</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/about">About</Link>
        <Link to="/create-ad">Create ad</Link>
        <Link to="/create-page">Create Page</Link>
        <Link to="/developers">Developers</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/cookies">Cookies</Link>
        <Link to="/ad-choices">AdChoices</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/help">Help</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/uploading-and-non-users">Uploading and non-users</Link>
        <Link to="/settings">Settings</Link>
      </div>
      <div className="login_footer_wrap">
        <Link style={{ fontSize: "12px", marginTop: "10px" }}>Meta © 2024</Link>
      </div>
    </footer>
  );
};

export default Footer;
