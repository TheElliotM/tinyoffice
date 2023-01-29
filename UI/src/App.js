import Office from "./components/office"

function App() {
  let data = {}

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      <header className="min-h-[50px] h-[10vh] rounded-b-lg bg-opacity-30 bg-blue-800 mx-[5vw] flex">
        <div className="mx-auto my-auto">
          <p className="text-white font-bold text-xl">
            Building Floor Planner for Teams
          </p>
        </div>
      </header>
      <div className="mb-[8vh]">
        <div className="grid min-h-[70vh] grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 gap-[1vw]">
          <div className="min-h-[50vh] max-w-full"><Office data={data}></Office></div>
          <div>
            <div className="bg-white bg-opacity-25 rounded-lg h-full m-8">
              <p></p>
            </div>
          </div>
        </div>

      </div>
      <footer className="mt-[15vh]">
        <div className="text-white text-center mx-[10vw] rounded-t-lg bg-opacity-30 bg-blue-800 min-h-[70px] h-[10vh]">
          <div className="align-middle pt-2">
            <p className="text-sm sm:text-md md:text-lg font-semibold">Made by Salina Teng, Summer Wong, Andrew Zheng, Elliot Michlin</p>
            <p className="italic text-sm sm:text-md sm:text-lg font-bold">A TAMUHack 2023 Project</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
