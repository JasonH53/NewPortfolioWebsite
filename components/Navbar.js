const Navbar = ({ activeTab, setActiveTab }) => {
    return (
      <nav>
        <ul>
          <li className={`glow-on-hover ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</li>
          <li className={`glow-on-hover ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</li>
          <li className={`glow-on-hover ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>Notes</li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;