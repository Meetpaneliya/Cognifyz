import React, { useEffect, useState } from 'react';

const CLIENT_ID = 'Ov23lipqOn9CfpaozZfZ';

const App = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    if (codeParam && !localStorage.getItem("accessToken")) {
      async function getAccessToken() {
        try {
          const response = await fetch(`http://localhost:4000/getAccessToken?code=${codeParam}`, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log(data);
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            window.location.href = '/'; // Redirect to the home page after successful login
          } else {
            console.error("No access token found in response:", data);
          }
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    try {
      const response = await fetch("http://localhost:4000/getUserData", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>
    <header>
      {localStorage.getItem("accessToken") ? (
        <div>
          <h1 style={{ marginBottom: "20px" }}>We have the access token</h1>
          <button
            style={{ marginBottom: "10px", padding: "8px 16px", fontSize: "16px" }}
            onClick={() => { localStorage.removeItem("accessToken"); window.location.href = '/'; }}
          >
            Log out
          </button>
          <h3 style={{ marginTop: "20px" }}>Get User Data from GitHub API</h3>
          <button
            style={{ marginBottom: "20px", padding: "8px 16px", fontSize: "16px" }}
            onClick={getUserData}
          >
            Get Data
          </button>
          {Object.keys(userData).length !== 0 ? (
            <div>
              <h4>Hey there {userData.login}</h4>
              <img
                src={userData.avatar_url}
                alt=''
                style={{ width: "200px", height: "200px", borderRadius: "50%", marginBottom: "10px" }}
              />
              <a
                href={userData.html_url}
                style={{ color: "white", textDecoration: "none", display: "block", marginBottom: "20px" }}
              >
                Link to the GitHub profile
              </a>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <h3>User is not logged in</h3>
          <button
            style={{ marginBottom: "20px", padding: "8px 16px", fontSize: "16px" }}
            onClick={() => window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`}
          >
            Login With GitHub
          </button>
        </div>
      )}
    </header>
  </div>
  
  );
};

export default App;
