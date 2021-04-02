import React from 'react';
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='page-width'>
          <div className='footer__section-div'>
            <div className='footer__section'>
              <ul>
                <li className='footer__link'>
                  <a href='https://github.com/ycherradi'>Author's Github</a>
                </li>
                <li className='footer__link'>
                  <a href='https://www.linkedin.com/in/yassine-cherradi-035784101/'>
                    Author's LinkedIn
                  </a>
                </li>
                <li className='footer__link'>
                  <a href='https://github.com/ycherradi/remorph-project'>
                    Project Github
                  </a>
                </li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
};
export default Footer;