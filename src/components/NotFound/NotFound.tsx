import notFound from '../../assets/not-found.webp';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <img className="not-found__image" src={notFound} alt="not found" />
      <h1 className="not-found__title">404</h1>
    </div>
  );
};

export default NotFound;
