const DescriptionAbout = (props) => {
  return (
    <div className="container-fluid App" style={{ fontFamily:"'Poppins', sans-serif"}}>
      <h1 className="logo-app">{props.title}</h1>
      <p className="description text-justify">{props.text}</p>
    </div>
  );
};

export default DescriptionAbout;
