const loading = "./assets/loader.svg";
import './Loading.scss'

const Loading = () => {
  return (
    <div className="load">
      <img src={loading} alt="Loading" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
