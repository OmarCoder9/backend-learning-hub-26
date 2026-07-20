export interface Rating {
  [name: string]: number;
}

export interface Microbus {
  id: number;
  driverName: string;
  route: string;
  farePerSeat: number;
  seatsAvailable: number;
  rating: Rating[];
}

export const fleet: Microbus[] = [
  {
    id: 1,
    driverName: "Omar",
    route: "Ring RD",
    farePerSeat: 16,
    seatsAvailable: 3,
    rating: [{ sameh: 3 }, { shahd: 2 }],
  },
  {
    id: 2,
    driverName: "Omnia",
    route: "Tunnel RD",
    farePerSeat: 32,
    seatsAvailable: 9,
    rating: [{ salna: 5 }, { shady: 5 }],
  },
  {
    id: 3,
    driverName: "Saad",
    route: "Dokki",
    farePerSeat: 99,
    seatsAvailable: 1,
    rating: [{ said: 5 }, { loay: 1 }],
  },
  {
    id: 4,
    driverName: "Ramy",
    route: "Ramses",
    farePerSeat: 12,
    seatsAvailable: 5,
    rating: [{ bassem: 4 }, { hany: 3 }],
  },
];
