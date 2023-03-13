import Details from "./components/Details";
import Footer from "./components/Footer";
import RepoList from "./components/RepoList";
import Search from "./components/Search";
import { github } from "./utils";
import { useEffect, useState } from "react";
import FollowerList from "./components/Followerlist";
import Followinglist from "./components/Followinglist";

function App() {
  const [detail, setdetail] = useState({});
  const [repoList, setRepoList] = useState([]);
  const [followerList, setfollowerList] = useState([]);
  const [following, setfollowinglist] = useState([]);
  const [username, setusername] = useState("");
  const [sucessful, issucessful] = useState(true);
  const [visiblecomponent, setvisiblecomponent] = useState();
  useEffect(() => {
    (async () => {
      setdetail({});
      issucessful(true);
      if (username === "") return;
      try {
        const response = await github.get(`/${username}`);
        setdetail(response.data);
      } catch (e) {
        // console.log('detail');
        issucessful(false);
      }
    })();
  }, [username]);
  useEffect(() => {
    // setRepoList([])
    // issucessful(true)
    (async () => {
      setRepoList([]);
      issucessful(true);
      if (username === "") return;
      try {
        const response = await github.get(`/${username}/repos`);
        setRepoList(response.data);
      } catch (e) {
        // console.log('repos');
        issucessful(false);
      }
    })();
  }, [username]);
  useEffect(() => {
    // issucessful(true)
    (async () => {
      setfollowerList([]);
      issucessful(true);
      if (username === "") return;
      try {
        const response = await github.get(`/${username}/followers`);
        setfollowerList(response.data);
      } catch (e) {
        // console.log('follower');
        issucessful(false);
      }
    })();
  }, [username]);
  useEffect(() => {
    (async () => {
      issucessful(true);
      if (username === "") return;
      try {
        const response = await github.get(`/${username}/following`);
        setfollowinglist(response.data);
      } catch (e) {
        issucessful(false);
      }

      // console.log(response.data);
    })();
  }, [username]);
  const searchedusername = (keyword) => {
    setusername(keyword);
  };
  const showmore = () => {
    if (visiblecomponent === 1) {
      if (followerList.length === detail.followers) {
        return false;
      } else return true;
    }
    if (visiblecomponent === 2) {
      if (repoList.length === detail.public_repos) {
        return false;
      } else return true;
    } else {
      if (following.length === detail.following) {
        return false;
      } else return true;
    }

    // return true;
  };
  const Loadmoredata = async () => {
    if (visiblecomponent === 1) {
      const currentpage = Math.ceil(followerList.length / 30);
      const nextpage = currentpage + 1;
      const response = await github.get(
        `/${username}/followers?page=${nextpage}`
      );
      const list = response.data;
      setfollowerList((currentlist) => {
        const newlist = [...currentlist, ...list];
        return newlist;
      });
    }
    if (visiblecomponent === 2) {
      const currentpage = Math.ceil(repoList.length / 30);
      const nextpage = currentpage + 1;
      const response = await github.get(`/${username}/repos?page=${nextpage}`);
      const list = response.data;
      setRepoList((currentlist) => {
        const newlist = [...currentlist, ...list];
        return newlist;
      });
    }
    if (visiblecomponent === 3) {
      const currentpage = Math.ceil(following.length / 30);
      const nextpage = currentpage + 1;
      const response = await github.get(
        `/${username}/following?page=${nextpage}`
      );
      const list = response.data;
      setfollowinglist((currentlist) => {
        const newlist = [...currentlist, ...list];
        return newlist;
      });
    }
  };
  return (
    <main>
      <Search searchedusername={searchedusername} issucessful={sucessful} />
      {detail.id === undefined ? (
        false
      ) : (
        <>
          <Details
            data={detail}
            setvisiblecomponent={setvisiblecomponent}
            visiblecomponent={visiblecomponent}
          />
          {visiblecomponent === 1 ? (
            <FollowerList data={followerList} />
          ) : visiblecomponent === 2 ? (
            <RepoList data={repoList} />
          ) : visiblecomponent === 3 ? (
            <Followinglist data={following} />
          ) : (
            false
          )}
          {showmore() === true ? (
            <div
              className="card"
              style={{
                width: "81%",

                // width: "81%",
                marginTop: "-1.5rem",
              }}
            >
              <button
                onClick={Loadmoredata}
                className="btn"
                style={{
                  width: "93%",
                  marginLeft: "3rem",
                }}
              >
                {" "}
                Load More
              </button>
            </div>
          ) : (
            false
          )}
        </>
      )}
      {/* {username==="" ? } */}
      <Footer />
    </main>
  );
}

export default App;
