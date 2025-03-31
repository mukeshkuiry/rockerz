import Papa from "papaparse";
import { TableRow } from "../types/result";

const fetchCSV = async (filePath: string): Promise<TableRow[]> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to fetch ${filePath}`);
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (result) => resolve(result.data as TableRow[]),
        error: reject,
      });
    });
  } catch (err) {
    console.error("Error fetching CSV:", err);
    return [];
  }
};

const getRandomRows = (rows: TableRow[], size: number): TableRow[] =>
  size >= rows.length
    ? rows
    : [...rows].sort(() => 0.5 - Math.random()).slice(0, size);

const generateMockData = (): TableRow[] =>
  Array.from({ length: 1000000 }, (_, i) => ({
    id: i + 1,
    name: `Record ${i + 1}`,
    age: Math.floor(Math.random() * 100) + 1,
    salary: Math.floor(Math.random() * 100000) + 50000,
    description: `Description for record ${i + 1}`,
    something: Math.random() > 0.5 ? "Yes" : "No",
    moreSomething: Math.random() > 0.5 ? "Yes" : "No",
    onceMoreSomething: Math.random() > 0.5 ? "Yes" : "No",
  }));

export const getRandomRecords = async (): Promise<TableRow[]> => {
  try {
    const size = Math.floor(Math.random() * 50) + 5;
    const filePaths = [
      "/data/customers.csv",
      "/data/employees.csv",
      "/data/orders.csv",
    ];
    const csvRows = await fetchCSV(
      filePaths[Math.floor(Math.random() * filePaths.length)]
    );

    return Math.random() < 0.5
      ? getRandomRows(csvRows, size)
      : generateMockData();
  } catch (err) {
    console.error("Error generating records:", err);
    return [];
  }
};
