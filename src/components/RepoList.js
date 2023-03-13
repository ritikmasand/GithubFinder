const RepoList = ({ data }) => {
  return (
    <div className="card following_list">
      <h2>Repo List</h2>
      <ol>
        {data.length &&
          data.map((e, idx) => {
            return (
              <li key={idx}>
                <a href={e.html_url} target="_blank" rel="noreferrer">
                  {e.name}
                </a>
              </li>
            );
          })}
      </ol>
    </div>
  );
};
export default RepoList;
