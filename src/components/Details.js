import moment from 'moment'
const Details = ({ data, setvisiblecomponent, visiblecomponent }) => {
  return (
    <div className="card">
      <img src={data.avatar_url} alt="Profile" className="section-left" />
      <div className="section-right">
        <h3>{data.login}</h3>
        <h3>{data.name}</h3>
        <p>Member since : {moment(data.created_at).fromNow()}</p>
      </div>
      <div className="btnalign">
        <button
          className={`btn ${visiblecomponent === 2 ? "active" : ""}`}
          onClick={() => {
            setvisiblecomponent(2);
          }}
        >
          {data.public_repos}
          <span>Repos </span>
        </button>
        <button
          className={`btn ${visiblecomponent === 1 ? "active" : ""}`}
          onClick={() => {
            setvisiblecomponent(1);
          }}
        >
          {data.followers}
          <span>Followers</span>
        </button>
        <button
          className={`btn ${visiblecomponent === 3 ? "active" : ""}`}
          onClick={() => {
            setvisiblecomponent(3);
          }}
        >
          {data.following}
          <span>Following</span>
        </button>
      </div>
    </div>
  );
};
export default Details;
