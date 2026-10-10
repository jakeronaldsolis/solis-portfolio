const skillCategories = [
  { name: 'Frontend', skills: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'] },
  { name: 'Backend', skills: ['Python', 'C++', 'Django', 'PHP'] },
  { name: 'Database', skills: ['MySQL', 'PostgreSQL'] },
  {
    name: 'IT Support & Hardware',
    skills: ['Hardware Troubleshooting', 'Software Installation', 'System Setup', 'Network Configuration']
  },
  { name: 'Operating Systems', skills: ['Windows', 'Linux', 'macOS', 'Virtual Machines'] },
  {
    name: 'Security & Networking',
    skills: ['Cybersecurity Basics', 'Firewall Configuration', 'VPN Setup', 'Data Backup']
  }
]

const Skills = () => (
  <section id="skills" className="section section--alt">
    <div className="container">
      <h2>Skills</h2>
      <div className="skills">
        {skillCategories.map((category) => (
          <div key={category.name} className="card">
            <h3>{category.name}</h3>
            <div className="tags">
              {category.skills.map((skill) => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Skills
