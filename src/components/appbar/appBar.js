import logo from '../../assets/img/pt-white.png';
import auth from '../../data/auth';

const AppBar = ({backAction}) => {
  return (
    <div className="flex center-vertical space-between app-bar padding-top-bottom-xs padding-left-right-sm">
      {backAction && <div className="text size-lg color-background pointer" onClick={backAction}>&lt; Back</div>}
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