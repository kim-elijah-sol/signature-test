import { useRef, useState } from "react";

const max = 3;

function App() {
  const $canvas = useRef<HTMLCanvasElement>(null);

  const $isDrawing = useRef<boolean>(false);

  const [percentage, setPercentage] = useState<number>(0);

  // 서명 함수
  const draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    checkPercentage();
  };

  // 마우스 다운 이벤트
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = $canvas.current?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      $canvas.current?.addEventListener("mousemove", handleMouseMove);
      $isDrawing.current = true;
    }
  };

  // 마우스 업 이벤트
  const handleMouseUp = () => {
    $canvas.current?.removeEventListener("mousemove", handleMouseMove);
    $isDrawing.current = false;
  };

  // 마우스 무브 이벤트
  const handleMouseMove = (e: MouseEvent) => {
    if (!$isDrawing.current) return;

    const ctx = $canvas.current?.getContext("2d");
    if (ctx) {
      draw(ctx, e.offsetX, e.offsetY);
    }
  };

  const checkPercentage = () => {
    const ctx = $canvas.current?.getContext("2d");

    if (ctx) {
      let count = 0;

      const imageData = ctx.getImageData(0, 0, 300, 200);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] !== 0) {
          count++;
        }
      }

      const percent = (count / (300 * 200)) * 100;
      setPercentage(Math.min(percent, max));
    }
  };

  const handleClear = () => {
    const ctx = $canvas.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 300, 200);
      setPercentage(0);
    }
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 300,
          height: 200,
        }}
      >
        <canvas
          ref={$canvas}
          width={300}
          height={200}
          style={{
            background: "#f1f2f3",
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        ></canvas>
        {percentage === 0 && (
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#aaa",
              userSelect: "none",
            }}
          >
            서명해주세요
          </span>
        )}
      </div>
      <div
        style={{
          width: 300,
          height: 30,
          background: "#ccc",
        }}
      >
        <div
          style={{
            width: (percentage / max) * 300,
            height: "100%",
            background: "#0064ff",
            transition: "width 0.21s",
          }}
        />
      </div>

      <div
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <button onClick={handleClear} disabled={percentage === 0}>
          지우기
        </button>
        <button
          onClick={() => alert("제출 완료")}
          disabled={percentage !== max}
        >
          제출
        </button>
      </div>
    </main>
  );
}

export default App;
