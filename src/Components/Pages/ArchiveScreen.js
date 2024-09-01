import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Screen.css';

function ArchiveScreen() {
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(null);

  // Replace with your GitHub repository details
  const owner = 'unlikelycreator';
  const repo = 'moviematters';

  useEffect(() => {
    async function fetchCommits() {
      try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`);
        setCommits(response.data);
      } catch (error) {
        setError('Error fetching commits.');
        console.error('Error fetching commits:', error);
      }
    }

    fetchCommits();
  }, []);

  return (
    <div className='screen'>
      <h1 style={{color: "orange", marginBottom: '20px'}}>Latest Updates</h1>
      <div className='archive-screen'>
      {error && <p className='error'>{error}</p>}
      {commits.length > 0 ? (
        <ul className='commit-list'>
          {commits.map((commit) => (
            <li key={commit.sha} className='commit-item'>
              <h2>{commit.commit.committer.name}</h2>
              <p><strong>Date:</strong> {new Date(commit.commit.committer.date).toLocaleDateString()}</p>
              <p><strong>Message:</strong> {commit.commit.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No commits found.</p>
      )}
      </div>
    </div>
  );
}

export default ArchiveScreen;
