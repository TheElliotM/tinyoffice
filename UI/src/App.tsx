import Office from "./components/office";
import React, { useState } from "react";
import data from "./data.json";
import Button from "./components/button";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridPreProcessEditCellProps,
  useGridApiRef,
} from "@mui/x-data-grid";

function App() {
  const [floors, setFloors] = useState<
    Array<{ name: string; capacity: number }>
  >(data.floors);
  const [teams, setTeams] = useState<
    Array<{
      name: string;
      strength: number;
      preferred: Array<string>;
      noway: Array<string>;
    }>
  >(data.teams);
  const [results, setResults] = useState([]);

  const apiRef = useGridApiRef();

  let floorsRows: GridRowsProp = [];
  let teamRows: GridRowsProp = [];

  const floorRowsGenerationArray: object[] = [];
  for (let id in floors) {
    const floor = floors[id];
    floorRowsGenerationArray.push({
      ...floor,
      optimalteams: "Press Generate",
      id: id,
    });
  }
  floorsRows = floorRowsGenerationArray;

  const teamRowsGenerationArray: object[] = [];
  for (let id in teams) {
    const team = teams[id];
    teamRowsGenerationArray.push({
      ...team,
      id: id,
    });
  }
  teamRows = teamRowsGenerationArray;

  const teamColumns: GridColDef[] = [
    {
      field: "name",
      editable: true,
      headerName: "Team Name",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        let hasError = false;
        if (params.hasChanged) {
          const newValue = params.props.value;
          if (newValue.match("^[A-Za-z0-9]+$")) {
            const newTeams = teams;
            newTeams[params.id].name = newValue;
            setTeams(newTeams);
            apiRef.current.updateRows([{ id: params.id, name: newValue }]);
          } else hasError = true;
        }
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "strength",
      editable: true,
      headerName: "Strength (Size)",
      renderCell: (params: GridRenderCellParams<String>) => (
        <strong>{params.value}</strong>
      ),
    },
    { field: "preferred", editable: true, headerName: "Preferred" },
    { field: "noway", editable: true, headerName: "No-Way" },
  ];

  const floorColumns: GridColDef[] = [
    { field: "name", editable: true, headerName: "Floor Name" },
    { field: "capacity", editable: true, headerName: "Capacity" },
    {
      field: "optimalteams",
      editable: false,
      headerName: "Optimal Teams",
      width: 150,
      cellClassName: "theme--noedit",
      headerClassName: "theme--noedit",
    },
    {
      field: "view",
      editable: false,
      headerName: "Visualize",
      renderCell: (params: GridRenderCellParams<String>) => (
        <Button disabled>View</Button>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      <header className="min-h-[50px] h-[10vh] rounded-b-lg bg-opacity-30 bg-blue-800 mx-[5vw] flex">
        <div className="mx-auto my-auto">
          <p className="text-white font-bold text-xl md:text-2xl lg:text-3xl">
            Building Floor Planner for Teams
          </p>
        </div>
      </header>
      <div className="mb-[8vh]">
        <div className="grid min-h-[70vh] grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 gap-[1vw]">
          <div className="min-h-full h-[75vh] lg:h-[100vh] m-8 grid grid-rows-2 gap-10">
            <div className="bg-white bg-opacity-25 rounded-lg">
              <DataGrid
                sx={{ borderWidth: "5px" }}
                autoPageSize
                experimentalFeatures={{ newEditingApi: true }}
                rows={teamRows}
                columns={teamColumns}
              />
            </div>
            <div className="bg-white bg-opacity-25 rounded-lg">
              <DataGrid
                sx={{
                  borderWidth: "5px",
                  "& .theme--noedit": {
                    backgroundColor: "rgb(105, 181, 97)",
                  },
                }}
                autoPageSize
                experimentalFeatures={{ newEditingApi: true }}
                rows={floorsRows}
                columns={floorColumns}
              />
            </div>
          </div>
          <div className="m-8 min-h-[75vh] grid grid-rows-3 mt-20 gap-10">
            <div className="bg-white border-white border-[5px] border-opacity-75 bg-opacity-25 rounded-lg row-span-1 grid grid-cols-2 grid-rows-1 text-white font-bold">
              <div className="col-span-1 m-8">
                <p className="mb-5">
                  Finalize Data and Generate Building Layout
                </p>
                <Button>Generate</Button>
              </div>
              <div className="col-span-1 m-5">
                <p className="my-2">Save Data for Future Re-use</p>
                <Button>Save</Button>
                <p className="my-2">Load Data</p>
                <Button>Load</Button>
              </div>
            </div>
            <div className="border-white border-[5px] border-opacity-75 bg-white bg-opacity-25 rounded-lg row-span-2">
              <div className="absolute z-50">
                <p className="m-3 text-xl text-white font-bold">
                  Floor Visualizer
                </p>
              </div>
              <Office></Office>
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-[15vh]">
        <div className="text-white text-center mx-[10vw] rounded-t-lg bg-opacity-30 bg-blue-800 min-h-[70px] h-[10vh]">
          <div className="align-middle pt-2">
            <p className="text-sm sm:text-md md:text-lg font-semibold">
              Made by Salina Teng, Summer Wong, Andrew Zheng, Elliot Michlin
            </p>
            <p className="italic text-sm sm:text-md sm:text-lg font-bold">
              A TAMUHack 2023 Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
