import "../styles/schools.css";

const schools = [

  {
    title: "School of Arts",

    icon: "🎨",
  },

  {
    title: "School of Law",

    icon: "⚖️",
  },

  {
    title: "School of Management",

    icon: "📊",
  },

  {
    title: "School of Sciences",

    icon: "🔬",
  },

  {
    title: "School of Computing",

    icon: "💻",
  },

  {
    title: "Chanakya Neeti",

    icon: "📖",
  },
];

export default function Schools() {

  return (
    <section
      className="schools-section"
      id="schools"
    >

      <div className="schools-left">

        <h2>Our Schools</h2>

        <p>
          Chanakya University brings
          together innovation,
          leadership, technology,
          culture and knowledge
          through world-class schools
          and student events.
        </p>

      </div>

      <div className="schools-grid">

        {schools.map((item, index) => (

          <div
            className="school-card"
            key={index}
          >

            <div className="school-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

          </div>
        ))}

      </div>

    </section>
  );
}

