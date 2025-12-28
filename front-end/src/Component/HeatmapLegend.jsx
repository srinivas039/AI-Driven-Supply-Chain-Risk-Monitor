function HeatmapLegend() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        background: "white",
        padding: "10px 14px",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        fontSize: "13px",
        zIndex: 1000
      }}
    >
      <strong>Risk Level</strong>
      <div style={{ marginTop: "6px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{
            width: "12px",
            height: "12px",
            background: "green",
            display: "inline-block",
            marginRight: "6px"
          }} />
          Low
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{
            width: "12px",
            height: "12px",
            background: "orange",
            display: "inline-block",
            marginRight: "6px"
          }} />
          Medium
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{
            width: "12px",
            height: "12px",
            background: "red",
            display: "inline-block",
            marginRight: "6px"
          }} />
          High
        </div>
      </div>
    </div>
  );
}

export default HeatmapLegend;