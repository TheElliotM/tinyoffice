import Office from "./components/office";
import React, { useState } from "react";
import data from "./data.json";
import Button from "./components/button";

import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridPreProcessEditCellProps,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { randInt } from "three/src/math/MathUtils";
import {
  PlusCircledIcon,
  TrashIcon,
  RocketIcon,
  DownloadIcon,
  UploadIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";

export default function App() {
  const [floors, setFloors] = useState(
    data.floors.map((d) => {
      return { ...d, id: randomIDGen(), optimalteams: "Press Generate" };
    })
  );
  const [teams, setTeams] = useState(
    data.teams.map((d) => {
      return { ...d, id: randomIDGen() };
    })
  );
  const [save, setSave] = useState({
    isSaving: false,
    key: "",
    errored: false,
  });
  const [key, setKey] = useState("");
  const [selected, setSelected] = useState({
    teamSelected: 0,
    floorSelected: 0,
  });

  const teamColumns: GridColDef[] = [
    {
      field: "name",
      editable: true,
      flex: 0.1,
      headerName: "Team Name",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const newValue = params.props.value;
        const filtered = teams.filter((o) => o.id === params.id);
        const hasError = !(
          params.hasChanged &&
          newValue.match(/^[A-Za-z0-9 ]+$/) &&
          filtered.length > 0
        );
        if (!hasError) {
          const updatedTeams = [...teams];
          updatedTeams[teams.indexOf(filtered[0])].name = newValue;
          setTeams(updatedTeams);
        }
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "strength",
      editable: true,
      headerName: "Strength (Size)",
      flex: 0.1,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const newValue = params.props.value;
        const filtered = teams.filter((o) => o.id === params.id);
        const hasError = !(
          params.hasChanged &&
          !isNaN(newValue) &&
          filtered.length > 0
        );
        if (!hasError) {
          const updatedTeams = [...teams];
          updatedTeams[teams.indexOf(filtered[0])].strength = Number(newValue);
          setTeams(updatedTeams);
        }
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "preferred",
      editable: true,
      headerName: "Preferred",
      flex: 0.3,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const newValue = params.props.value;
        const filtered = teams.filter((o) => o.id === params.id);
        const hasError = !(
          params.hasChanged &&
          newValue.match(/^[A-Za-z0-9, ]+$/) &&
          filtered.length > 0
        );
        if (!hasError) {
          const updatedTeams = [...teams];
          updatedTeams[teams.indexOf(filtered[0])].preferred = String(newValue)
            .split(",")
            .map((f) => f.trim());
          setTeams(updatedTeams);
        }
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "noway",
      editable: true,
      headerName: "No-Way",
      flex: 0.3,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const newValue = params.props.value;
        const filtered = teams.filter((o) => o.id === params.id);
        const hasError = !(
          params.hasChanged &&
          newValue.match(/^[A-Za-z0-9, ]+$/) &&
          filtered.length > 0
        );
        if (!hasError) {
          const updatedTeams = [...teams];
          updatedTeams[teams.indexOf(filtered[0])].noway = String(newValue)
            .split(",")
            .map((f) => f.trim());
          setTeams(updatedTeams);
        }
        return { ...params.props, error: hasError };
      },
    },
  ];

  const floorColumns: GridColDef[] = [
    {
      field: "name",
      editable: true,
      headerName: "Floor Name",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const newValue = params.props.value;
        const filtered = floors.filter((o) => o.id === params.id);
        const hasError = !(
          params.hasChanged &&
          newValue.match(/^[A-Za-z0-9, ]+$/) &&
          filtered.length > 0
        );
        if (!hasError) {
          const updatedFloors = [...floors];
          updatedFloors[floors.indexOf(filtered[0])].name = newValue;
          setFloors(updatedFloors);
        }
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "capacity",
      editable: true,
      headerName: "Capacity",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const newValue = params.props.value;
        const filtered = floors.filter((o) => o.id === params.id);
        const hasError = !(
          params.hasChanged &&
          !isNaN(newValue) &&
          filtered.length > 0
        );
        if (!hasError) {
          const updatedFloors = [...floors];
          updatedFloors[floors.indexOf(filtered[0])].capacity =
            Number(newValue);
          setFloors(updatedFloors);
        }
        return { ...params.props, error: hasError };
      },
    },
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
        <Button
          disabled={
            params.row.optimalteams &&
            params.row.optimalteams !== "None" &&
            params.row.optimalteams !== "Press Generate"
              ? false
              : true
          }
          className="inline-block"
        >
          <MagicWandIcon className="inline-block align-middle mb-[0.25em] mr-3" />
          <span>View</span>
        </Button>
      ),
    },
  ];

  function randomIDGen() {
    return randInt(0, 100000000);
  }

  function addTeamRow() {
    const teamsCopy = [...teams];
    teamsCopy.push({
      name: "New Team",
      strength: 0,
      preferred: [],
      noway: [],
      id: randomIDGen(),
    });
    setTeams(teamsCopy);
  }

  function addFloorRow() {
    const floorsCopy = [...floors];
    floorsCopy.push({
      name: "New Floor",
      capacity: 0,
      id: randomIDGen(),
      optimalteams: "Press Generate",
    });
    setFloors(floorsCopy);
  }

  function removeTeamRow() {
    const teamsCopy = [...teams];
    const filtered = teams.filter((o) => o.id === selected.teamSelected);
    if (filtered.length > 0) {
      teamsCopy.splice(teamsCopy.indexOf(filtered[0]), 1);
      setTeams(teamsCopy);
    }
  }

  function removeFloorRow() {
    const floorsCopy = [...floors];
    const filtered = floors.filter((o) => o.id === selected.floorSelected);
    if (filtered.length > 0) {
      floorsCopy.splice(floorsCopy.indexOf(filtered[0]), 1);
      setFloors(floorsCopy);
    }
  }

  async function saveData() {
    setSave({
      isSaving: true,
      errored: false,
      key: "",
    });

    //API CALL

    setSave({
      isSaving: false,
      errored: false,
      key: "523632",
    });
  }

  async function loadData(key) {
    if (isNaN(key)) return;

    //API CALL
    // EXAMPLE
    setFloors(
      floors.map((d) => {
        return { ...d, optimalteams: `${key}` };
      })
    );
    setTeams(
      teams.map((d) => {
        return { ...d };
      })
    );
  }

  async function generateData() {
    const output = [
      {
        floorID: floors[0].id,
        teamIDs: [9, 3],
      },
      {
        floorID: floors[2].id,
        teamIDs: [7, 3],
      },
    ];

    setFloors(
      floors.map((d, i) => {
        const optimalTeamChanges = output.filter((o) => o.floorID === d.id);
        return {
          ...d,
          id: i,
          optimalteams:
            optimalTeamChanges.length > 0
              ? optimalTeamChanges[0].teamIDs.join(",")
              : "None",
        };
      })
    );
  }

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
        <div className="grid min-h-[70vh] grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1">
          <div className="min-h-full h-[75vh] lg:h-[100vh] m-8 grid grid-rows-2 gap-10">
            <div className="bg-white bg-opacity-25 rounded-lg">
              <DataGrid
                disableColumnMenu
                components={{
                  Toolbar: GridToolBar,
                }}
                componentsProps={{
                  toolbar: {
                    onClickAdd: addTeamRow,
                    onClickRemove: removeTeamRow,
                    title: "Building Teams",
                  },
                }}
                sx={{ borderWidth: "5px" }}
                autoPageSize
                experimentalFeatures={{ newEditingApi: true }}
                rows={teams}
                columns={teamColumns}
                onRowClick={(e) => {
                  setSelected({ ...selected, teamSelected: e.row.id });
                }}
              />
            </div>
            <div className="bg-white bg-opacity-25 rounded-lg">
              <DataGrid
                disableColumnMenu
                components={{
                  Toolbar: GridToolBar,
                }}
                componentsProps={{
                  toolbar: {
                    onClickAdd: addFloorRow,
                    onClickRemove: removeFloorRow,
                    title: "Building Floors",
                  },
                }}
                sx={{
                  borderWidth: "5px",
                  "& .theme--noedit": {
                    backgroundColor: "rgb(105, 181, 97)",
                  },
                }}
                autoPageSize
                experimentalFeatures={{ newEditingApi: true }}
                rows={floors}
                columns={floorColumns}
                onRowClick={(e) => {
                  setSelected({ ...selected, floorSelected: e.row.id });
                }}
              />
            </div>
          </div>
          <div className="m-8 min-h-[75vh] grid grid-rows-3 mt-20 gap-10">
            <div className="bg-white border-white border-[5px] border-opacity-75 bg-opacity-25 rounded-lg row-span-1 grid grid-cols-2 grid-rows-1 text-white font-bold">
              <div className="col-span-1 m-8">
                <p className="mb-5">
                  Finalize Data and Generate Building Layout
                </p>
                <Button onClick={generateData} className="inline-block">
                  <RocketIcon className="inline-block align-middle mb-[0.25em] mr-1" />
                  <span>Generate</span>
                </Button>
              </div>
              <div className="col-span-1 m-5">
                <p className="my-2">Save Data for Future Re-use</p>
                <Button onClick={saveData} className="inline-block">
                  <UploadIcon className="inline-block align-middle mb-[0.25em] mr-1" />
                  <span>Save</span>
                </Button>
                <p
                  className={`italic text-base font-semibold ${
                    save.errored ? `text-red-800` : ``
                  }`}
                >
                  {save.isSaving
                    ? `Saving...`
                    : save.errored
                    ? `Error! Try Again.`
                    : save.key === ""
                    ? ``
                    : `Saved! Your key is: ${save.key}`}
                </p>
                <p className="my-2">Load Data</p>
                <div>
                  <input
                    placeholder="Your Key Here"
                    className="mb-4 text-black font-normal text-base rounded-lg pl-1 py-1 w-[1/2]"
                    onInput={(e) => setKey(e.currentTarget.value)}
                  ></input>
                </div>
                <Button onClick={() => loadData(key)} className="inline-block">
                  <DownloadIcon className="inline-block align-middle mb-[0.25em] mr-1" />
                  <span>Load</span>
                </Button>
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

function GridToolBar(props) {
  return (
    <GridToolbarContainer className="grid grid-rows-2 lg:grid-rows-3 gap-5 my-2">
      <div className="row-span-1 mx-1 ml-5">
        <p className="text-center font-bold text-xl text-white">
          {props.title}
        </p>
      </div>
      <div className="row-span-1 lg:row-span-2 grid grid-cols-2">
        <div className="ml-5">
          <Button onClick={props.onClickAdd}>
            <PlusCircledIcon className="inline-block align-middle mb-[0.25em] mr-1" />
            <span>Add Row</span>
          </Button>
        </div>
        <div className="">
          <Button className="mx-auto mr-5" onClick={props.onClickRemove}>
            <TrashIcon className="inline-block align-middle mb-[0.25em] mr-1" />
            <span>Remove Selected Row</span>
          </Button>
        </div>
      </div>
    </GridToolbarContainer>
  );
}
