// To parse this data:
//
//   import { Convert } from "./file";
//
//   const match = Convert.toMatch(json);

export interface FullMatch {
  [key: string]: Match;
}

export interface Match {
  date: string;
  field: string;
  sport: string;
  tickets: string;
  tournament: string;
  versus: string;
  path: string;
  home: boolean;
  icon: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toMatch(json: string): { [key: string]: Match } {
    return JSON.parse(json);
  }

  public static matchToJson(value: { [key: string]: Match }): string {
    return JSON.stringify(value);
  }
}
