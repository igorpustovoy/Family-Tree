const tree = [
  {
    firstPerson: {
      name: "John Walker",
      image: "https://picsum.photos/300/300?random=1",
    },
    secondPerson: {
      name: "Jannet Grem",
      image: "https://picsum.photos/300/300?random=2",
    },
    children: [
      {
        firstPerson: {
          name: "Katia",
        },
        secondPerson: {
          name: "Oleg",
        },
        children: [
          {
            firstPerson: {
              name: "Gleb",
            },
            secondPerson: {
              name: "Viktoriya",
            },
            children: [
              {
                firstPerson: {
                  name: "Rim",
                },
                secondPerson: {
                  name: "Natasha",
                },
              },
              {
                firstPerson: {
                  name: "Leonid",
                },
              },
            ],
          },
          {
            firstPerson: {
              name: "Olga",
            },
            secondPerson: {
              name: "Nikita",
            },
          },
        ],
      },
      {
        firstPerson: {
          name: "Vitia",
        },
        secondPerson: {
          name: "Dasha",
        },
      },
      {
        firstPerson: {
          name: "Antonio Wild",
          image: "https://picsum.photos/300/300?random=3",
        },
        secondPerson: {
          name: "Olivia Olson",
        },
        children: [
          {
            firstPerson: {
              name: "Kristina Wild",
            },
          },
          {
            firstPerson: {
              name: "Alexey Wild",
            },
          },
          {
            firstPerson: {
              name: "Viktor Wild",
            },
          },
        ],
      },
    ],
  },
];

export default tree;
