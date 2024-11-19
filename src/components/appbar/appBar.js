import logo from '../../assets/img/pt-white.png';
import auth from '../../data/auth';

const AppBar = () => {
  return (
    <div className="flex center-vertical space-between app-bar padding-top-bottom-xs padding-left-right-sm">
      <img width="36px" src={logo} alt="logo" />
      <div className="appBarUserCircle flex center circle
      ">
        <div className="text size-xl">
          {auth.getUser() && auth.getUser().name.split(' ')[0][0]}
        </div>
      </div>
    </div>
  );
}

export default AppBar;