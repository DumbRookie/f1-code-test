import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, ReplaySubject, Subject} from 'rxjs';

export interface DriverStandings {
  position: string;
  drivers_name: string;
  constructor: string;
  points: string;
  wins: string;
  driverId: string;
}

export interface ConstructorStandings {
  position: string;
  nationality: string;
  constructor: string;
  points: string;
  wins: string;
  constructorId: string;
}

export interface Driver {
  races: any[];
  name: string;
  birth: string;
  nationality: string;
  permanentNo: string;
  wiki: string;
  driverCode: string;
}

export interface Constructor {
  races: any[];
  name: string;
  url: string;
  nationality: string;

}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  driverStandings: Array<DriverStandings> = [];
  constructorStandings: Array<ConstructorStandings> = [];
  driverDataSource: MatTableDataSource<DriverStandings>;
  constructorDataSource: MatTableDataSource<ConstructorStandings>;
  private initialized = new ReplaySubject<boolean>(1);
  currentDriver: Driver =
    {driverCode: '', birth: '', name: '', nationality: '', permanentNo: '', wiki: '', races: []};

  currentConstructor: Constructor = {name: '', nationality: '', url: '', races: []};

  constructor(private httpClient: HttpClient) {
  }

  getDriverStandingsData(): void {
    this.httpClient.get('http://ergast.com/api/f1/current/driverStandings.json', {}).subscribe((response: any) => {
      const standings = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;

      for (const standing of standings) {
        let row: DriverStandings;
        row = {position: '', drivers_name: '', constructor: '', points: '', wins: '', driverId: ''};
        row.position = standing.position;
        row.drivers_name = standing.Driver.givenName + ' ' + standing.Driver.familyName;
        row.constructor = standing.Constructors[0].name;
        row.points = standing.points;
        row.wins = standing.wins;
        row.driverId = standing.Driver.driverId;
        this.driverStandings.push(row);
      }
      this.driverDataSource = new MatTableDataSource(this.driverStandings);
      this.initialized.next(true);

    });
  }

  getConstructorStandingsData(): void {
    this.httpClient.get('http://ergast.com/api/f1/current/constructorStandings.json', {}).subscribe((response: any) => {
      const constStandings = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      for (const constStanding of constStandings) {
        let constRow: ConstructorStandings;
        constRow = {position: '', nationality: '', constructor: '', points: '', wins: '', constructorId: ''};
        constRow.constructor = constStanding.Constructor.name;
        constRow.position = constStanding.position;
        constRow.nationality = constStanding.Constructor.nationality;
        constRow.points = constStanding.points;
        constRow.wins = constStanding.wins;
        constRow.constructorId = constStanding.Constructor.constructorId;
        this.constructorStandings.push(constRow);
      }
      this.constructorDataSource = new MatTableDataSource(this.constructorStandings);

    });
  }

  get initializedState(): Observable<boolean> {
    return this.initialized.asObservable();
  }

  getDriverInfo(id: string): void {
    this.httpClient.get(`http://ergast.com/api/f1/current/drivers/${id}/results.json`, {}).subscribe((info: any) => {
      const races: any = info.MRData.RaceTable.Races;
      const noRaces = races.length - 1;
      const driverInfo = races[noRaces].Results[0].Driver;
      this.currentDriver.birth = driverInfo.dateOfBirth;
      this.currentDriver.wiki = driverInfo.url;
      this.currentDriver.permanentNo = driverInfo.permanentNumber;
      this.currentDriver.nationality = driverInfo.nationality;
      this.currentDriver.name = driverInfo.givenName + ' ' + driverInfo.familyName;
      this.currentDriver.driverCode = driverInfo.code;
      this.currentDriver.races = [];
      for (const race of races) {
        const round: any = {};
        round.number = race.round;
        round.place = race.Circuit.circuitName;
        round.position = race.Results[0].position;
        round.status = race.Results[0].status;
        round.points = race.Results[0].points;
        round.laps = race.Results[0].laps;
        this.currentDriver.races.push(round);
      }
    });
  }

  getConstructorInfo(id: string): void {
    this.httpClient.get(`http://ergast.com/api/f1/current/constructors/${id}/results.json`, {}).subscribe((info: any) => {
      const races: any = info.MRData.RaceTable.Races;
      const noRaces = races.length - 1;
      const constructorInfo = races[noRaces].Results[0].Constructor;
      this.currentConstructor.name = constructorInfo.name;
      this.currentConstructor.nationality = constructorInfo.nationality;
      this.currentConstructor.url = constructorInfo.url;
      this.currentDriver.races = [];
      for (const race of races) {
        const run: {round: string; place: string; roundRaces: any[]} = {round: '', place: '', roundRaces: []};
        run.round = race.round;
        run.place = race.Circuit.circuitName;
        run.roundRaces = [];
        for (const result of race.Results){
          const  roundRace: any = {};
          roundRace.laps = result.laps;
          roundRace.position = result.position;
          roundRace.status = result.status;
          roundRace.driver = result.Driver.givenName + ' ' + result.Driver.familyName;
          roundRace.points = result.points;
          run.roundRaces.push(roundRace);
        }
        this.currentConstructor.races.push(run);
      }
    });
  }

  clearCurrent(): void {
    this.currentDriver =
      {driverCode: '', birth: '', name: '', nationality: '', permanentNo: '', wiki: '', races: []};
    this.currentConstructor = {name: '', nationality: '', url: '', races: []};
  }
}
