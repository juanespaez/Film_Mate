const Category = ({ category, click }) => {
  return (
    <div
      className="mt-3 col-12 col-md-6 col-lg-3"
      style={{
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        display: "flex",
        height: "10rem",
        justifyContent: "center",
        padding: 10,
        width: "10rem",
        cursor: "pointer",
      }}
      onClick={() => click(category)}
    >
      {category.name}
    </div>
  );
};

export default Category;
