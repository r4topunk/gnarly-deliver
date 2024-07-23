import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  return new ImageResponse(<VoteResult />, {
    width: 1200,
    height: 630,
  });
}

const VoteResult = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "30px",
        }}
      >
        <h1 style={{ margin: 0 }}>Establish the Pod Media</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <div style={{ display: "flex", color: "#666" }}>Proposed by:</div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#007bff",
              textDecoration: "none",
            }}
          >
            0xeed943aa972dd394146e6f77b9434df07f36a282
          </a>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold" }}>For</span>
            <div
              style={{
                height: "10px",
                borderRadius: "5px",
                background: "#4caf50",
                flex: 1,
                margin: "0 8px",
              }}
            ></div>
            <span style={{}}>830</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Against</span>
            <div
              style={{
                height: "10px",
                borderRadius: "5px",
                flex: 1,
                margin: "0 8px",
                background: "#DB4C40",
              }}
            ></div>
            <span style={{}}>0</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Abstain</span>
            <div
              style={{
                height: "10px",
                borderRadius: "5px",
                flex: 1,
                background: "#ffeb3b",
                width: "10%",
                margin: "0 8px",
              }}
            ></div>
            <span style={{}}>11</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Threshold</span>
            <span style={{ display: "block", fontWeight: "bold" }}>
              569 votes
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Ends</span>
            <span style={{ fontWeight: "bold" }}>Dec 31, 1969 - 9:00 PM</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Snapshot taken at block</span>
            <span style={{ fontWeight: "bold" }}>17321587</span>
          </div>
        </div>
      </div>
    </div>
  );
};
