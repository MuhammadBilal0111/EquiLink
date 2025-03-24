import { ethers } from "ethers";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove multiple hyphens
}
// helper function to format the projects details
export const structuredProjects = (projects) =>
  projects.map((project) => ({
    id: Number(project[0]),
    owner: project[1]?.toLowerCase(),
    title: project[2],
    description: project[3],
    category: project[4],
    slug: project[5],
    cost: Number(project[6]) / 10 ** 18,
    raised: Number(project[7]) / 10 ** 18,
    timestamp: new Date(Number(project[8]) * 1000).getTime(),
    investorAddress: project[9]?.toLowerCase(),
    ownerName: project[10],
    investorName: project[11],
    equity: ethers.formatUnits(project[12], 18), // Convert back to decimal,
  }));

// helper function to format the Backers
export const structuredBackers = (backers) => {
  return backers
    ?.map((backer) => ({
      owner: backer[0]?.toLowerCase(),
      contribution: Number(backer[1]) / 10 ** 18,
      timestamp: toDate(Number(backer[2]) * 1000),
      refunded: backer[3],
    }))
    .reverse();
};

// helper function to format the statistics
export const structureStats = () => ({
  totalProjects: Number(stats[0]),
  totalBacking: Number(stats[1]),
  totalDonations: Number(stats[2]) / 10 ** 18,
});

// helper function format the date
const toDate = (timestamp) => {
  const date = new Date(timestamp);
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`; // date.getMonth() returns the month index (0-based, meaning January = 0).
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};
