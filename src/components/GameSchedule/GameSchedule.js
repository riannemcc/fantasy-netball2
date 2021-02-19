import React from "react";
import Moment from "react-moment";
import moment from "moment";

const games = [
  {
    time: "2021-02-21T12:00+0000",
    teamOne: "Surrey Storm",
    teamTwo: "Leeds Rhinos",
  },
  {
    time: "2021-02-21T14:00+0000",
    teamOne: "Loughborough Lightning",
    teamTwo: "Saracens  Mavericks",
  },
  {
    time: "2021-02-21T16:00+0000",
    teamOne: "Celtic Dragons",
    teamTwo: "Strathclyde Sirens",
  },
  {
    time: "2021-02-21T18:00+0000",
    teamOne: "Manchester Thunder",
    teamTwo: "London Pulse",
  },
  {
    time: "2021-02-22T17:15+0000",
    teamOne: "Celtic Dragons",
    teamTwo: "Surrey Storm",
  },
  {
    time: "2021-02-22T19:15+0000",
    teamOne: "Wasps",
    teamTwo: "Team Bath",
  },
  {
    time: "2021-02-23T12:00+0000",
    teamOne: "Severn Stars",
    teamTwo: "Manchester Thunder",
  },
  {
    time: "2021-02-23T14:00+0000",
    teamOne: "Strathclyde Sirens",
    teamTwo: "London Pulse",
  },
  {
    time: "2021-02-23T16:00+0000",
    teamOne: "Wasps",
    teamTwo: "Surrey Storm",
  },
  {
    time: "2021-02-23T18:00+0000",
    teamOne: "Leeds Rhinos",
    teamTwo: "Loughborough Lightning",
  },
  {
    time: "2021-03-01T17:15+0000",
    teamOne: "Celtic  Dragons",
    teamTwo: "Saracens Mavericks",
  },
  {
    time: "2021-03-01T19:15+0000",
    teamOne: "Loughborough Lightning",
    teamTwo: "Severn Stars",
  },
];

const currentDate = new Date();

export const GameSchedule = () => {
  return (
    <div>
      <table className="m-2 bg-gray-100 shadow border">
        <thead>
          <tr>
            <th class="border border-black px-4 py-2 text-left ">Date</th>
            <th class="border border-black px-4 py-2 text-left ">Time</th>
            <th class="border border-black px-4 py-2 text-left ">Teams</th>
          </tr>
        </thead>
        <tbody>
          {games.map(({time, teamOne, teamTwo}) =>
            moment(time).isAfter(currentDate) ? (
              <tr>
                <td class="border border-black px-2 py-2 text-left ">
                  {<Moment format="DD/MM">{time}</Moment>}
                </td>
                <td class="border border-black px-4 py-2 text-left ">
                  {<Moment format="HH:mm">{time}</Moment>}
                </td>
                <td class="border border-black px-4 py-2 text-left ">
                  {teamOne} vs. {teamTwo}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};
