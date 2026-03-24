import toast from "react-hot-toast";
import type { Ride } from "./types";

const API_ENDPOINT: string = import.meta.env.VITE_API_ENDPOINT;

export async function getAllRides(): Promise<Ride[]> {
  const response = await fetch(`${API_ENDPOINT}/rides`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    toast.error("There was an error fetching rides.");
    throw new Error("There was an error fetching rides.");
  }
  return (await response.json()) as Ride[];
}

export async function getOneRide(id: number): Promise<Ride> {
  const response = await fetch(`${API_ENDPOINT}/rides/get/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    toast.error("There was an error fetching ride.");
    throw new Error("There was an error fetching ride.");
  }
  return (await response.json()) as Ride;
}

export async function addRide(ride: Ride): Promise<boolean> {
  const response = await fetch(`${API_ENDPOINT}/rides/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ride),
  });
  if (!response.ok) {
    toast.error("There was an error adding the ride.");
    return false;
  } else {
    toast.success("Successfully added ride.");
    return true;
  }
}

export async function updateRide(ride: Ride): Promise<boolean> {
  const response = await fetch(`${API_ENDPOINT}/rides/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ride),
  });
  if (!response.ok) {
    toast.error("There was an error updating the ride.");
    return false;
  } else {
    toast.success("Successfully updated ride.");
    return true;
  }
}

export async function deleteRide(id: number): Promise<boolean> {
  const response = await fetch(`${API_ENDPOINT}/rides/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    toast.error("There was an error deleting the ride.");
    return false;
  } else {
    toast.success("Successfully deleted the ride.");
    return true;
  }
}
