import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import './Developer.css';
import image from '../../images/yassinepic.jpeg';

const Developers = () => {
    return (
        <div className='developer-page'>
            <div className="developer__title">
                <h1>Developer</h1>
            </div>
            <div className="developers__page--container">
                <div>
                    <div className="developer__image--outerContainer">
                        <div className="developer__image--container">
                            <img
                                className="developer__image"
                                src={image}
                            />
                        </div>
                        <h2>Yassine Cherradi</h2>
                        <h5>Full-stack Web Developer</h5>
                        <div className="link__logo">
                            <div className="link__logo1">
                                <a
                                    href="https://www.linkedin.com/in/yassine-cherradi-035784101/"
                                    target="_blank"
                                >
                                    <LinkedInIcon style={{ color: 'white' }} />
                                </a>
                            </div>
                            <div className="link__logo2">
                                <a
                                    href="https://github.com/ycherradi/"
                                    target="_blank"
                                >
                                    <GitHubIcon style={{ color: 'white' }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Developers;
