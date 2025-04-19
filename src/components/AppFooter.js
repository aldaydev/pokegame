import github_logo from '../assets/img/external/GitHub_Logo.png';
import linkedIn_logo from '../assets/img/external/linkedIn_logo.png';
import './AppFooter.css';

const AppFooter = ()=>{
    return(
        <footer className="App-footer">
            <p className="footer-text">RAFAEL ALDAY &copy; 2024</p>
            <a href='https://alday.dev' target='_blank' rel='noreferrer' className='footer__link'>
                    <span className='footer-logo--aldaydev'>
                        {"{AldayDev}"}
                    </span>
                </a>
            <div className="footer-links">
                <a href='https://github.com/aldaydev' target='_blank' rel='noreferrer' className='footer__link'>
                    <img src={github_logo} alt='GitHub logo' className='footer-logo--github'/>
                </a>
                <a href='https://linkedin.com/in/rafaelalday' target='_blank' rel='noreferrer' className='footer__link'>
                    <img src={linkedIn_logo} alt='LinkedIn Logo' className='footer-logo--linkedIn'/>
                </a>
                
            </div>
        </footer>
    )
}

export default AppFooter;