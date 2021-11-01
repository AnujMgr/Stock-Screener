import faker from "faker";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single",
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const myData = [
  {
    firstName: "Marcus Zboncak",
    lastName: "Klein",
    age: 4,
    visits: 23,
    progress: 92,
    status: "complicated",
    subRows: [
      {
        firstName: "Arnold Will",
        lastName: "Stracke",
        age: 7,
        visits: 8,
        progress: 93,
        status: "single",
        subRows: [
          {
            firstName: "Damon Wyman",
            lastName: "Wisozk",
            age: 27,
            visits: 96,
            progress: 59,
            status: "relationship",
          },
          {
            firstName: "Wilma Wilkinson",
            lastName: "Fritsch",
            age: 7,
            visits: 95,
            progress: 4,
            status: "single",
          },
          {
            firstName: "Mrs. Guillermo Von",
            lastName: "Hills",
            age: 1,
            visits: 86,
            progress: 61,
            status: "complicated",
          },
          {
            firstName: "Jerome Bednar",
            lastName: "Larkin",
            age: 4,
            visits: 21,
            progress: 30,
            status: "relationship",
          },
          {
            firstName: "Eduardo Von",
            lastName: "Becker",
            age: 9,
            visits: 79,
            progress: 65,
            status: "relationship",
          },
        ],
      },
      {
        firstName: "Joan Pouros",
        lastName: "Runte",
        age: 23,
        visits: 41,
        progress: 52,
        status: "relationship",
        subRows: [
          {
            firstName: "Kara Pouros",
            lastName: "Treutel",
            age: 13,
            visits: 48,
            progress: 28,
            status: "single",
          },
          {
            firstName: "Peter Kling",
            lastName: "Heidenreich",
            age: 21,
            visits: 27,
            progress: 42,
            status: "single",
          },
          {
            firstName: "Luz Hansen",
            lastName: "Corkery",
            age: 25,
            visits: 67,
            progress: 75,
            status: "single",
          },
          {
            firstName: "George Berge",
            lastName: "Gorczany",
            age: 12,
            visits: 21,
            progress: 47,
            status: "single",
          },
          {
            firstName: "Homer Donnelly",
            lastName: "Veum",
            age: 3,
            visits: 4,
            progress: 21,
            status: "single",
          },
        ],
      },
      {
        firstName: "Enrique Breitenberg",
        lastName: "Franecki",
        age: 10,
        visits: 84,
        progress: 14,
        status: "complicated",
        subRows: [
          {
            firstName: "Stella Mertz",
            lastName: "Spencer",
            age: 22,
            visits: 81,
            progress: 6,
            status: "relationship",
          },
          {
            firstName: "Ray Reynolds",
            lastName: "Schmitt",
            age: 22,
            visits: 49,
            progress: 14,
            status: "relationship",
          },
          {
            firstName: "Emmett Wehner DVM",
            lastName: "Stamm",
            age: 18,
            visits: 40,
            progress: 94,
            status: "complicated",
          },
          {
            firstName: "Johnathan Medhurst DDS",
            lastName: "Crist",
            age: 10,
            visits: 95,
            progress: 9,
            status: "complicated",
          },
          {
            firstName: "Hannah Murray",
            lastName: "Christiansen",
            age: 28,
            visits: 84,
            progress: 56,
            status: "relationship",
          },
        ],
      },
      {
        firstName: "Pam Rogahn",
        lastName: "Wehner",
        age: 29,
        visits: 37,
        progress: 3,
        status: "complicated",
        subRows: [
          {
            firstName: "Noel Bergnaum",
            lastName: "Jenkins",
            age: 1,
            visits: 35,
            progress: 36,
            status: "complicated",
          },
          {
            firstName: "Mrs. Joy Stark",
            lastName: "Cartwright",
            age: 16,
            visits: 59,
            progress: 0,
            status: "relationship",
          },
          {
            firstName: "Melanie Waters",
            lastName: "Marks",
            age: 24,
            visits: 50,
            progress: 91,
            status: "complicated",
          },
          {
            firstName: "Miss Jennifer Smitham",
            lastName: "Purdy",
            age: 22,
            visits: 38,
            progress: 46,
            status: "complicated",
          },
          {
            firstName: "Vanessa O'Hara",
            lastName: "Deckow",
            age: 2,
            visits: 91,
            progress: 41,
            status: "relationship",
          },
        ],
      },
      {
        firstName: "Chad Gleichner",
        lastName: "Pfeffer",
        age: 3,
        visits: 34,
        progress: 96,
        status: "relationship",
        subRows: [
          {
            firstName: "Lila Kreiger",
            lastName: "Douglas",
            age: 27,
            visits: 82,
            progress: 12,
            status: "complicated",
          },
          {
            firstName: "Erika Kshlerin",
            lastName: "Senger",
            age: 1,
            visits: 99,
            progress: 95,
            status: "relationship",
          },
          {
            firstName: "Lance Beer",
            lastName: "Goodwin",
            age: 27,
            visits: 46,
            progress: 1,
            status: "complicated",
          },
          {
            firstName: "Rafael Deckow",
            lastName: "Barton",
            age: 11,
            visits: 29,
            progress: 43,
            status: "relationship",
          },
          {
            firstName: "Vicki Schaden",
            lastName: "Schneider",
            age: 13,
            visits: 90,
            progress: 60,
            status: "complicated",
          },
        ],
      },
    ],
  },
];
