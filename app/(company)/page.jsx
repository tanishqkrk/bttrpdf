export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8 pt-16 select-none">
      <div>
        <h2 className="text-center text-8xl font-semibold text-font select-none">
          Build beautiful PDFs,
          <span className="flex justify-center text-center gap-6">
            <p className="text-primary">blazingly</p>
            <p>fast.</p>
          </span>
        </h2>
      </div>
      <div className="flex justify-center w-full">
        <h6 className="text-center text-xl w-1/4">
          Generate PDFs by clicking and editing your data, no conversion, no
          jitter.
        </h6>
      </div>
      <div>
        <button className="cta">Get Started</button>
      </div>
    </div>
  );
}
