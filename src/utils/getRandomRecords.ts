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

const getRandomRows = (rows: TableRow[], size: number): TableRow[] => {
  if (size >= rows.length) return rows;
  return rows.sort(() => Math.random() - 0.5).slice(0, size);
};

export const getRandomRecords = async (): Promise<TableRow[]> => {
  try {
    const size = Math.floor(Math.random() * 50) + 5;
    const filePaths = [
      "/data/customers.csv",
      "/data/employees.csv",
      "/data/orders.csv",
    ];
    const randomFilePath =
      filePaths[Math.floor(Math.random() * filePaths.length)];
    const csvRows = await fetchCSV(randomFilePath);

    const millionRows = Array.from({ length: 1000000 }, (_, i) => ({
      id: i + 1,
      name: `Record ${i + 1}`,
      age: Math.floor(Math.random() * 100) + 1,
      salary: Math.floor(Math.random() * 100000) + 50000,
      description: `Description for record ${i + 1}`,
      something: Math.random() > 0.5 ? "Yes" : "No",
      moreSomething: Math.random() > 0.5 ? "Yes" : "No",
      onceMoreSomething: Math.random() > 0.5 ? "Yes" : "No",
    }));

    return Math.random() < 0.5 ? getRandomRows(csvRows, size) : millionRows;
  } catch (err) {
    console.error("Error generating records:", err);
    return [];
  }
};
