import { error } from "console";
import { getRandomRecords } from "./getRandomRecords";
import { TableRow } from "../types/result";

export const executeSql = async (sql: string): Promise<TableRow[]> => {
  if (sql.trim() === "") {
    return [];
  }
  try {
    const queryResult = await getRandomRecords();
    console.log("Query Result:", queryResult);
    return queryResult;
  } catch (err) {
    console.log(err);
    return [];
  }
};
