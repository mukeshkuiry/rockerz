import { getRandomRecords } from "./getRandomRecords";
import { TableRow } from "../types/result";

export const executeSql = async (sql: string): Promise<TableRow[]> => {
  if (!sql.trim()) return [];

  try {
    const queryResult = await getRandomRecords();
    console.log(
      "Query executed successfully:",
      queryResult.length,
      "rows returned."
    );
    return queryResult;
  } catch (error) {
    console.error("Error executing SQL:", error);
    return [];
  }
};
