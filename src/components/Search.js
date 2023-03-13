import { useRef } from "react";
const Search = ({ searchedusername, issucessful }) => {
  const inputref = useRef();
  const searched = (e) => {
    e.preventDefault();
    const setkeyword = inputref.current.value;
    searchedusername(setkeyword);
  };
  return (
    <>
      <div className="main">
        <form onSubmit={searched} className="card">
          <div className="searchfiled">
            <div className="input">
              <input type="text" ref={inputref} placeholder="github username" />
            </div>
            <div className="search">
              <button className="btn">Search</button>
            </div>
          </div>
        </form>
      </div>
      {issucessful === false ? (
        // {username !== ""}

        <h2 className="not_found">invalid username😓</h2>
      ) : (
        false
      )}
    </>
  );
};
export default Search;
