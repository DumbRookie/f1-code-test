import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface DriverStandings {
  position: string;
  drivers_name: string;
  constructor: string;
  points: string;
  wins: string;
}

export interface ConstructorStandings {
  position: string;
  nationality: string;
  constructor: string;
  points: string;
  wins: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  driverStandings: Array<DriverStandings> = [];
  constructorStandings: Array<ConstructorStandings> = [];

  constructor(private httpClient: HttpClient) {
  }

  getDriverStandingsData(): void {
    this.httpClient.get('http://ergast.com/api/f1/current/driverStandings.json', {}).subscribe((response: any) => {
      const standings = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      for (const standing of standings) {
        let row: DriverStandings;
        row = {position: '', drivers_name: '', constructor: '', points: '', wins: ''};
        row.position = standing.position;
        row.drivers_name = standing.Driver.givenName + ' ' + standing.Driver.familyName;
        row.constructor = standing.Constructors[0].name;
        row.points = standing.points;
        row.wins = standing.wins;
        this.driverStandings.push(row);
      }
    });
  }

  getConstructorStandingsData(): void {
    this.httpClient.get('http://ergast.com/api/f1/current/constructorStandings.json', {}).subscribe((response: any) => {
      const constStandings = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      for (const constStanding of constStandings){
        let constRow: ConstructorStandings;
        constRow = {position: '', nationality: '', constructor: '', points: '', wins: ''};
        constRow.constructor = constStanding.Constructor.name;
        constRow.position = constStanding.position;
        constRow.nationality = constStanding.Constructor.nationality;
        constRow.points = constStanding.points;
        constRow.wins = constStanding.wins;
        this.constructorStandings.push(constRow);
        console.log(this.constructorStandings);
      }
    });
  }

}
