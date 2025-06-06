// src/components/api/machine.js
import client from "./client";

export const fetchMachines = async () => {
  try {
    const response = await client.get("/machines");
    const machines = Array.isArray(response.data)
      ? response.data
      : response.data.machines || [];

    const formattedData = [];

    machines.forEach((machine) => {
      machine.testSites?.forEach((testSite) => {
        formattedData.push({
          id: machine._id,
          name: machine.name,
          testSite: testSite.testSiteNumber,
          section: testSite.section,
          station: testSite.station,
          kmFrom: testSite.kmFrom,
          kmTo: testSite.kmTo,
          division: testSite.division,
          dueDate: machine.nextGrindingDueDate || "N/A",
        });
      });
    });

    return formattedData;
  } catch (error) {
    console.error("Error fetching machines:", error);
    return [];
  }
};

export const addMachine = async (machineData) => {
  try {
    const response = await client.post("/machines", machineData);
    return response.data;
  } catch (error) {
    console.error("Error adding machine:", error);
    throw error;
  }
};

export const fetchMachineById = async (id) => {
  try {
    const response = await client.get(`/machines/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching machine with id ${id}:`, error);
    throw error;
  }
};
